'use client';

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost, Profile } from '@/types/database';
import BlogCard from '@/components/website/pages/blog/blog-card';
import BlogDeleteModal from '@/components/website/pages/blog/blog-delete-modal';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import {
  Search,
  Tag,
  LogIn,
  UserPlus,
  BookOpen,
  Layers,
  LogOut,
  ShieldCheck,
  PenSquare,
  User,
  Clock3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';

interface BlogFeedClientProps {
  initialPosts: BlogPost[];
  currentUser?: { id: string; email?: string } | null;
  currentProfile?: Profile | null;
}

// Deterministic stable sorting helper
const sortPostsStable = (list: BlogPost[]): BlogPost[] => {
  return [...list].sort((a, b) => {
    const dateA = new Date(a.published_at || a.created_at).getTime();
    const dateB = new Date(b.published_at || b.created_at).getTime();
    return dateB - dateA;
  });
};

export const BlogFeedClient: React.FC<BlogFeedClientProps> = ({
  initialPosts,
  currentUser: initialUser,
  currentProfile: initialProfile,
}) => {
  const router = useRouter();
  const {
    user: clientUser,
    profile: clientProfile,
    loading: authLoading,
    isAdmin,
    signOut,
  } = useClientAuth();

  // Prefer client-resolved auth if loaded, otherwise fallback to server prop
  const effectiveUser = clientUser || initialUser || null;
  const effectiveProfile = clientProfile || initialProfile || null;
  const effectiveIsAdmin = isAdmin || effectiveProfile?.role === 'ADMIN';

  // Reactive posts state initialized with cached live likes and stable sorting
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const initialized = initialPosts.map((post) => {
      const cachedLikes = blogApi.getCachedLikes(post.id);
      return cachedLikes !== undefined
        ? { ...post, likes_count: cachedLikes }
        : post;
    });
    return sortPostsStable(initialized);
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<'all' | 'my-posts' | 'pending'>(
    'all'
  );
  const [deletingPost, setDeletingPost] = useState<BlogPost | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch live authenticated user posts (drafts/pending) or admin moderation queue once authenticated
  useEffect(() => {
    if (!effectiveUser) return;

    let isMounted = true;
    const loadAuthenticatedPosts = async () => {
      try {
        if (effectiveIsAdmin) {
          const adminPosts = await blogApi.getAdminPosts();
          if (isMounted && adminPosts && adminPosts.length > 0) {
            setPosts(sortPostsStable(adminPosts));
          }
        } else {
          const userPosts = await blogApi.getUserPosts();
          if (isMounted && userPosts) {
            setPosts((prev) => {
              const map = new Map<string, BlogPost>();
              prev.forEach((p) => map.set(p.id, p));
              userPosts.forEach((p) => map.set(p.id, p));
              return sortPostsStable(Array.from(map.values()));
            });
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Failed to load authenticated posts:', err);
      }
    };

    loadAuthenticatedPosts();
    return () => {
      isMounted = false;
    };
  }, [effectiveUser, effectiveIsAdmin]);

  // Subscribe to live like updates from any component/page
  useEffect(() => {
    const unsubscribe = blogApi.subscribeToLikes((postId, likesCount) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes_count: likesCount } : post
        )
      );
    });

    return unsubscribe;
  }, []);

  // Handle post deletion through the API service layer
  const handleDeletePost = useCallback(async () => {
    if (!deletingPost) return;
    setDeleteLoading(true);

    try {
      const res = await blogApi.deletePost(deletingPost.id);
      if (res.success) {
        setPosts((prev) => prev.filter((p) => p.id !== deletingPost.id));
        setDeletingPost(null);
        router.refresh();
      } else {
        alert(res.error || 'Failed to delete article.');
      }
    } catch (err: any) {
      alert(err.message || 'An error occurred during deletion.');
    } finally {
      setDeleteLoading(false);
    }
  }, [deletingPost, router]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Counts for filters
  const publishedCount = useMemo(() => {
    return posts.filter((p) => p.status === 'PUBLISHED').length;
  }, [posts]);

  const myPostsCount = useMemo(() => {
    if (!effectiveUser) return 0;
    return posts.filter((p) => p.author_id === effectiveUser.id).length;
  }, [posts, effectiveUser]);

  const pendingCount = useMemo(() => {
    return posts.filter((p) => p.status === 'PENDING_REVIEW').length;
  }, [posts]);

  // Filter posts based on search query, filter mode, and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Filter mode check
      if (filterMode === 'all') {
        if (post.status !== 'PUBLISHED') return false;
      } else if (filterMode === 'my-posts') {
        if (!effectiveUser || post.author_id !== effectiveUser.id) return false;
      } else if (filterMode === 'pending') {
        if (post.status !== 'PENDING_REVIEW') return false;
      }

      const matchesSearch =
        searchQuery === '' ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesTag =
        selectedTag === null || post.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [posts, searchQuery, selectedTag, filterMode, effectiveUser]);

  const featuredPost = filteredPosts.length > 0 ? filteredPosts[0] : null;
  const remainingPosts = filteredPosts.length > 1 ? filteredPosts.slice(1) : [];

  const displayName = effectiveProfile?.first_name
    ? `${effectiveProfile.first_name} ${effectiveProfile.last_name || ''}`.trim()
    : effectiveProfile?.username || effectiveUser?.email || 'Member';

  return (
    <div className="w-full space-y-8 font-mono">
      {/* Top Banner: Auth State & Quick Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-border/70 bg-card/60 p-4 backdrop-blur-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0 border border-primary/20">
            <BookOpen className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-foreground">
              Engineering Logs & Community Discussions
            </p>
            <p className="text-[11px] text-muted-foreground">
              {authLoading ? (
                'Checking session status...'
              ) : effectiveUser ? (
                <>
                  Signed in as{' '}
                  <strong className="text-foreground">{displayName}</strong>
                </>
              ) : (
                'Sign in to write articles, comment, upvote, and join technical discussions'
              )}
            </p>
          </div>
        </div>

        {/* Auth CTA & Action Buttons */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          {!authLoading && effectiveUser ? (
            <div className="flex items-center gap-2 flex-wrap">
              {/* Write Article CTA for all authenticated users */}
              <Link
                href="/blog/new"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
              >
                <PenSquare className="h-3.5 w-3.5" />
                <span>Write Article</span>
              </Link>

              <span className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-2.5 text-xs font-semibold text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {effectiveIsAdmin ? 'Admin' : 'Author'}
              </span>

              {effectiveIsAdmin && (
                <Link
                  href="/admin/blogs"
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-tertiary-2 px-2.5 text-xs font-medium text-foreground hover:bg-card hover:border-primary/40 transition-colors shadow-xs"
                  title="Admin Management Panel"
                >
                  <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                  <span>Admin Panel</span>
                </Link>
              )}

              <button
                type="button"
                onClick={signOut}
                className="inline-flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors shadow-xs"
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : !authLoading ? (
            <>
              <Link
                href="/sign-in?redirect=/blog"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg border border-border bg-tertiary-2 px-3 text-xs text-foreground hover:bg-card hover:border-border/80 transition-colors shadow-xs"
              >
                <LogIn className="h-3.5 w-3.5 text-primary" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/sign-up?redirect=/blog"
                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Join / Register</span>
              </Link>
            </>
          ) : null}
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, keyword, or tech stack..."
            className="w-full rounded-xl border border-border bg-card/80 py-2.5 pl-10 pr-4 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
          />
        </div>

        {/* View Mode & Tag Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {/* Main Feed Filter Modes */}
          <button
            type="button"
            onClick={() => {
              setFilterMode('all');
              setSelectedTag(null);
            }}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-mono transition-all',
              filterMode === 'all' && selectedTag === null
                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
            )}
          >
            All Articles ({publishedCount})
          </button>

          {effectiveUser && (
            <button
              type="button"
              onClick={() => {
                setFilterMode('my-posts');
                setSelectedTag(null);
              }}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-mono transition-all flex items-center gap-1.5',
                filterMode === 'my-posts'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              )}
            >
              <User className="h-3 w-3" />
              <span>My Posts ({myPostsCount})</span>
            </button>
          )}

          {effectiveIsAdmin && (
            <button
              type="button"
              onClick={() => {
                setFilterMode('pending');
                setSelectedTag(null);
              }}
              className={cn(
                'rounded-lg px-3 py-1 text-xs font-mono transition-all flex items-center gap-1.5',
                filterMode === 'pending'
                  ? 'bg-amber-500 text-white font-bold shadow-xs'
                  : pendingCount > 0
                    ? 'bg-amber-500/10 border border-amber-500/30 text-amber-500 hover:bg-amber-500/20 font-bold'
                    : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              )}
            >
              <Clock3 className="h-3 w-3 text-amber-500" />
              <span>Pending Review ({pendingCount})</span>
              {pendingCount > 0 && (
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-ping" />
              )}
            </button>
          )}

          {/* Divider if tags exist */}
          {allTags.length > 0 && (
            <span className="text-border mx-1 hidden sm:inline">|</span>
          )}

          {/* Topic Tags */}
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                setSelectedTag(selectedTag === tag ? null : tag);
                setFilterMode('all');
              }}
              className={cn(
                'rounded-lg px-2.5 py-1 text-xs font-mono transition-all flex items-center gap-1',
                selectedTag === tag
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              )}
            >
              <Tag className="h-3 w-3" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-16 text-center">
          <Layers className="h-10 w-10 text-muted-foreground/50 mb-3" />
          <p className="text-sm font-bold text-foreground">No articles found</p>
          <p className="text-xs text-muted-foreground mt-1 max-w-sm">
            {filterMode === 'my-posts'
              ? 'You have not written any articles yet. Click "Write Article" to start!'
              : filterMode === 'pending'
                ? 'No articles are currently pending review.'
                : 'Try adjusting your search keywords or clearing active filters.'}
          </p>
          {filterMode === 'my-posts' ? (
            <Link
              href="/blog/new"
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs text-primary-foreground font-bold hover:opacity-90 transition-opacity"
            >
              <PenSquare className="h-3.5 w-3.5" />
              <span>Create Your First Post</span>
            </Link>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedTag(null);
                setFilterMode('all');
              }}
              className="mt-4 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs text-primary font-bold hover:bg-primary/20 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Hero Card */}
          {featuredPost && (
            <ScrollReveal>
              <div className="grid grid-cols-1">
                <BlogCard
                  post={featuredPost}
                  featured={true}
                  currentUserId={effectiveUser?.id}
                  isAdmin={effectiveIsAdmin}
                  onDelete={(p) => setDeletingPost(p)}
                />
              </div>
            </ScrollReveal>
          )}

          {/* Grid of Other Articles */}
          {remainingPosts.length > 0 && (
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  currentUserId={effectiveUser?.id}
                  isAdmin={effectiveIsAdmin}
                  onDelete={(p) => setDeletingPost(p)}
                />
              ))}
            </ScrollReveal>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingPost && (
        <BlogDeleteModal
          isOpen={Boolean(deletingPost)}
          onCancel={() => setDeletingPost(null)}
          onConfirm={handleDeletePost}
          loading={deleteLoading}
          title="Delete Article"
          itemName={deletingPost.title}
          description="Are you sure you want to permanently delete this article? This will remove all associated comments and likes."
        />
      )}
    </div>
  );
};

export default BlogFeedClient;

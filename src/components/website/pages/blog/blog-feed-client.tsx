'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost, Profile } from '@/types/database';
import BlogCard from '@/components/website/pages/blog/blog-card';
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
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useClientAuth } from '@/hooks/use-client-auth';
import { blogApi } from '@/services/blogApi';

interface BlogFeedClientProps {
  initialPosts: BlogPost[];
  currentUser?: { id: string; email?: string } | null;
  currentProfile?: Profile | null;
}

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

  // Reactive posts state initialized with cached live likes
  const [posts, setPosts] = useState<BlogPost[]>(() =>
    initialPosts.map((post) => {
      const cachedLikes = blogApi.getCachedLikes(post.id);
      return cachedLikes !== undefined
        ? { ...post, likes_count: cachedLikes }
        : post;
    })
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Sync state if initialPosts prop updates
  useEffect(() => {
    setPosts(
      initialPosts.map((post) => {
        const cachedLikes = blogApi.getCachedLikes(post.id);
        return cachedLikes !== undefined
          ? { ...post, likes_count: cachedLikes }
          : post;
      })
    );
  }, [initialPosts]);

  // Subscribe to live like updates from any component/page
  useEffect(() => {
    const unsubscribe = blogApi.subscribeToLikes((postId, likesCount) => {
      setPosts((prev) =>
        prev.map((post) =>
          post.id === postId ? { ...post, likes_count: likesCount } : post
        )
      );
    });

    // Refresh router in background to purge stale client router cache
    router.refresh();

    return unsubscribe;
  }, [router]);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    posts.forEach((post) => {
      post.tags?.forEach((t) => tagsSet.add(t));
    });
    return Array.from(tagsSet);
  }, [posts]);

  // Filter posts based on search query and selected tag
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
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
  }, [posts, searchQuery, selectedTag]);

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
              Engineering Logs & Discussion
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
                'Sign in to comment, upvote, and join technical discussions'
              )}
            </p>
          </div>
        </div>

        {/* Auth CTA Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {!authLoading && effectiveUser ? (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-[11px] font-semibold text-emerald-500">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {isAdmin || effectiveProfile?.role === 'ADMIN'
                  ? 'Admin'
                  : 'Active Member'}
              </span>

              {(isAdmin || effectiveProfile?.role === 'ADMIN') && (
                <Link
                  href="/admin/blogs"
                  className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Manage Posts</span>
                </Link>
              )}

              <button
                type="button"
                onClick={signOut}
                className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground hover:bg-tertiary-2 transition-colors"
                title="Sign Out"
              >
                <LogOut className="h-3 w-3" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : !authLoading ? (
            <>
              <Link
                href="/sign-in?redirect=/blog"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-tertiary-2 px-3 py-1.5 text-xs text-foreground hover:bg-card hover:border-border/80 transition-colors"
              >
                <LogIn className="h-3.5 w-3.5 text-primary" />
                <span>Sign In</span>
              </Link>
              <Link
                href="/sign-up?redirect=/blog"
                className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Sign Up</span>
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

        {/* Tag Selector Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-mono transition-all',
              selectedTag === null
                ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                : 'bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
            )}
          >
            All Posts ({initialPosts.length})
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
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
            Try adjusting your search keywords or clearing tag filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedTag(null);
            }}
            className="mt-4 rounded-lg bg-primary/10 border border-primary/20 px-3 py-1.5 text-xs text-primary font-bold hover:bg-primary/20 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Featured Hero Card (when available and on page 1/unfiltered) */}
          {featuredPost && (
            <ScrollReveal>
              <div className="grid grid-cols-1">
                <BlogCard post={featuredPost} featured={true} />
              </div>
            </ScrollReveal>
          )}

          {/* Grid of Other Articles */}
          {remainingPosts.length > 0 && (
            <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remainingPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </ScrollReveal>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogFeedClient;

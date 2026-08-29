'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import {
  SiteSettings,
  Contact,
  SocialLink,
  AboutCard,
  SkillCategory,
  Skill,
  Experience,
  Project,
  BlogPost,
  Comment,
} from '@/types/database';

export interface ActionResult {
  success: boolean;
  message?: string;
  error?: string;
}

// Helper to verify admin permissions
async function verifyAdmin(): Promise<{ authorized: boolean; error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, error: 'Unauthorized: Please sign in.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'ADMIN') {
    return {
      authorized: false,
      error: 'Forbidden: Admin access required.',
    };
  }

  return { authorized: true };
}

// ============================================================================
// 1. Site Settings Actions
// ============================================================================

export async function updateSiteSettingsAction(
  data: Partial<SiteSettings>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('site_settings').upsert({
    id: 1,
    ...data,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return { success: false, error: error.message };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/resume');
  revalidatePath('/work');
  revalidatePath('/contact');

  return { success: true, message: 'Site settings updated successfully.' };
}

// ============================================================================
// 2. Contacts Actions
// ============================================================================

export async function createContactAction(
  data: Omit<Contact, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('contacts').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  revalidatePath('/contact');
  return { success: true, message: 'Contact created successfully.' };
}

export async function updateContactAction(
  id: number,
  data: Partial<Contact>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('contacts')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  revalidatePath('/contact');
  return { success: true, message: 'Contact updated successfully.' };
}

export async function deleteContactAction(id: number): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('contacts').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  revalidatePath('/contact');
  return { success: true, message: 'Contact deleted successfully.' };
}

// ============================================================================
// 3. Social Links Actions
// ============================================================================

export async function createSocialLinkAction(
  data: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('social_links').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  return { success: true, message: 'Social link created successfully.' };
}

export async function updateSocialLinkAction(
  id: number,
  data: Partial<SocialLink>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('social_links')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  return { success: true, message: 'Social link updated successfully.' };
}

export async function deleteSocialLinkAction(
  id: number
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('social_links').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/', 'layout');
  return { success: true, message: 'Social link deleted successfully.' };
}

// ============================================================================
// 4. About Cards Actions
// ============================================================================

export async function createAboutCardAction(
  data: Omit<AboutCard, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('about_cards').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  return { success: true, message: 'About card created successfully.' };
}

export async function updateAboutCardAction(
  id: number,
  data: Partial<AboutCard>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('about_cards')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  return { success: true, message: 'About card updated successfully.' };
}

export async function deleteAboutCardAction(id: number): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('about_cards').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/');
  return { success: true, message: 'About card deleted successfully.' };
}

// ============================================================================
// 5. Skills & Categories Actions
// ============================================================================

export async function createSkillCategoryAction(
  data: Omit<SkillCategory, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('skill_categories').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill category created successfully.' };
}

export async function updateSkillCategoryAction(
  id: number,
  data: Partial<SkillCategory>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('skill_categories')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill category updated successfully.' };
}

export async function deleteSkillCategoryAction(
  id: number
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('skill_categories')
    .delete()
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill category deleted successfully.' };
}

export async function createSkillAction(
  data: Omit<Skill, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('skills').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill created successfully.' };
}

export async function updateSkillAction(
  id: number,
  data: Partial<Skill>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('skills')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill updated successfully.' };
}

export async function deleteSkillAction(id: number): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('skills').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  return { success: true, message: 'Skill deleted successfully.' };
}

// ============================================================================
// 6. Experiences Actions
// ============================================================================

export async function createExperienceAction(
  data: Omit<Experience, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('experiences').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  revalidatePath('/admin/experiences');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Experience created successfully.' };
}

export async function updateExperienceAction(
  id: number,
  data: Partial<Experience>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('experiences')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  revalidatePath('/admin/experiences');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Experience updated successfully.' };
}

export async function deleteExperienceAction(
  id: number
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('experiences').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/resume');
  revalidatePath('/admin/experiences');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Experience deleted successfully.' };
}

// ============================================================================
// 7. Projects Actions
// ============================================================================

export async function createProjectAction(
  data: Omit<Project, 'id' | 'created_at' | 'updated_at'>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('projects').insert({
    ...data,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  if (error) return { success: false, error: error.message };

  revalidatePath('/work');
  revalidatePath('/admin/projects');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Project created successfully.' };
}

export async function updateProjectAction(
  id: number,
  data: Partial<Project>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase
    .from('projects')
    .update({ ...data, updated_at: new Date().toISOString() })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/work');
  revalidatePath('/admin/projects');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Project updated successfully.' };
}

export async function deleteProjectAction(id: number): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('projects').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/work');
  revalidatePath('/admin/projects');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Project deleted successfully.' };
}

// ============================================================================
// 8. Reorder Actions (Drag & Drop - DRY Centralized Helper)
// ============================================================================

async function genericReorderTableItems(
  tableName: string,
  items: { id: number; sort_order: number }[],
  pathsToRevalidate: { path: string; type?: 'layout' | 'page' }[]
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const updates = items.map((item) =>
    supabase
      .from(tableName)
      .update({
        sort_order: item.sort_order,
        updated_at: new Date().toISOString(),
      })
      .eq('id', item.id)
  );

  const results = await Promise.all(updates);
  const failure = results.find((r) => r.error);
  if (failure?.error) return { success: false, error: failure.error.message };

  for (const { path, type } of pathsToRevalidate) {
    if (type) {
      revalidatePath(path, type);
    } else {
      revalidatePath(path);
    }
  }

  return { success: true, message: 'Order updated successfully.' };
}

export async function reorderContactsAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('contacts', items, [
    { path: '/', type: 'layout' },
    { path: '/contact' },
    { path: '/admin/contacts' },
  ]);
}

export async function reorderSocialLinksAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('social_links', items, [
    { path: '/', type: 'layout' },
    { path: '/admin/social-links' },
  ]);
}

export async function reorderAboutCardsAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('about_cards', items, [
    { path: '/', type: 'layout' },
    { path: '/admin/about-cards' },
  ]);
}

export async function reorderSkillCategoriesAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('skill_categories', items, [
    { path: '/resume' },
    { path: '/admin/skills' },
  ]);
}

export async function reorderSkillsAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('skills', items, [
    { path: '/resume' },
    { path: '/admin/skills' },
  ]);
}

export async function reorderExperiencesAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('experiences', items, [
    { path: '/resume' },
    { path: '/admin/experiences' },
  ]);
}

export async function reorderProjectsAction(
  items: { id: number; sort_order: number }[]
): Promise<ActionResult> {
  return genericReorderTableItems('projects', items, [
    { path: '/work' },
    { path: '/admin/projects' },
  ]);
}

// ============================================================================
// 9. Blog Posts Actions
// ============================================================================

export async function createBlogPostAction(
  data: Partial<BlogPost>
): Promise<ActionResult & { post?: BlogPost }> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const slug =
    data.slug?.trim() ||
    data.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') ||
    `post-${Date.now()}`;

  const payload = {
    author_id: user?.id,
    title: data.title || 'Untitled Post',
    slug,
    content: data.content || '',
    excerpt: data.excerpt || null,
    cover_image_url: data.cover_image_url || null,
    tags: data.tags || [],
    status: data.status || 'DRAFT',
    published_at:
      data.status === 'PUBLISHED'
        ? data.published_at || new Date().toISOString()
        : null,
  };

  const { data: created, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (created?.slug) {
    revalidatePath(`/blog/${created.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return {
    success: true,
    message: 'Blog post created successfully.',
    post: created as BlogPost,
  };
}

export async function updateBlogPostAction(
  id: string,
  data: Partial<BlogPost>
): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();

  // Get current slug before update for thorough cache revalidation
  const { data: existingPost } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single();

  const payload: any = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  if (data.status === 'PUBLISHED' && !data.published_at) {
    payload.published_at = new Date().toISOString();
  }

  // Remove relation properties if passed
  delete payload.author;
  delete payload.likes_count;
  delete payload.comments_count;

  const { error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (existingPost?.slug) {
    revalidatePath(`/blog/${existingPost.slug}`);
  }
  if (data.slug && data.slug !== existingPost?.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Blog post updated successfully.' };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();

  const { data: existingPost } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single();

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (existingPost?.slug) {
    revalidatePath(`/blog/${existingPost.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Blog post deleted successfully.' };
}

// ============================================================================
// 10. Comments Actions
// ============================================================================

export async function addCommentAction(data: {
  post_id: string;
  content: string;
  slug?: string;
}): Promise<ActionResult & { comment?: Comment }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: 'Please sign in to post a comment.',
    };
  }

  const trimmed = data.content.trim();
  if (!trimmed) {
    return { success: false, error: 'Comment content cannot be empty.' };
  }

  const { data: created, error } = await supabase
    .from('comments')
    .insert({
      user_id: user.id,
      post_id: data.post_id,
      content: trimmed,
    })
    .select(
      '*, user:profiles(id, first_name, last_name, username, role, profile_picture)'
    )
    .single();

  if (error) return { success: false, error: error.message };

  if (data.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/blog');
  revalidatePath('/', 'layout');
  return {
    success: true,
    message: 'Comment posted successfully.',
    comment: created as Comment,
  };
}

export async function deleteCommentAction(
  commentId: string,
  slug?: string
): Promise<ActionResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Unauthorized: Please sign in.' };
  }

  // Check if caller is author or admin
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isAdmin = profile?.role === 'ADMIN';

  let deleteQuery = supabase.from('comments').delete().eq('id', commentId);
  if (!isAdmin) {
    deleteQuery = deleteQuery.eq('user_id', user.id);
  }

  const { error } = await deleteQuery;
  if (error) return { success: false, error: error.message };

  if (slug) {
    revalidatePath(`/blog/${slug}`);
  }
  revalidatePath('/blog/[slug]', 'page');
  revalidatePath('/blog');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Comment deleted successfully.' };
}

// ============================================================================
// 11. User Blog Post Actions (Authenticated Users — Not Admin Only)
// ============================================================================

/**
 * Helper to verify a user is authenticated (not admin-only).
 * Returns the user and profile data for authorization checks.
 */
async function verifyAuth(): Promise<{
  authorized: boolean;
  error?: string;
  userId?: string;
  isAdmin?: boolean;
}> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { authorized: false, error: 'Please sign in to continue.' };
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  return {
    authorized: true,
    userId: user.id,
    isAdmin: profile?.role === 'ADMIN',
  };
}

/**
 * Create a new blog post as an authenticated user.
 * Regular users' posts go to PENDING_REVIEW. Admins can publish directly.
 */
export async function createUserBlogPostAction(
  data: Partial<BlogPost>
): Promise<ActionResult & { post?: BlogPost }> {
  const auth = await verifyAuth();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();

  const slug =
    data.slug?.trim() ||
    data.title
      ?.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '') ||
    `post-${Date.now()}`;

  // Check slug uniqueness
  const { data: existingSlug } = await supabase
    .from('blog_posts')
    .select('id')
    .eq('slug', slug)
    .maybeSingle();

  if (existingSlug) {
    return {
      success: false,
      error: `Slug "${slug}" already exists. Please choose a different one.`,
    };
  }

  // Determine effective status: regular users go to PENDING_REVIEW when publishing
  let effectiveStatus = data.status || 'DRAFT';
  if (!auth.isAdmin && effectiveStatus === 'PUBLISHED') {
    effectiveStatus = 'PENDING_REVIEW';
  }

  const payload = {
    author_id: auth.userId,
    title: data.title || 'Untitled Post',
    slug,
    content: data.content || '',
    excerpt: data.excerpt || null,
    cover_image_url: data.cover_image_url || null,
    tags: data.tags || [],
    status: effectiveStatus,
    published_at:
      effectiveStatus === 'PUBLISHED'
        ? data.published_at || new Date().toISOString()
        : null,
  };

  const { data: created, error } = await supabase
    .from('blog_posts')
    .insert(payload)
    .select()
    .single();

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (created?.slug) {
    revalidatePath(`/blog/${created.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  const statusMsg =
    effectiveStatus === 'PENDING_REVIEW'
      ? 'Article submitted for review! It will be visible once approved by an admin.'
      : effectiveStatus === 'PUBLISHED'
        ? 'Article published successfully!'
        : 'Draft saved successfully.';

  return {
    success: true,
    message: statusMsg,
    post: created as BlogPost,
  };
}

/**
 * Update a blog post. Authors can update their own posts, admins can update any.
 */
export async function updateUserBlogPostAction(
  id: string,
  data: Partial<BlogPost>
): Promise<ActionResult> {
  const auth = await verifyAuth();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();

  // Verify ownership or admin & capture existing slug
  const { data: post } = await supabase
    .from('blog_posts')
    .select('author_id, slug')
    .eq('id', id)
    .single();

  if (!auth.isAdmin && (!post || post.author_id !== auth.userId)) {
    return {
      success: false,
      error: 'You can only edit your own articles.',
    };
  }

  const currentSlug = post?.slug;

  // Check slug uniqueness if slug changed
  if (data.slug) {
    const { data: existingSlug } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', data.slug)
      .neq('id', id)
      .maybeSingle();

    if (existingSlug) {
      return {
        success: false,
        error: `Slug "${data.slug}" already exists. Please choose a different one.`,
      };
    }
  }

  // Regular users: PUBLISHED → PENDING_REVIEW (re-review after edit)
  let effectiveStatus = data.status;
  if (!auth.isAdmin && effectiveStatus === 'PUBLISHED') {
    effectiveStatus = 'PENDING_REVIEW';
  }

  const payload: Record<string, unknown> = {
    ...data,
    updated_at: new Date().toISOString(),
  };

  if (effectiveStatus) {
    payload.status = effectiveStatus;
  }

  if (effectiveStatus === 'PUBLISHED' && !data.published_at) {
    payload.published_at = new Date().toISOString();
  }

  // Remove relation properties if passed
  delete payload.author;
  delete payload.likes_count;
  delete payload.comments_count;

  const { error } = await supabase
    .from('blog_posts')
    .update(payload)
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (currentSlug) {
    revalidatePath(`/blog/${currentSlug}`);
  }
  if (data.slug && data.slug !== currentSlug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');

  const statusMsg =
    effectiveStatus === 'PENDING_REVIEW'
      ? 'Article updated and submitted for review.'
      : 'Article updated successfully.';

  return { success: true, message: statusMsg };
}

/**
 * Delete a blog post. Authors can delete their own, admins can delete any.
 */
export async function deleteUserBlogPostAction(
  id: string
): Promise<ActionResult> {
  const auth = await verifyAuth();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();

  // Verify ownership or admin & capture existing slug
  const { data: post } = await supabase
    .from('blog_posts')
    .select('author_id, slug')
    .eq('id', id)
    .single();

  if (!auth.isAdmin && (!post || post.author_id !== auth.userId)) {
    return {
      success: false,
      error: 'You can only delete your own articles.',
    };
  }

  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Article deleted successfully.' };
}

/**
 * Admin-only: Approve a PENDING_REVIEW post by setting its status to PUBLISHED.
 */
export async function approveBlogPostAction(id: string): Promise<ActionResult> {
  const adminAuth = await verifyAdmin();
  if (!adminAuth.authorized) return { success: false, error: adminAuth.error };

  const supabase = createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('blog_posts')
    .update({
      status: 'PUBLISHED',
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Article approved and published.' };
}

/**
 * Admin-only: Reject a PENDING_REVIEW post by setting its status back to DRAFT.
 */
export async function rejectBlogPostAction(id: string): Promise<ActionResult> {
  const adminAuth = await verifyAdmin();
  if (!adminAuth.authorized) return { success: false, error: adminAuth.error };

  const supabase = createClient();

  const { data: post } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('id', id)
    .single();

  const { error } = await supabase
    .from('blog_posts')
    .update({
      status: 'DRAFT',
      updated_at: new Date().toISOString(),
    })
    .eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/blog/[slug]', 'page');
  if (post?.slug) {
    revalidatePath(`/blog/${post.slug}`);
  }
  revalidatePath('/admin/blogs');
  revalidatePath('/', 'layout');
  return { success: true, message: 'Article rejected and returned to draft.' };
}

/**
 * Fetch a single blog post for editing (works for drafts, pending, and published posts).
 * Verifies that the caller is either the author or an admin.
 */
export async function getBlogPostForEditAction(slug: string): Promise<{
  success: boolean;
  post?: BlogPost;
  error?: string;
  isAdmin?: boolean;
}> {
  const auth = await verifyAuth();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select(
      '*, author:profiles(id, first_name, last_name, username, role, profile_picture)'
    )
    .eq('slug', slug)
    .maybeSingle();

  if (error || !post) {
    return { success: false, error: 'Article not found.' };
  }

  // Verify author or admin
  if (!auth.isAdmin && post.author_id !== auth.userId) {
    return {
      success: false,
      error: 'You do not have permission to edit this article.',
    };
  }

  return {
    success: true,
    post: post as BlogPost,
    isAdmin: auth.isAdmin,
  };
}

/**
 * Fetch all blog posts for the Admin Control Center across all statuses (Draft, Pending Review, Published, Archived).
 */
export async function getAdminBlogPostsAction(): Promise<BlogPost[]> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      '*, author:profiles(id, first_name, last_name, username, role, profile_picture), post_likes(id), comments(id)'
    )
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((post: any) => ({
    ...post,
    likes_count: Array.isArray(post.post_likes) ? post.post_likes.length : 0,
    comments_count: Array.isArray(post.comments) ? post.comments.length : 0,
  })) as BlogPost[];
}

/**
 * Fetch the authenticated user's own blog posts (all statuses: draft, pending, published).
 */
export async function getUserBlogPostsAction(): Promise<BlogPost[]> {
  const auth = await verifyAuth();
  if (!auth.authorized || !auth.userId) return [];

  const supabase = createClient();
  const { data, error } = await supabase
    .from('blog_posts')
    .select(
      '*, author:profiles(id, first_name, last_name, username, role, profile_picture), post_likes(id), comments(id)'
    )
    .eq('author_id', auth.userId)
    .order('created_at', { ascending: false });

  if (error || !data) return [];

  return data.map((post: any) => ({
    ...post,
    likes_count: Array.isArray(post.post_likes) ? post.post_likes.length : 0,
    comments_count: Array.isArray(post.comments) ? post.comments.length : 0,
  })) as BlogPost[];
}

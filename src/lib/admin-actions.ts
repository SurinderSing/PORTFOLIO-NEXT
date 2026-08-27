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
  revalidatePath('/admin/blogs');
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
  if (data.slug) {
    revalidatePath(`/blog/${data.slug}`);
  }
  revalidatePath('/admin/blogs');
  return { success: true, message: 'Blog post updated successfully.' };
}

export async function deleteBlogPostAction(id: string): Promise<ActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);

  if (error) return { success: false, error: error.message };

  revalidatePath('/blog');
  revalidatePath('/admin/blogs');
  return { success: true, message: 'Blog post deleted successfully.' };
}

// ============================================================================
// 10. Comments Actions
// ============================================================================

export async function addCommentAction(data: {
  post_id: string;
  content: string;
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

  revalidatePath(`/blog`);
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
  revalidatePath('/blog');
  return { success: true, message: 'Comment deleted successfully.' };
}

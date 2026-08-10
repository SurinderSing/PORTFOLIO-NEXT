'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { StorageActionResult } from '@/types/database';

const BUCKET_NAME = 'media';

/** Helper to verify admin permissions for storage mutations */
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
// 1. Profile Photo Upload Action
// ============================================================================

export async function uploadProfilePhotoAction(
  formData: FormData
): Promise<StorageActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const file = formData.get('file') as File | null;
  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  // Validate MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid file format. Please upload JPEG, PNG, WebP, or GIF.',
    };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'File size exceeds 5MB limit.' };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop() || 'png';
  const filePath = `profile/profile-photo.${fileExt}`;

  // Upload (overwrite if exists)
  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '60',
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    return {
      success: false,
      error: `Storage upload failed: ${uploadError.message}`,
    };
  }

  // Retrieve public URL with cache-busting timestamp query
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  const finalUrl = `${publicUrl}?t=${Date.now()}`;

  // Update site_settings table
  const { error: dbError } = await supabase
    .from('site_settings')
    .update({
      profile_photo_url: finalUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);

  if (dbError) {
    return {
      success: false,
      error: `Failed to update database: ${dbError.message}`,
      url: finalUrl,
    };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/admin/site-settings');

  return {
    success: true,
    message: 'Profile photo uploaded and updated successfully.',
    url: finalUrl,
  };
}

// ============================================================================
// 2. Resume PDF Upload Action
// ============================================================================

export async function uploadResumePdfAction(
  formData: FormData
): Promise<StorageActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const file = formData.get('file') as File | null;
  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  // Validate PDF MIME type
  if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
    return {
      success: false,
      error: 'Invalid file format. Please upload a PDF document.',
    };
  }

  // Max 10MB for resume PDF
  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: 'File size exceeds 10MB limit.' };
  }

  const supabase = createClient();
  const filePath = `resume/resume.pdf`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '60',
      upsert: true,
      contentType: 'application/pdf',
    });

  if (uploadError) {
    return {
      success: false,
      error: `Storage upload failed: ${uploadError.message}`,
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  const finalUrl = `${publicUrl}?t=${Date.now()}`;

  // Update site_settings table
  const { error: dbError } = await supabase
    .from('site_settings')
    .update({
      resume_pdf_url: finalUrl,
      updated_at: new Date().toISOString(),
    })
    .eq('id', 1);

  if (dbError) {
    return {
      success: false,
      error: `Failed to update database: ${dbError.message}`,
      url: finalUrl,
    };
  }

  revalidatePath('/', 'layout');
  revalidatePath('/resume');
  revalidatePath('/admin/site-settings');

  return {
    success: true,
    message: 'Resume PDF uploaded and updated successfully.',
    url: finalUrl,
  };
}

// ============================================================================
// 3. Project Image Upload Action
// ============================================================================

export async function uploadProjectImageAction(
  formData: FormData,
  projectId?: number | string
): Promise<StorageActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const file = formData.get('file') as File | null;
  if (!file) {
    return { success: false, error: 'No file provided.' };
  }

  // Validate image MIME type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid file format. Please upload JPEG, PNG, WebP, or GIF.',
    };
  }

  // Max 5MB
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'File size exceeds 5MB limit.' };
  }

  const supabase = createClient();
  const fileExt = file.name.split('.').pop() || 'png';
  const prefix = projectId ? `project-${projectId}` : `temp-${Date.now()}`;
  const filePath = `projects/${prefix}-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
      contentType: file.type,
    });

  if (uploadError) {
    return {
      success: false,
      error: `Storage upload failed: ${uploadError.message}`,
    };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);

  return {
    success: true,
    message: 'Project image uploaded successfully.',
    url: publicUrl,
  };
}

// ============================================================================
// 4. Delete Storage File Action
// ============================================================================

export async function deleteStorageFileAction(
  filePath: string
): Promise<StorageActionResult> {
  const auth = await verifyAdmin();
  if (!auth.authorized) return { success: false, error: auth.error };

  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath]);

  if (error) {
    return { success: false, error: `Failed to delete: ${error.message}` };
  }

  return { success: true, message: 'File deleted from storage.' };
}

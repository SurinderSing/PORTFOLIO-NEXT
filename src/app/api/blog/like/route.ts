import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

// GET /api/blog/like?postId=...
export async function GET(request: NextRequest): Promise<NextResponse> {
  const postId = request.nextUrl.searchParams.get('postId');

  if (!postId) {
    return NextResponse.json(
      { error: 'Missing postId query parameter' },
      { status: 400 }
    );
  }

  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Fetch total likes count
    const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    let liked = false;
    if (user) {
      const { data: existing } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .maybeSingle();

      liked = !!existing;
    }

    return NextResponse.json({
      liked,
      likesCount: count ?? 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST /api/blog/like
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { postId } = body;

    if (!postId) {
      return NextResponse.json(
        { error: 'Missing postId in request body' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in to like this post' },
        { status: 401 }
      );
    }

    // Check if like exists
    const { data: existing } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .maybeSingle();

    let liked = false;
    if (existing) {
      const { error: deleteError } = await supabase
        .from('post_likes')
        .delete()
        .eq('id', existing.id);

      if (deleteError) throw deleteError;
      liked = false;
    } else {
      const { error: insertError } = await supabase.from('post_likes').insert({
        post_id: postId,
        user_id: user.id,
      });

      if (insertError) throw insertError;
      liked = true;
    }

    // Get updated total count
    const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId);

    // Revalidate public blog feed and post page cache
    try {
      revalidatePath('/blog');
    } catch {
      // Ignore if called in non-page context
    }

    return NextResponse.json({
      success: true,
      liked,
      likesCount: count ?? 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

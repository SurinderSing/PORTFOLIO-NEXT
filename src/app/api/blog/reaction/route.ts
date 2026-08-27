import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

// POST /api/blog/reaction
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { commentId, type } = body;

    if (!commentId || !type || !['like', 'dislike'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid commentId or reaction type' },
        { status: 400 }
      );
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized: Please sign in to react' },
        { status: 401 }
      );
    }

    const { data: existing } = await supabase
      .from('comment_reactions')
      .select('id, type')
      .eq('comment_id', commentId)
      .eq('user_id', user.id)
      .maybeSingle();

    let userReaction: 'like' | 'dislike' | null = type;

    if (existing) {
      if (existing.type === type) {
        // Toggle off
        const { error: delError } = await supabase
          .from('comment_reactions')
          .delete()
          .eq('id', existing.id);

        if (delError) throw delError;
        userReaction = null;
      } else {
        // Switch type
        const { error: updateError } = await supabase
          .from('comment_reactions')
          .update({ type })
          .eq('id', existing.id);

        if (updateError) throw updateError;
        userReaction = type;
      }
    } else {
      // Insert new
      const { error: insError } = await supabase
        .from('comment_reactions')
        .insert({
          comment_id: commentId,
          user_id: user.id,
          type,
        });

      if (insError) throw insError;
      userReaction = type;
    }

    // Count updated likes
    const { count: likesCount } = await supabase
      .from('comment_reactions')
      .select('*', { count: 'exact', head: true })
      .eq('comment_id', commentId)
      .eq('type', 'like');

    return NextResponse.json({
      success: true,
      userReaction,
      likesCount: likesCount ?? 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MessageSquare,
  Send,
  LogIn,
  UserPlus,
  Sparkles,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Profile } from '@/types/database';

interface CommentFormProps {
  postSlug: string;
  effectiveUser: { id: string; email?: string } | null;
  effectiveProfile: Profile | null;
  authLoading: boolean;
  isSubmitting: boolean;
  onSubmit: (content: string) => Promise<boolean>;
}

export const CommentForm: React.FC<CommentFormProps> = ({
  postSlug,
  effectiveUser,
  effectiveProfile,
  authLoading,
  isSubmitting,
  onSubmit,
}) => {
  const [content, setContent] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const commenterName = effectiveProfile?.first_name
    ? `${effectiveProfile.first_name} ${effectiveProfile.last_name || ''}`.trim()
    : effectiveProfile?.username || effectiveUser?.email || 'Developer';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setErrorMsg(null);
    setSuccessMsg(null);

    const success = await onSubmit(content.trim());
    if (success) {
      setContent('');
      setSuccessMsg('Your comment has been posted!');
      setTimeout(() => setSuccessMsg(null), 4000);
    } else {
      setErrorMsg('Failed to post comment. Please try again.');
    }
  };

  if (authLoading) {
    return (
      <div className="rounded-xl border border-border/60 bg-card p-6 flex items-center justify-center text-xs text-muted-foreground gap-2">
        <Loader2 className="h-4 w-4 animate-spin text-primary" />
        <span>Verifying authentication status...</span>
      </div>
    );
  }

  if (!effectiveUser) {
    return (
      <div className="rounded-xl border border-dashed border-primary/30 bg-primary/5 p-6 text-center space-y-4">
        <div className="flex justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/25">
            <MessageSquare className="h-5 w-5" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="font-sans text-sm font-bold text-foreground">
            Sign in to join the discussion
          </p>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Leave comments, react with upvotes/feedback, and exchange
            architecture notes with other developers.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
          <Link
            href={`/sign-in?redirect=/blog/${postSlug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-xs"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In to Comment</span>
          </Link>
          <Link
            href={`/sign-up?redirect=/blog/${postSlug}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-4 py-2 text-xs font-bold text-foreground hover:bg-tertiary-2 transition-colors"
          >
            <UserPlus className="h-3.5 w-3.5 text-primary" />
            <span>Create Account</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-border/80 bg-card p-4 space-y-3 shadow-xs"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <div className="flex h-6 w-6 rounded-full bg-primary/15 text-primary items-center justify-center text-[10px] font-bold">
          {commenterName[0]}
        </div>
        <span>
          Commenting as{' '}
          <strong className="text-foreground">{commenterName}</strong>
        </span>
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Share your thoughts, architectural feedback, or questions..."
        rows={3}
        required
        className="w-full rounded-lg border border-border bg-tertiary-2 p-3 text-xs font-sans text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
      />

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 border border-rose-500/20 p-2.5 text-xs text-rose-500">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {successMsg && (
        <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 p-2.5 text-xs text-emerald-500">
          <Sparkles className="h-4 w-4 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-3 pt-1">
        <span className="text-[11px] text-muted-foreground text-left">
          Markdown formatting supported
        </span>
        <button
          type="submit"
          disabled={isSubmitting || !content.trim()}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-primary-foreground hover:opacity-90 active:opacity-80 transition-all duration-150 disabled:opacity-50 shadow-xs shrink-0 self-end sm:self-auto min-w-[130px] min-h-[38px] select-none transform-gpu"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin shrink-0" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="h-3.5 w-3.5 shrink-0" />
              <span>Post Comment</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

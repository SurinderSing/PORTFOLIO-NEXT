import React from 'react';
import { MessageSquare } from 'lucide-react';

interface CommentsHeaderProps {
  count: number;
}

export const CommentsHeader: React.FC<CommentsHeaderProps> = ({ count }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div>
          <h3 className="font-sans text-lg font-bold text-foreground">
            Discussion ({count})
          </h3>
          <p className="text-[11px] text-muted-foreground">
            Technical insights, critiques, and feedback
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommentsHeader;

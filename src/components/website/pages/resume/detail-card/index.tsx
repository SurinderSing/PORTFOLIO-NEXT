import React from 'react';
import { Calendar } from 'lucide-react';

interface DetailCardProps {
  date: string;
  title: string;
  place: string;
  description?: string;
  technologies?: string[];
}

const DetailCard: React.FC<DetailCardProps> = ({
  date,
  title,
  place,
  description,
  technologies = [],
}) => {
  return (
    <div className="rounded-lg border border-border/50 bg-background/60 p-4 font-mono space-y-2 hover:border-primary/40 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <h4 className="text-xs sm:text-sm font-bold text-foreground">
          {title}
        </h4>
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Calendar className="h-3 w-3 text-primary" />
          <span>{date}</span>
        </div>
      </div>

      <p className="text-xs font-semibold text-primary/90">{place}</p>

      {description && (
        <p className="text-xs text-muted-foreground leading-relaxed pt-1">
          {description}
        </p>
      )}

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-1 pt-1.5">
          {technologies.map((t, idx) => (
            <span
              key={idx}
              className="rounded bg-tertiary-2 px-1.5 py-0.5 text-[9px] text-muted-foreground border border-border/40"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DetailCard;

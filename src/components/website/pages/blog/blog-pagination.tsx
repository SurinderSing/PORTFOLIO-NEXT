'use client';

import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface BlogPaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  startIndex: number;
  endIndex: number;
  onPageChange: (page: number) => void;
}

export const BlogPagination: React.FC<BlogPaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  startIndex,
  endIndex,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  // Generate page numbers with ellipsis windowing
  const getPageNumbers = (): (number | string)[] => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
  const currentCountEnd = Math.min(endIndex, totalItems);
  const currentCountStart = totalItems > 0 ? startIndex + 1 : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 pb-2 border-t border-border/60 font-mono">
      {/* Items range counter */}
      <div className="text-xs text-muted-foreground order-2 sm:order-1">
        Showing{' '}
        <span className="font-bold text-foreground">
          {currentCountStart}–{currentCountEnd}
        </span>{' '}
        of <span className="font-bold text-foreground">{totalItems}</span>{' '}
        articles
        <span className="ml-2 inline-block rounded-md bg-tertiary-2 border border-border/70 px-2 py-0.5 text-[11px] text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Pagination navigation controls */}
      <div className="flex items-center gap-1.5 order-1 sm:order-2 flex-wrap justify-center">
        {/* First Page Jump */}
        {totalPages > 4 && (
          <button
            type="button"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-label="First page"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-xs transition-colors',
              currentPage === 1
                ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                : 'hover:bg-tertiary-2 hover:border-primary/40 hover:text-foreground text-muted-foreground'
            )}
          >
            <ChevronsLeft className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Previous Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className={cn(
            'flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs transition-colors',
            currentPage === 1
              ? 'opacity-40 cursor-not-allowed text-muted-foreground'
              : 'hover:bg-tertiary-2 hover:border-primary/40 hover:text-foreground text-muted-foreground'
          )}
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Numbered Page Buttons */}
        {pageNumbers.map((page, idx) => {
          if (page === '...') {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="flex h-8 w-8 items-center justify-center text-xs text-muted-foreground"
              >
                …
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-bold transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-xs border border-primary'
                  : 'border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-tertiary-2 hover:border-border/80'
              )}
            >
              {pageNum}
            </button>
          );
        })}

        {/* Next Page */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className={cn(
            'flex h-8 items-center gap-1 rounded-lg border border-border bg-card px-2.5 text-xs transition-colors',
            currentPage === totalPages
              ? 'opacity-40 cursor-not-allowed text-muted-foreground'
              : 'hover:bg-tertiary-2 hover:border-primary/40 hover:text-foreground text-muted-foreground'
          )}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="h-3.5 w-3.5" />
        </button>

        {/* Last Page Jump */}
        {totalPages > 4 && (
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Last page"
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card text-xs transition-colors',
              currentPage === totalPages
                ? 'opacity-40 cursor-not-allowed text-muted-foreground'
                : 'hover:bg-tertiary-2 hover:border-primary/40 hover:text-foreground text-muted-foreground'
            )}
          >
            <ChevronsRight className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default BlogPagination;

'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

interface ParsedBlock {
  type:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'paragraph'
    | 'blockquote'
    | 'ul'
    | 'ol'
    | 'hr'
    | 'code';
  content?: string;
  items?: string[];
  language?: string;
  code?: string;
}

function parseMarkdownToBlocks(markdown: string): ParsedBlock[] {
  if (!markdown || !markdown.trim()) return [];

  const normalized = (markdown || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '  ')
    .replace(/\r\n/g, '\n');

  const lines = normalized.split('\n');
  const blocks: ParsedBlock[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Code block ```
    if (trimmed.startsWith('```')) {
      const language = trimmed.slice(3).trim() || 'code';
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      blocks.push({
        type: 'code',
        language,
        code: codeLines.join('\n'),
      });
      continue;
    }

    // Headings
    if (/^#\s+/.test(trimmed) || /^<h1[^>]*>[\s\S]*<\/h1>$/i.test(trimmed)) {
      const text = trimmed.startsWith('# ')
        ? trimmed.replace(/^#\s+/, '')
        : trimmed.replace(/^<h1[^>]*>([\s\S]*?)<\/h1>$/i, '$1');
      blocks.push({ type: 'h1', content: text });
      i++;
      continue;
    }

    if (/^##\s+/.test(trimmed) || /^<h2[^>]*>[\s\S]*<\/h2>$/i.test(trimmed)) {
      const text = trimmed.startsWith('## ')
        ? trimmed.replace(/^##\s+/, '')
        : trimmed.replace(/^<h2[^>]*>([\s\S]*?)<\/h2>$/i, '$1');
      blocks.push({ type: 'h2', content: text });
      i++;
      continue;
    }

    if (/^###\s+/.test(trimmed) || /^<h3[^>]*>[\s\S]*<\/h3>$/i.test(trimmed)) {
      const text = trimmed.startsWith('### ')
        ? trimmed.replace(/^###\s+/, '')
        : trimmed.replace(/^<h3[^>]*>([\s\S]*?)<\/h3>$/i, '$1');
      blocks.push({ type: 'h3', content: text });
      i++;
      continue;
    }

    // Divider
    if (/^---+$/.test(trimmed) || /^<hr\s*\/?>$/i.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }

    // Blockquote
    if (
      /^>\s*/.test(trimmed) ||
      /^<blockquote[^>]*>[\s\S]*<\/blockquote>$/i.test(trimmed)
    ) {
      if (trimmed.startsWith('<blockquote')) {
        const text = trimmed
          .replace(/^<blockquote[^>]*>([\s\S]*?)<\/blockquote>$/i, '$1')
          .replace(/<p[^>]*>/gi, '')
          .replace(/<\/p>/gi, '<br />');
        blocks.push({ type: 'blockquote', content: text });
        i++;
      } else {
        const quoteLines: string[] = [];
        while (i < lines.length && /^>\s*/.test(lines[i].trim())) {
          quoteLines.push(lines[i].trim().replace(/^>\s*/, ''));
          i++;
        }
        blocks.push({ type: 'blockquote', content: quoteLines.join('<br />') });
      }
      continue;
    }

    // Unordered List
    if (/^[-*]\s+/.test(trimmed) || /^<ul[^>]*>[\s\S]*<\/ul>$/i.test(trimmed)) {
      if (trimmed.startsWith('<ul')) {
        const items = Array.from(
          trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)
        ).map((m) => m[1]);
        blocks.push({ type: 'ul', items });
        i++;
      } else {
        const items: string[] = [];
        while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^[-*]\s+/, ''));
          i++;
        }
        blocks.push({ type: 'ul', items });
      }
      continue;
    }

    // Ordered List
    if (
      /^\d+\.\s+/.test(trimmed) ||
      /^<ol[^>]*>[\s\S]*<\/ol>$/i.test(trimmed)
    ) {
      if (trimmed.startsWith('<ol')) {
        const items = Array.from(
          trimmed.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)
        ).map((m) => m[1]);
        blocks.push({ type: 'ol', items });
        i++;
      } else {
        const items: string[] = [];
        while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
          items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
          i++;
        }
        blocks.push({ type: 'ol', items });
      }
      continue;
    }

    // Paragraph: collect lines until blank line or next block element
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !/^#{1,6}\s+/.test(lines[i].trim()) &&
      !/^>\s*/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim()) &&
      !/^<(h[1-6]|blockquote|ul|ol|pre)[\s\S]*>/i.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      paraLines.forEach((line) => {
        if (line) {
          blocks.push({ type: 'paragraph', content: line });
        }
      });
    }
  }

  return blocks;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  const blocks = parseMarkdownToBlocks(content);

  return (
    <div className="prose prose-invert max-w-none font-sans text-foreground/90 leading-relaxed space-y-6">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <CodeBlock
              key={idx}
              language={block.language || 'code'}
              code={block.code || ''}
            />
          );
        }

        if (block.type === 'h1') {
          return (
            <h1
              key={idx}
              className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2"
              dangerouslySetInnerHTML={{
                __html: formatInlineMarkdown(block.content || ''),
              }}
            />
          );
        }

        if (block.type === 'h2') {
          return (
            <h2
              key={idx}
              className="font-mono text-xl md:text-2xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2"
              dangerouslySetInnerHTML={{
                __html: formatInlineMarkdown(block.content || ''),
              }}
            />
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={idx}
              className="font-mono text-lg font-bold text-foreground mt-6 mb-3"
              dangerouslySetInnerHTML={{
                __html: formatInlineMarkdown(block.content || ''),
              }}
            />
          );
        }

        if (block.type === 'hr') {
          return <hr key={idx} className="my-8 border-border/60" />;
        }

        if (block.type === 'blockquote') {
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground text-sm md:text-base my-4 bg-primary/5 rounded-r-lg"
              dangerouslySetInnerHTML={{
                __html: formatInlineMarkdown(block.content || ''),
              }}
            />
          );
        }

        if (block.type === 'ul') {
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 my-4">
              {block.items?.map((item, iIdx) => (
                <li
                  key={iIdx}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatInlineMarkdown(item),
                  }}
                />
              ))}
            </ul>
          );
        }

        if (block.type === 'ol') {
          return (
            <ol key={idx} className="list-decimal pl-6 space-y-2 my-4">
              {block.items?.map((item, iIdx) => (
                <li
                  key={iIdx}
                  className="text-sm md:text-base text-muted-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: formatInlineMarkdown(item),
                  }}
                />
              ))}
            </ol>
          );
        }

        return (
          <p
            key={idx}
            className="text-sm md:text-base leading-relaxed text-muted-foreground my-3"
            dangerouslySetInnerHTML={{
              __html: formatInlineMarkdown(block.content || ''),
            }}
          />
        );
      })}
    </div>
  );
};

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl border border-border bg-card/80 overflow-hidden my-6 font-mono text-xs shadow-sm">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 bg-tertiary-2 text-muted-foreground">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-primary" />
          <span className="text-[11px] font-semibold uppercase">
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 text-[11px] hover:text-foreground transition-colors"
          title="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-foreground/90 font-mono text-xs leading-relaxed no-scrollbar">
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
};

function formatInlineMarkdown(text: string): string {
  return (
    text
      // Normalize unescaped entities if present
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      // Bold + Italic
      .replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<strong class="text-foreground font-semibold"><em>$1</em></strong>'
      )
      // Bold
      .replace(
        /\*\*(.*?)\*\*/g,
        '<strong class="text-foreground font-semibold">$1</strong>'
      )
      .replace(
        /__(.*?)__/g,
        '<strong class="text-foreground font-semibold">$1</strong>'
      )
      // Strikethrough
      .replace(/~~(.*?)~~/g, '<del class="opacity-70 line-through">$1</del>')
      .replace(
        /<strike>(.*?)<\/strike>/gi,
        '<del class="opacity-70 line-through">$1</del>'
      )
      .replace(
        /<s>(.*?)<\/s>/gi,
        '<del class="opacity-70 line-through">$1</del>'
      )
      // Underline
      .replace(
        /<u>(.*?)<\/u>/gi,
        '<u class="underline underline-offset-4 decoration-primary/80">$1</u>'
      )
      // Inline code
      .replace(
        /`([^`]+)`/g,
        '<code class="px-1.5 py-0.5 rounded bg-tertiary-2 border border-border/50 text-primary font-mono text-xs">$1</code>'
      )
      // Images
      .replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        '<img src="$2" alt="$1" class="rounded-xl border border-border my-4 shadow-sm max-w-full" />'
      )
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary underline underline-offset-2 hover:opacity-80">$1</a>'
      )
  );
}

export default ArticleContent;

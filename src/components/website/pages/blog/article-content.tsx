'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // Normalize escaped newlines if any exist in raw database string
  const normalizedContent = (content || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\\t/g, '  ');

  // Simple markdown renderer for clean paragraph & code block formatting
  const sections = normalizedContent.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-invert max-w-none font-sans text-foreground/90 leading-relaxed space-y-6">
      {sections.map((section, idx) => {
        if (section.startsWith('```')) {
          const firstLineEnd = section.indexOf('\n');
          const language =
            firstLineEnd > 3 ? section.slice(3, firstLineEnd).trim() : 'code';
          const code =
            firstLineEnd > 3
              ? section.slice(firstLineEnd + 1, -3)
              : section.slice(3, -3);

          return <CodeBlock key={idx} language={language} code={code} />;
        }

        // Parse markdown blocks separated by double newlines
        const blocks = section.split(/\n\n+/).filter(Boolean);

        return (
          <React.Fragment key={idx}>
            {blocks.map((block, bIdx) => {
              const trimmed = block.trim();
              if (!trimmed) return null;

              // Heading 1 (# Heading or <h1>Heading</h1>)
              if (
                trimmed.startsWith('# ') ||
                /^<h1[^>]*>[\s\S]*<\/h1>$/i.test(trimmed)
              ) {
                const headingText = trimmed.startsWith('# ')
                  ? trimmed.replace(/^#\s+/, '')
                  : trimmed.replace(/^<h1[^>]*>([\s\S]*?)<\/h1>$/i, '$1');

                return (
                  <h1
                    key={bIdx}
                    className="font-mono text-2xl md:text-3xl font-bold tracking-tight text-foreground mt-8 mb-4 border-b border-border/40 pb-2"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineMarkdown(headingText),
                    }}
                  />
                );
              }

              // Heading 2 (## Heading or <h2>Heading</h2>)
              if (
                trimmed.startsWith('## ') ||
                /^<h2[^>]*>[\s\S]*<\/h2>$/i.test(trimmed)
              ) {
                const headingText = trimmed.startsWith('## ')
                  ? trimmed.replace(/^##\s+/, '')
                  : trimmed.replace(/^<h2[^>]*>([\s\S]*?)<\/h2>$/i, '$1');

                return (
                  <h2
                    key={bIdx}
                    className="font-mono text-xl md:text-2xl font-bold tracking-tight text-foreground mt-8 mb-4 flex items-center gap-2 border-b border-border/40 pb-2"
                  >
                    <span className="text-primary font-bold text-base">##</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatInlineMarkdown(headingText),
                      }}
                    />
                  </h2>
                );
              }

              // Heading 3 (### Heading or <h3>Heading</h3>)
              if (
                trimmed.startsWith('### ') ||
                /^<h3[^>]*>[\s\S]*<\/h3>$/i.test(trimmed)
              ) {
                const headingText = trimmed.startsWith('### ')
                  ? trimmed.replace(/^###\s+/, '')
                  : trimmed.replace(/^<h3[^>]*>([\s\S]*?)<\/h3>$/i, '$1');

                return (
                  <h3
                    key={bIdx}
                    className="font-mono text-lg font-bold text-foreground mt-6 mb-3 flex items-center gap-2"
                  >
                    <span className="text-primary font-bold text-sm">###</span>
                    <span
                      dangerouslySetInnerHTML={{
                        __html: formatInlineMarkdown(headingText),
                      }}
                    />
                  </h3>
                );
              }

              // Divider
              if (trimmed === '---' || /^<hr\s*\/?>$/i.test(trimmed)) {
                return <hr key={bIdx} className="my-8 border-border/60" />;
              }

              // Blockquotes
              if (
                trimmed.startsWith('> ') ||
                /^<blockquote[^>]*>[\s\S]*<\/blockquote>$/i.test(trimmed)
              ) {
                const quoteText = trimmed.startsWith('> ')
                  ? trimmed.replace(/^>\s*/gm, '')
                  : trimmed.replace(
                      /^<blockquote[^>]*>([\s\S]*?)<\/blockquote>$/i,
                      '$1'
                    );

                return (
                  <blockquote
                    key={bIdx}
                    className="border-l-4 border-primary pl-4 py-2 italic text-muted-foreground text-sm md:text-base my-4 bg-primary/5 rounded-r-lg"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineMarkdown(quoteText),
                    }}
                  />
                );
              }

              // Check for ordered lists (1. item, 2. item or <ol><li>...</li></ol>)
              if (/^<ol[^>]*>[\s\S]*<\/ol>$/i.test(trimmed)) {
                return (
                  <div
                    key={bIdx}
                    className="my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:text-sm [&_li]:md:text-base [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_li]:my-1.5"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineMarkdown(trimmed),
                    }}
                  />
                );
              }

              const lines = trimmed.split('\n');
              const hasOrderedItems = lines.some((l) =>
                /^\d+\.\s+/.test(l.trim())
              );
              if (hasOrderedItems) {
                return (
                  <ol key={bIdx} className="list-decimal pl-6 space-y-2 my-4">
                    {lines
                      .filter((l) => /^\d+\.\s+/.test(l.trim()))
                      .map((item, oIdx) => (
                        <li
                          key={oIdx}
                          className="text-sm md:text-base text-muted-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: formatInlineMarkdown(
                              item.replace(/^\d+\.\s+/, '')
                            ),
                          }}
                        />
                      ))}
                  </ol>
                );
              }

              // Check if block contains unordered list items or <ul><li>...</li></ul>
              if (/^<ul[^>]*>[\s\S]*<\/ul>$/i.test(trimmed)) {
                return (
                  <div
                    key={bIdx}
                    className="my-4 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:text-sm [&_li]:md:text-base [&_li]:text-muted-foreground [&_li]:leading-relaxed [&_li]:my-1.5"
                    dangerouslySetInnerHTML={{
                      __html: formatInlineMarkdown(trimmed),
                    }}
                  />
                );
              }

              const hasListItems = lines.some(
                (l) => l.trim().startsWith('- ') || l.trim().startsWith('* ')
              );

              if (hasListItems) {
                const leadInLines: string[] = [];
                const listLines: string[] = [];
                let isListMode = false;

                lines.forEach((line) => {
                  const lineTrimmed = line.trim();
                  if (
                    lineTrimmed.startsWith('- ') ||
                    lineTrimmed.startsWith('* ')
                  ) {
                    isListMode = true;
                    listLines.push(lineTrimmed.slice(2));
                  } else if (isListMode) {
                    listLines.push(lineTrimmed);
                  } else {
                    leadInLines.push(lineTrimmed);
                  }
                });

                return (
                  <div key={bIdx} className="space-y-3 my-4">
                    {leadInLines.length > 0 && (
                      <p
                        className="text-sm md:text-base leading-relaxed text-muted-foreground"
                        dangerouslySetInnerHTML={{
                          __html: formatInlineMarkdown(leadInLines.join(' ')),
                        }}
                      />
                    )}
                    <ul className="list-none space-y-2.5 pl-2">
                      {listLines.map((item, iIdx) => (
                        <li
                          key={iIdx}
                          className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span
                            dangerouslySetInnerHTML={{
                              __html: formatInlineMarkdown(item),
                            }}
                          />
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }

              return (
                <p
                  key={bIdx}
                  className="text-sm md:text-base leading-relaxed text-muted-foreground"
                  dangerouslySetInnerHTML={{
                    __html: formatInlineMarkdown(trimmed),
                  }}
                />
              );
            })}
          </React.Fragment>
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
      // Bold
      .replace(
        /\*\*\*(.*?)\*\*\*/g,
        '<strong class="text-foreground font-semibold">$1</strong>'
      )
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
      .replace(/\n/g, '<br />')
  );
}

export default ArticleContent;

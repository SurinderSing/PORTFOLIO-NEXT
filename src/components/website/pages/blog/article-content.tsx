'use client';

import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface ArticleContentProps {
  content: string;
}

export const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
  // Simple markdown renderer for clean paragraph & code block formatting
  const sections = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose prose-invert max-w-none font-sans text-foreground/90 leading-relaxed space-y-6">
      {sections.map((section, idx) => {
        if (section.startsWith('```')) {
          const firstLineEnd = section.indexOf('\n');
          const language = section.slice(3, firstLineEnd).trim() || 'code';
          const code = section.slice(firstLineEnd + 1, -3);

          return <CodeBlock key={idx} language={language} code={code} />;
        }

        // Parse markdown headers and paragraphs
        const paragraphs = section.split('\n\n').filter(Boolean);

        return (
          <React.Fragment key={idx}>
            {paragraphs.map((p, pIdx) => {
              const trimmed = p.trim();

              if (trimmed.startsWith('## ')) {
                return (
                  <h2
                    key={pIdx}
                    className="font-mono text-xl md:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3 flex items-center gap-2 border-b border-border/40 pb-2"
                  >
                    <span className="text-primary font-bold text-base">##</span>
                    {trimmed.replace('## ', '')}
                  </h2>
                );
              }

              if (trimmed.startsWith('### ')) {
                return (
                  <h3
                    key={pIdx}
                    className="font-mono text-lg font-bold text-foreground mt-6 mb-2 flex items-center gap-2"
                  >
                    <span className="text-primary font-bold text-sm">###</span>
                    {trimmed.replace('### ', '')}
                  </h3>
                );
              }

              if (trimmed === '---') {
                return <hr key={pIdx} className="my-8 border-border/60" />;
              }

              if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
                const items = trimmed
                  .split('\n')
                  .filter(
                    (line) => line.startsWith('- ') || line.startsWith('* ')
                  );
                return (
                  <ul key={pIdx} className="list-none space-y-2 pl-2 my-4">
                    {items.map((item, iIdx) => (
                      <li
                        key={iIdx}
                        className="flex items-start gap-2.5 text-sm md:text-base text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 shrink-0" />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: formatInlineMarkdown(item.slice(2)),
                          }}
                        />
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p
                  key={pIdx}
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
    <div className="rounded-lg border border-border bg-card/80 overflow-hidden my-6 font-mono text-xs shadow-xs">
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
  return text
    .replace(
      /\*\*(.*?)\*\*/g,
      '<strong class="text-foreground font-semibold">$1</strong>'
    )
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(
      /`([^`]+)`/g,
      '<code class="px-1.5 py-0.5 rounded bg-tertiary-2 border border-border/50 text-primary font-mono text-xs">$1</code>'
    );
}

export default ArticleContent;

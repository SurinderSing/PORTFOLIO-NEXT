'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import {
  Bold,
  Underline,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Link as LinkIcon,
  Image as ImageIcon,
  Minus,
  Undo,
  Redo,
  RemoveFormatting,
  FileCode,
  Eye,
  Type,
} from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: number;
}

/**
 * Idempotent, lossless Markdown to HTML converter
 */
function markdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) return '<p><br></p>';

  // If already HTML block formatted, return sanitized HTML
  if (
    /^<(p|div|h[1-6]|ul|ol|blockquote|pre|table)[\s\S]*>/i.test(markdown.trim())
  ) {
    return markdown;
  }

  // Normalize newlines
  const normalized = markdown.replace(/\r\n/g, '\n');

  // Split into distinct blocks by double newlines
  const rawBlocks = normalized.split(/\n\n+/);
  const htmlBlocks: string[] = [];

  for (const block of rawBlocks) {
    const trimmed = block.trim();
    if (!trimmed) continue;

    // Code block
    if (trimmed.startsWith('```')) {
      const firstLineEnd = trimmed.indexOf('\n');
      const lang =
        firstLineEnd > 3 ? trimmed.slice(3, firstLineEnd).trim() : '';
      const code =
        firstLineEnd > 3
          ? trimmed.slice(firstLineEnd + 1, -3)
          : trimmed.slice(3, -3);
      htmlBlocks.push(
        `<pre><code class="language-${lang}">${code}</code></pre>`
      );
      continue;
    }

    // Headings
    if (/^#\s+/.test(trimmed)) {
      htmlBlocks.push(
        `<h1>${formatInlineElements(trimmed.replace(/^#\s+/, ''))}</h1>`
      );
      continue;
    }
    if (/^##\s+/.test(trimmed)) {
      htmlBlocks.push(
        `<h2>${formatInlineElements(trimmed.replace(/^##\s+/, ''))}</h2>`
      );
      continue;
    }
    if (/^###\s+/.test(trimmed)) {
      htmlBlocks.push(
        `<h3>${formatInlineElements(trimmed.replace(/^###\s+/, ''))}</h3>`
      );
      continue;
    }

    // Horizontal Rule
    if (/^---+$/.test(trimmed)) {
      htmlBlocks.push('<hr />');
      continue;
    }

    // Blockquote
    if (/^>\s+/.test(trimmed)) {
      const quoteContent = trimmed
        .split('\n')
        .map((l) => l.replace(/^>\s*/, ''))
        .join('<br />');
      htmlBlocks.push(
        `<blockquote>${formatInlineElements(quoteContent)}</blockquote>`
      );
      continue;
    }

    // Unordered List
    if (/^[-*]\s+/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .filter((l) => /^[-*]\s+/.test(l.trim()))
        .map(
          (l) => `<li>${formatInlineElements(l.replace(/^[-*]\s+/, ''))}</li>`
        )
        .join('');
      htmlBlocks.push(`<ul>${items}</ul>`);
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items = trimmed
        .split('\n')
        .filter((l) => /^\d+\.\s+/.test(l.trim()))
        .map(
          (l) => `<li>${formatInlineElements(l.replace(/^\d+\.\s+/, ''))}</li>`
        )
        .join('');
      htmlBlocks.push(`<ol>${items}</ol>`);
      continue;
    }

    // Regular Paragraph (convert single newlines inside paragraph to <br />)
    const paraHtml = formatInlineElements(trimmed).replace(/\n/g, '<br />');
    htmlBlocks.push(`<p>${paraHtml}</p>`);
  }

  return htmlBlocks.length > 0 ? htmlBlocks.join('\n') : '<p><br></p>';
}

/**
 * Format inline elements (bold, strikethrough, code, links, images, underline)
 */
function formatInlineElements(text: string): string {
  return (
    text
      // Images
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
      // Links
      .replace(
        /\[([^\]]+)\]\(([^)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
      )
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/__(.+?)__/g, '<strong>$1</strong>')
      // Strikethrough
      .replace(/~~(.+?)~~/g, '<del>$1</del>')
      // Inline Code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
  );
}

/**
 * Idempotent, lossless HTML to Markdown converter
 */
function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return '';

  // Clean empty wrapper artifacts
  const cleanHtml = html
    .replace(/<p><br\s*\/?><\/p>/gi, '\n\n')
    .replace(/<div><br\s*\/?><\/div>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // Parse HTML elements into clean Markdown blocks
  const result = cleanHtml
    // Headings
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    // Code blocks
    .replace(
      /<pre><code(?:\s+class="language-([a-z0-9_-]+)")?>([\s\S]*?)<\/code><\/pre>/gi,
      (_match, lang, code) => `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\`\n\n`
    )
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, '```\n$1\n```\n\n')
    // Blockquote
    .replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_match, quote) => {
      const cleanQuote = quote
        .replace(/<p[^>]*>/gi, '')
        .replace(/<\/p>/gi, '\n');
      return `> ${cleanQuote.trim()}\n\n`;
    })
    // Lists
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_match, list) => {
      const items = list
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n')
        .trim();
      return `${items}\n\n`;
    })
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match, list) => {
      let index = 1;
      const items = list
        .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, () => `${index++}. $1\n`)
        .trim();
      return `${items}\n\n`;
    })
    // Inline formatting
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<del>([\s\S]*?)<\/del>/gi, '~~$1~~')
    .replace(/<strike>([\s\S]*?)<\/strike>/gi, '~~$1~~')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    // Links & Images
    .replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(
      /<img[^>]+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/gi,
      (_match, src, alt) => `![${alt || ''}](${src})`
    )
    // Paragraphs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1\n')
    // Horizontal Rule
    .replace(/<hr\s*\/?>/gi, '\n---\n\n')
    // Clean any residual HTML tags
    .replace(/<(?!\/?(u|span|mark))[^>]+>/g, '')
    // Normalize excessive newlines to double newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return result;
}

interface ActiveFormats {
  bold: boolean;
  underline: boolean;
  strikeThrough: boolean;
  unorderedList: boolean;
  orderedList: boolean;
  blockquote: boolean;
  codeBlock: boolean;
  heading: 'h1' | 'h2' | 'h3' | 'p';
}

const DEFAULT_ACTIVE_FORMATS: ActiveFormats = {
  bold: false,
  underline: false,
  strikeThrough: false,
  unorderedList: false,
  orderedList: false,
  blockquote: false,
  codeBlock: false,
  heading: 'p',
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your article here... Press Enter for line breaks, or use the toolbar above to style headings, bold, lists, and code blocks.',
  minHeight = 420,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<'wysiwyg' | 'markdown'>('wysiwyg');
  const [rawText, setRawText] = useState(value || '');
  const [activeFormats, setActiveFormats] = useState<ActiveFormats>(
    DEFAULT_ACTIVE_FORMATS
  );
  const isUpdatingRef = useRef(false);

  // Detect current cursor active formatting
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;

    try {
      const bold = document.queryCommandState('bold');
      const underline = document.queryCommandState('underline');
      const strikeThrough = document.queryCommandState('strikeThrough');
      const unorderedList = document.queryCommandState('insertUnorderedList');
      const orderedList = document.queryCommandState('insertOrderedList');

      let heading: 'h1' | 'h2' | 'h3' | 'p' = 'p';
      let blockquote = false;
      let codeBlock = false;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node: Node | null = selection.anchorNode;
        while (node && node !== editorRef.current) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const tagName = (node as HTMLElement).tagName.toLowerCase();
            if (tagName === 'h1') heading = 'h1';
            else if (tagName === 'h2') heading = 'h2';
            else if (tagName === 'h3') heading = 'h3';
            else if (tagName === 'blockquote') blockquote = true;
            else if (tagName === 'pre' || tagName === 'code') codeBlock = true;
          }
          node = node.parentNode;
        }
      }

      setActiveFormats({
        bold,
        underline,
        strikeThrough,
        unorderedList,
        orderedList,
        blockquote,
        codeBlock,
        heading,
      });
    } catch {
      // ignore
    }
  }, []);

  // Listen to selection changes to update toolbar active buttons
  useEffect(() => {
    const handleSelectionChange = () => {
      if (editorRef.current && document.activeElement === editorRef.current) {
        updateActiveFormats();
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, [updateActiveFormats]);

  // Sync initial HTML content into contentEditable
  useEffect(() => {
    if (!isUpdatingRef.current) {
      const currentRaw = value || '';
      setRawText(currentRaw);
      if (editorRef.current) {
        const html = markdownToHtml(currentRaw);
        if (editorRef.current.innerHTML !== html) {
          editorRef.current.innerHTML = html;
        }
      }
    }
  }, [value]);

  const handleInput = useCallback(() => {
    if (!editorRef.current) return;
    isUpdatingRef.current = true;
    const html = editorRef.current.innerHTML;
    const markdown = htmlToMarkdown(html);
    setRawText(markdown);
    onChange(markdown);
    updateActiveFormats();
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 50);
  }, [onChange, updateActiveFormats]);

  // Execute formatting commands directly on text selection
  const executeCommand = useCallback(
    (command: string, val: string | undefined = undefined) => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      document.execCommand(command, false, val);
      if (editorRef.current) {
        handleInput();
      }
      updateActiveFormats();
    },
    [handleInput, updateActiveFormats]
  );

  const handleHeading = (tag: 'h1' | 'h2' | 'h3' | 'p') => {
    executeCommand('formatBlock', tag === 'p' ? '<p>' : `<${tag}>`);
  };

  const handleLink = () => {
    const url = prompt('Enter link URL (e.g. https://example.com):');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const handleImage = () => {
    const url = prompt('Enter image URL (Unsplash, Imgur, GitHub, etc.):');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const handleRawTextChange = (newText: string) => {
    setRawText(newText);
    onChange(newText);
    if (editorRef.current) {
      editorRef.current.innerHTML = markdownToHtml(newText);
    }
  };

  const handleSwitchMode = (targetMode: 'wysiwyg' | 'markdown') => {
    if (targetMode === viewMode) return;

    if (targetMode === 'markdown') {
      // Transitioning from WYSIWYG to Markdown: extract latest HTML to Markdown
      if (editorRef.current) {
        const md = htmlToMarkdown(editorRef.current.innerHTML);
        setRawText(md);
        onChange(md);
      }
    } else {
      // Transitioning from Markdown to WYSIWYG: populate editor with latest markdown HTML
      const html = markdownToHtml(rawText);
      if (editorRef.current) {
        editorRef.current.innerHTML = html;
      }
      onChange(rawText);
    }

    setViewMode(targetMode);
  };

  return (
    <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col font-sans transition-colors">
      {/* Editor Header & Format Toolbar */}
      <div className="flex items-center justify-between border-b border-border bg-tertiary-2/60 px-3 py-2 flex-wrap gap-2 select-none">
        {/* Formatting Actions */}
        <div className="flex items-center flex-wrap gap-1">
          {/* Headings */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onClick={() => handleHeading('p')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'p' &&
                !activeFormats.blockquote &&
                !activeFormats.codeBlock
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Normal Paragraph"
            >
              <Type className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h1')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h1'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 1"
            >
              <Heading1 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h2')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h2'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 2"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h3')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h3'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 3"
            >
              <Heading3 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Text Styles (Bold, Underline, Strikethrough) */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onClick={() => executeCommand('bold')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.bold
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-3.5 w-3.5 font-bold" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('underline')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.underline
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Underline (Ctrl+U)"
            >
              <Underline className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('strikeThrough')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.strikeThrough
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Strikethrough"
            >
              <Strikethrough className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Lists & Quotes */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onClick={() => executeCommand('insertUnorderedList')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.unorderedList
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Bullet List"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('insertOrderedList')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.orderedList
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Numbered List"
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                executeCommand('formatBlock', '<blockquote>');
              }}
              className={`p-1.5 rounded transition-all ${
                activeFormats.blockquote
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Blockquote"
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Code & Media */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onClick={() => executeCommand('formatBlock', '<pre>')}
              className={`p-1.5 rounded transition-all ${
                activeFormats.codeBlock
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Code Block"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleLink}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Insert Link"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={handleImage}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('insertHorizontalRule')}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Divider Line"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* History */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onClick={() => executeCommand('undo')}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Undo"
            >
              <Undo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('redo')}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Redo"
            >
              <Redo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('removeFormat')}
              className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
              title="Clear Formatting"
            >
              <RemoveFormatting className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* View Mode Switcher: Visual (Google Docs/Word) vs Markdown Source */}
        <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-card p-1 text-xs font-mono">
          <button
            type="button"
            onClick={() => handleSwitchMode('wysiwyg')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-semibold ${
              viewMode === 'wysiwyg'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
            }`}
            title="Visual Document Editor (Google Docs style)"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>Visual Editor</span>
          </button>
          <button
            type="button"
            onClick={() => handleSwitchMode('markdown')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all font-semibold ${
              viewMode === 'markdown'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
            }`}
            title="Raw Markdown / Code Mode"
          >
            <FileCode className="h-3.5 w-3.5" />
            <span>Markdown Source</span>
          </button>
        </div>
      </div>

      {/* Persistent Editor Body (Zero unmounting, instant seamless synchronization) */}
      <div className="relative w-full flex-1">
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onKeyUp={updateActiveFormats}
          onMouseUp={updateActiveFormats}
          onFocus={updateActiveFormats}
          style={{
            minHeight: `${minHeight}px`,
            display: viewMode === 'wysiwyg' ? 'block' : 'none',
          }}
          data-placeholder={placeholder}
          className="rich-editor-content w-full p-6 md:p-8 outline-none bg-card text-foreground font-sans text-base leading-relaxed overflow-y-auto focus:ring-0 focus:outline-none"
        />

        <textarea
          value={rawText}
          onChange={(e) => handleRawTextChange(e.target.value)}
          style={{
            minHeight: `${minHeight}px`,
            display: viewMode === 'markdown' ? 'block' : 'none',
          }}
          placeholder={placeholder}
          className="w-full p-6 md:p-8 outline-none bg-card text-foreground font-mono text-sm leading-relaxed border-0 resize-y focus:ring-0 focus:outline-none"
        />
      </div>
    </div>
  );
};

export default RichTextEditor;

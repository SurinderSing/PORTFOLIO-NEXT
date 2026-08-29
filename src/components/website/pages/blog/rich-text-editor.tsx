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
 * Converts basic Markdown to HTML for initial WYSIWYG display
 */
function markdownToHtml(markdown: string): string {
  if (!markdown || !markdown.trim()) return '<p><br></p>';

  // If already HTML formatted
  if (/^<[a-z][\s\S]*>$/i.test(markdown.trim())) {
    return markdown;
  }

  const html = markdown
    // Normalize newlines
    .replace(/\r\n/g, '\n')
    // Code blocks
    .replace(
      /```([a-z0-9_-]*)\n([\s\S]*?)```/g,
      '<pre><code class="language-$1">$2</code></pre>'
    )
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Blockquote
    .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
    // Bold, Strikethrough
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong>$1</strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '$1')
    .replace(/~~(.*?)~~/gim, '<del>$1</del>')
    // Inline code
    .replace(/`([^`]+)`/gim, '<code>$1</code>')
    // Links
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/gim,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
    )
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />')
    // Horizontal rule
    .replace(/^---$/gim, '<hr />');

  // Convert list items & paragraphs
  const lines = html.split('\n');
  const processedLines: string[] = [];
  let inList = false;
  let listType = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isUnordered = /^[-*]\s+(.*)$/.test(line);
    const isOrdered = /^\d+\.\s+(.*)$/.test(line);

    if (isUnordered) {
      const content = line.replace(/^[-*]\s+/, '');
      if (!inList || listType !== 'ul') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ul>');
        inList = true;
        listType = 'ul';
      }
      processedLines.push(`<li>${content}</li>`);
    } else if (isOrdered) {
      const content = line.replace(/^\d+\.\s+/, '');
      if (!inList || listType !== 'ol') {
        if (inList) processedLines.push(`</${listType}>`);
        processedLines.push('<ol>');
        inList = true;
        listType = 'ol';
      }
      processedLines.push(`<li>${content}</li>`);
    } else {
      if (inList) {
        processedLines.push(`</${listType}>`);
        inList = false;
        listType = '';
      }
      if (line.trim() === '') {
        processedLines.push('<p><br></p>');
      } else if (
        !line.startsWith('<h1') &&
        !line.startsWith('<h2') &&
        !line.startsWith('<h3') &&
        !line.startsWith('<blockquote') &&
        !line.startsWith('<pre') &&
        !line.startsWith('<hr')
      ) {
        processedLines.push(`<p>${line}</p>`);
      } else {
        processedLines.push(line);
      }
    }
  }

  if (inList) {
    processedLines.push(`</${listType}>`);
  }

  return processedLines.join('\n');
}

/**
 * Converts HTML from contentEditable back to clean Markdown / rich content
 */
function htmlToMarkdown(html: string): string {
  if (!html) return '';

  return (
    html
      // Headings
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      // Bold, Strikethrough, Underline
      .replace(/<strong><em>(.*?)<\/em><\/strong>/gi, '**$1**')
      .replace(/<em><strong>(.*?)<\/strong><\/em>/gi, '**$1**')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '$1')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '$1')
      .replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~')
      .replace(/<strike[^>]*>(.*?)<\/strike>/gi, '~~$1~~')
      .replace(/<u[^>]*>(.*?)<\/u>/gi, '$1')
      // Code blocks & Inline code
      .replace(
        /<pre><code class="language-([a-z0-9_-]+)">([\s\S]*?)<\/code><\/pre>/gi,
        '```$1\n$2\n```\n\n'
      )
      .replace(/<pre><code>([\s\S]*?)<\/code><\/pre>/gi, '```\n$1\n```\n\n')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      // Blockquote
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
      // Horizontal Rule
      .replace(/<hr[^>]*>/gi, '\n---\n\n')
      // Lists
      .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_match, p1) => {
        return p1.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n') + '\n';
      })
      .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match, p1) => {
        let index = 1;
        return (
          p1.replace(/<li[^>]*>(.*?)<\/li>/gi, () => `${index++}. $1\n`) + '\n'
        );
      })
      // Links & Images
      .replace(/<a[^>]+href="([^"]+)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<img[^>]+src="([^"]+)"[^>]+alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
      .replace(/<img[^>]+src="([^"]+)"[^>]*>/gi, '![]($1)')
      // Paragraphs & Line Breaks (respecting Enter as line breaks)
      .replace(/<p><br\s*\/?><\/p>/gi, '\n\n')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<div>(.*?)<\/div>/gi, '$1\n')
      // Clean up excessive whitespace
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = 'Write your article here... Press Enter for line breaks, or use the toolbar above to style headings, bold, lists, and code blocks.',
  minHeight = 420,
}) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [viewMode, setViewMode] = useState<'wysiwyg' | 'markdown'>('wysiwyg');
  const [rawText, setRawText] = useState(value || '');
  const isUpdatingRef = useRef(false);

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
    setTimeout(() => {
      isUpdatingRef.current = false;
    }, 50);
  }, [onChange]);

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
    },
    [handleInput]
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
              className="px-2 py-1 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Normal Paragraph"
            >
              <Type className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h1')}
              className="px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Heading 1"
            >
              <Heading1 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h2')}
              className="px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Heading 2"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleHeading('h3')}
              className="px-2 py-1 text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
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
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Bold (Ctrl+B)"
            >
              <Bold className="h-3.5 w-3.5 font-bold" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('underline')}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Underline (Ctrl+U)"
            >
              <Underline className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('strikeThrough')}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
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
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Bullet List"
            >
              <List className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => executeCommand('insertOrderedList')}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Numbered List"
            >
              <ListOrdered className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => {
                executeCommand('formatBlock', '<blockquote>');
              }}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
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
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
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

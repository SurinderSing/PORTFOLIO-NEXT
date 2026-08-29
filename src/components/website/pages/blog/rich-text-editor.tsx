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
  const normalized = (markdown || '')
    .replace(/\\r\\n/g, '\n')
    .replace(/\\n/g, '\n')
    .replace(/\r\n/g, '\n');

  const lines = normalized.split('\n');
  const htmlBlocks: string[] = [];

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
      const lang = trimmed.slice(3).trim();
      i++;
      const codeLines: string[] = [];
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      if (i < lines.length && lines[i].trim().startsWith('```')) {
        i++;
      }
      const code = codeLines.join('\n');
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
      i++;
      continue;
    }

    if (/^##\s+/.test(trimmed)) {
      htmlBlocks.push(
        `<h2>${formatInlineElements(trimmed.replace(/^##\s+/, ''))}</h2>`
      );
      i++;
      continue;
    }

    if (/^###\s+/.test(trimmed)) {
      htmlBlocks.push(
        `<h3>${formatInlineElements(trimmed.replace(/^###\s+/, ''))}</h3>`
      );
      i++;
      continue;
    }

    // Horizontal Rule
    if (/^---+$/.test(trimmed)) {
      htmlBlocks.push('<hr />');
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s*/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s*/.test(lines[i].trim())) {
        quoteLines.push(
          formatInlineElements(lines[i].trim().replace(/^>\s*/, ''))
        );
        i++;
      }
      htmlBlocks.push(
        `<blockquote><p>${quoteLines.join('<br />')}</p></blockquote>`
      );
      continue;
    }

    // Unordered List
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(
          `<li>${formatInlineElements(lines[i].trim().replace(/^[-*]\s+/, ''))}</li>`
        );
        i++;
      }
      htmlBlocks.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered List
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(
          `<li>${formatInlineElements(lines[i].trim().replace(/^\d+\.\s+/, ''))}</li>`
        );
        i++;
      }
      htmlBlocks.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Paragraph: collect lines until blank line or next block
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('```') &&
      !/^#{1,6}\s+/.test(lines[i].trim()) &&
      !/^>\s*/.test(lines[i].trim()) &&
      !/^[-*]\s+/.test(lines[i].trim()) &&
      !/^\d+\.\s+/.test(lines[i].trim()) &&
      !/^---+$/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i++;
    }

    if (paraLines.length > 0) {
      paraLines.forEach((l: string) => {
        if (l.trim()) {
          htmlBlocks.push(`<p>${formatInlineElements(l.trim())}</p>`);
        }
      });
    }
  }

  return htmlBlocks.length > 0 ? htmlBlocks.join('\n') : '<p><br></p>';
}

/**
 * Idempotent, lossless HTML to Markdown converter
 */
function htmlToMarkdown(html: string): string {
  if (!html || !html.trim()) return '';

  // Clean empty wrapper artifacts
  let cleanHtml = html
    .replace(/<p><br\s*\/?><\/p>/gi, '\n\n')
    .replace(/<div><br\s*\/?><\/div>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n');

  // Convert inline styled spans before tag stripping
  cleanHtml = cleanHtml
    .replace(
      /<span[^>]*style="[^"]*font-weight:\s*(?:bold|[6-9]00)[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
      '<strong>$1</strong>'
    )
    .replace(
      /<span[^>]*style="[^"]*text-decoration:[^"]*underline[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
      '<u>$1</u>'
    )
    .replace(
      /<span[^>]*style="[^"]*text-decoration:[^"]*line-through[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
      '<del>$1</del>'
    )
    .replace(
      /<span[^>]*style="[^"]*font-style:\s*italic[^"]*"[^>]*>([\s\S]*?)<\/span>/gi,
      '<em>$1</em>'
    );

  // Strip all span tags completely
  cleanHtml = cleanHtml.replace(/<\/?span[^>]*>/gi, '');

  // Parse HTML elements into clean Markdown blocks
  const result = cleanHtml
    // Headings
    .replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '### $1\n\n')
    // Code blocks
    .replace(
      /<pre[^>]*><code(?:\s+class="language-([a-z0-9_-]+)")?>([\s\S]*?)<\/code><\/pre>/gi,
      (_match: string, lang: string, code: string) => {
        const cleanCode = code
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '');
        return `\`\`\`${lang || ''}\n${cleanCode.trim()}\n\`\`\`\n\n`;
      }
    )
    .replace(
      /<pre[^>]*>([\s\S]*?)<\/pre>/gi,
      (_match: string, code: string) => {
        const cleanCode = code
          .replace(/<br\s*\/?>/gi, '\n')
          .replace(/<[^>]+>/g, '');
        return `\`\`\`\n${cleanCode.trim()}\n\`\`\`\n\n`;
      }
    )
    // Blockquote
    .replace(
      /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi,
      (_match: string, quote: string) => {
        const clean = quote
          .replace(/<p[^>]*>/gi, '')
          .replace(/<\/p>/gi, '\n')
          .replace(/<br\s*\/?>/gi, '\n');
        const lines = clean
          .trim()
          .split('\n')
          .map((l: string) => (l.trim() ? `> ${l.trim()}` : '>'))
          .join('\n');
        return `${lines}\n\n`;
      }
    )
    // Lists
    .replace(/<ul[^>]*>([\s\S]*?)<\/ul>/gi, (_match: string, list: string) => {
      const items = list
        .replace(
          /<li[^>]*>([\s\S]*?)<\/li>/gi,
          (_m: string, item: string) => `- ${item.trim()}\n`
        )
        .trim();
      return `${items}\n\n`;
    })
    .replace(/<ol[^>]*>([\s\S]*?)<\/ol>/gi, (_match: string, list: string) => {
      let index = 1;
      const items = list
        .replace(
          /<li[^>]*>([\s\S]*?)<\/li>/gi,
          (_m: string, item: string) => `${index++}. ${item.trim()}\n`
        )
        .trim();
      return `${items}\n\n`;
    })
    // Inline formatting
    .replace(/<strong>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<b>([\s\S]*?)<\/b>/gi, '**$1**')
    .replace(/<del>([\s\S]*?)<\/del>/gi, '~~$1~~')
    .replace(/<strike>([\s\S]*?)<\/strike>/gi, '~~$1~~')
    .replace(/<s>([\s\S]*?)<\/s>/gi, '~~$1~~')
    .replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`')
    // Links & Images
    .replace(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, '[$2]($1)')
    .replace(
      /<img[^>]+src="([^"]+)"(?:\s+alt="([^"]*)")?[^>]*>/gi,
      (_match: string, src: string, alt: string) => `![${alt || ''}](${src})`
    )
    // Paragraphs & Divs
    .replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n')
    .replace(/<div[^>]*>([\s\S]*?)<\/div>/gi, '$1\n\n')
    // Horizontal Rule
    .replace(/<hr\s*\/?>/gi, '\n---\n\n')
    // Clean any residual HTML tags except u
    .replace(/<(?!\/?u)[^>]+>/g, '')
    // Normalize excessive newlines to double newlines
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return result;
}

/**
 * Finds the closest ancestor element matching tag names within the editor root
 */
function findClosestAncestor(
  root: HTMLElement | null,
  tagNames: string[]
): HTMLElement | null {
  if (!root) return null;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const normalizedTags = tagNames.map((t) => t.toUpperCase());
  let node: Node | null = selection.anchorNode;

  while (node && node !== root) {
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      normalizedTags.includes((node as HTMLElement).tagName.toUpperCase())
    ) {
      return node as HTMLElement;
    }
    node = node.parentNode;
  }
  return null;
}

/**
 * Unwraps a blockquote, preserving child paragraphs or wrapping inline text into paragraphs
 */
function unwrapBlockquote(bq: HTMLElement) {
  const parent = bq.parentNode;
  if (!parent) return;

  const children = Array.from(bq.childNodes);
  const blockTags = [
    'P',
    'DIV',
    'H1',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'UL',
    'OL',
    'PRE',
    'HR',
    'TABLE',
  ];

  if (children.length === 0) {
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    parent.replaceChild(p, bq);
    return;
  }

  const fragment = document.createDocumentFragment();
  let currentP: HTMLParagraphElement | null = null;

  children.forEach((child) => {
    const isBlock =
      child.nodeType === Node.ELEMENT_NODE &&
      blockTags.includes((child as HTMLElement).tagName.toUpperCase());

    if (isBlock) {
      if (currentP) {
        fragment.appendChild(currentP);
        currentP = null;
      }
      fragment.appendChild(child);
    } else {
      if (!currentP) {
        currentP = document.createElement('p');
      }
      currentP.appendChild(child);
    }
  });

  if (currentP) {
    fragment.appendChild(currentP);
  }

  parent.replaceChild(fragment, bq);
}

/**
 * Unwraps a code block (<pre>), converting lines into <p> paragraphs
 */
function unwrapCodeBlock(pre: HTMLElement) {
  const parent = pre.parentNode;
  if (!parent) return;

  const text = pre.textContent || '';
  const lines = text.split('\n');
  const fragment = document.createDocumentFragment();

  if (lines.length === 0 || (lines.length === 1 && !lines[0].trim())) {
    const p = document.createElement('p');
    p.innerHTML = '<br>';
    fragment.appendChild(p);
  } else {
    lines.forEach((line) => {
      const p = document.createElement('p');
      if (line.trim()) {
        p.textContent = line;
      } else {
        p.innerHTML = '<br>';
      }
      fragment.appendChild(p);
    });
  }

  parent.replaceChild(fragment, pre);
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

  // Detect current cursor active formatting across DOM hierarchy and native query states
  const updateActiveFormats = useCallback(() => {
    if (!editorRef.current) return;

    try {
      let isBold = document.queryCommandState('bold');
      let isUnderline = document.queryCommandState('underline');
      let isStrike = document.queryCommandState('strikeThrough');
      let isUnordered = document.queryCommandState('insertUnorderedList');
      let isOrdered = document.queryCommandState('insertOrderedList');

      let heading: 'h1' | 'h2' | 'h3' | 'p' = 'p';
      let blockquote = false;
      let codeBlock = false;

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let node: Node | null = selection.anchorNode;
        while (node && node !== editorRef.current) {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const el = node as HTMLElement;
            const tagName = el.tagName.toLowerCase();
            if (tagName === 'h1') heading = 'h1';
            else if (tagName === 'h2') heading = 'h2';
            else if (tagName === 'h3') heading = 'h3';
            else if (tagName === 'blockquote') blockquote = true;
            else if (tagName === 'pre' || tagName === 'code') codeBlock = true;
            else if (tagName === 'strong' || tagName === 'b') isBold = true;
            else if (tagName === 'u' || tagName === 'ins') isUnderline = true;
            else if (
              tagName === 'del' ||
              tagName === 's' ||
              tagName === 'strike'
            ) {
              isStrike = true;
            } else if (tagName === 'ul') isUnordered = true;
            else if (tagName === 'ol') isOrdered = true;
          }
          node = node.parentNode;
        }
      }

      setActiveFormats({
        bold: isBold,
        underline: isUnderline,
        strikeThrough: isStrike,
        unorderedList: isUnordered,
        orderedList: isOrdered,
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

  // Toggle Blockquote reliably (unwraps when active, wraps when inactive)
  const toggleBlockquote = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const bq = findClosestAncestor(editorRef.current, ['BLOCKQUOTE']);
    if (bq) {
      unwrapBlockquote(bq);
      handleInput();
      updateActiveFormats();
    } else {
      document.execCommand('formatBlock', false, '<blockquote>');
      handleInput();
      updateActiveFormats();
    }
  }, [handleInput, updateActiveFormats]);

  // Toggle Headings (H1, H2, H3, P) with auto-unwrap from blockquote/pre
  const toggleHeading = useCallback(
    (tag: 'h1' | 'h2' | 'h3' | 'p') => {
      if (!editorRef.current) return;
      editorRef.current.focus();

      // Check if currently inside a blockquote
      const bq = findClosestAncestor(editorRef.current, ['BLOCKQUOTE']);
      if (bq) {
        unwrapBlockquote(bq);
      }

      // Check if currently inside a code block <pre>
      const pre = findClosestAncestor(editorRef.current, ['PRE', 'CODE']);
      if (pre) {
        const actualPre =
          pre.tagName.toUpperCase() === 'PRE'
            ? pre
            : (pre.closest('pre') as HTMLElement) || pre;
        unwrapCodeBlock(actualPre);
      }

      // If user clicks normal paragraph 'p' or the already active heading, toggle back to '<p>'
      if (tag === 'p' || activeFormats.heading === tag) {
        document.execCommand('formatBlock', false, '<p>');
      } else {
        document.execCommand('formatBlock', false, `<${tag}>`);
      }

      handleInput();
      updateActiveFormats();
    },
    [activeFormats.heading, handleInput, updateActiveFormats]
  );

  // Toggle Code Block (<pre>) reliably
  const toggleCodeBlock = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const pre = findClosestAncestor(editorRef.current, ['PRE', 'CODE']);
    if (pre) {
      const actualPre =
        pre.tagName.toUpperCase() === 'PRE'
          ? pre
          : (pre.closest('pre') as HTMLElement) || pre;
      unwrapCodeBlock(actualPre);
      handleInput();
      updateActiveFormats();
    } else {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        let blockNode: Node | null = selection.anchorNode;
        while (blockNode && blockNode.parentNode !== editorRef.current) {
          blockNode = blockNode.parentNode;
        }

        if (blockNode && blockNode !== editorRef.current) {
          const preEl = document.createElement('pre');
          const codeEl = document.createElement('code');
          codeEl.textContent = blockNode.textContent || '';
          preEl.appendChild(codeEl);
          editorRef.current.replaceChild(preEl, blockNode);
          handleInput();
          updateActiveFormats();
          return;
        }
      }
      document.execCommand('formatBlock', false, '<pre>');
      handleInput();
      updateActiveFormats();
    }
  }, [handleInput, updateActiveFormats]);

  // Toggle List (Bullet or Numbered)
  const toggleList = useCallback(
    (type: 'unordered' | 'ordered') => {
      if (!editorRef.current) return;
      editorRef.current.focus();

      const command =
        type === 'unordered' ? 'insertUnorderedList' : 'insertOrderedList';
      document.execCommand(command, false);

      handleInput();
      updateActiveFormats();
    },
    [handleInput, updateActiveFormats]
  );

  // Toggle Inline Formatting (Bold, Underline, Strikethrough)
  const toggleInline = useCallback(
    (command: 'bold' | 'underline' | 'strikeThrough') => {
      if (!editorRef.current) return;
      editorRef.current.focus();

      document.execCommand(command, false);
      handleInput();
      updateActiveFormats();
    },
    [handleInput, updateActiveFormats]
  );

  // Link Handler with insert, edit, and remove capability
  const handleLink = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const existingLink = findClosestAncestor(editorRef.current, [
      'A',
    ]) as HTMLAnchorElement | null;
    if (existingLink) {
      const currentHref = existingLink.getAttribute('href') || '';
      const url = prompt(
        'Edit or remove link URL (leave empty to remove link):',
        currentHref
      );
      if (url === null) return;
      if (!url.trim()) {
        document.execCommand('unlink', false);
      } else {
        existingLink.setAttribute('href', url.trim());
      }
      handleInput();
      updateActiveFormats();
      return;
    }

    const url = prompt('Enter link URL (e.g. https://example.com):');
    if (url && url.trim()) {
      document.execCommand('createLink', false, url.trim());
      handleInput();
      updateActiveFormats();
    }
  }, [handleInput, updateActiveFormats]);

  // Image Handler
  const handleImage = useCallback(() => {
    if (!editorRef.current) return;
    editorRef.current.focus();

    const url = prompt('Enter image URL (Unsplash, Imgur, GitHub, etc.):');
    if (url && url.trim()) {
      document.execCommand('insertImage', false, url.trim());
      handleInput();
      updateActiveFormats();
    }
  }, [handleInput, updateActiveFormats]);

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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleHeading('p')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleHeading('h1')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h1'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 1 (Click again to toggle off)"
            >
              <Heading1 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleHeading('h2')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h2'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 2 (Click again to toggle off)"
            >
              <Heading2 className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleHeading('h3')}
              className={`px-2 py-1 text-xs rounded transition-all ${
                activeFormats.heading === 'h3'
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2 font-bold'
              }`}
              title="Heading 3 (Click again to toggle off)"
            >
              <Heading3 className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Text Styles (Bold, Underline, Strikethrough) */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleInline('bold')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleInline('underline')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleInline('strikeThrough')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleList('unordered')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => toggleList('ordered')}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={toggleBlockquote}
              className={`p-1.5 rounded transition-all ${
                activeFormats.blockquote
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Blockquote (Click again to toggle off)"
            >
              <Quote className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Code & Media */}
          <div className="flex items-center rounded-lg border border-border/80 bg-card p-0.5">
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={toggleCodeBlock}
              className={`p-1.5 rounded transition-all ${
                activeFormats.codeBlock
                  ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                  : 'text-muted-foreground hover:text-foreground hover:bg-tertiary-2'
              }`}
              title="Code Block (Click again to toggle off)"
            >
              <Code className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleLink}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Insert Link"
            >
              <LinkIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={handleImage}
              className="p-1.5 text-muted-foreground hover:text-primary hover:bg-tertiary-2 rounded transition-colors"
              title="Insert Image"
            >
              <ImageIcon className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
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
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => executeCommand('undo')}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Undo"
            >
              <Undo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => executeCommand('redo')}
              className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-tertiary-2 rounded transition-colors"
              title="Redo"
            >
              <Redo className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
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
            onMouseDown={(e) => e.preventDefault()}
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
            onMouseDown={(e) => e.preventDefault()}
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

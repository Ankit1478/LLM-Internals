'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Clock, Copy, Check, ExternalLink } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { getArticle } from '@/lib/content/index';
import { useTheme } from '@/components/theme-provider';
import mermaid from 'mermaid';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Mermaid component
function MermaidDiagram({ chart }: { chart: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const { theme } = useTheme();

  useEffect(() => {
    const isDark = theme === 'dark';

    mermaid.initialize({
      startOnLoad: false,
      theme: isDark ? 'dark' : 'base',
      flowchart: {
        padding: 8,
        nodeSpacing: 40,
        rankSpacing: 40,
      },
      themeVariables: isDark ? {
        primaryColor: '#3b82f6',
        primaryTextColor: '#fff',
        primaryBorderColor: '#60a5fa',
        lineColor: '#60a5fa',
        secondaryColor: '#1e293b',
        tertiaryColor: '#0f172a',
        nodeTextColor: '#fff',
        fontSize: '12px',
      } : {
        primaryColor: '#dbeafe',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#3b82f6',
        lineColor: '#3b82f6',
        secondaryColor: '#f1f5f9',
        tertiaryColor: '#e2e8f0',
        background: '#ffffff',
        mainBkg: '#dbeafe',
        nodeBorder: '#3b82f6',
        nodeTextColor: '#1e293b',
        fontFamily: 'inherit',
        fontSize: '12px',
      },
    });

    const renderChart = async () => {
      try {
        const { svg } = await mermaid.render(`mermaid-${Date.now()}`, chart);
        setSvg(svg);
      } catch (e) {
        console.error('Mermaid error:', e);
      }
    };

    renderChart();
  }, [chart, theme]);

  return (
    <div
      ref={containerRef}
      className="my-6 p-4 rounded-lg overflow-x-auto flex justify-center"
      style={{
        background: 'var(--muted)',
        fontSize: '0.875rem',
      }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}

export default function TopicPage() {
  const params = useParams();
  const slug = params.topic as string;
  const article = getArticle(slug);
  const [copied, setCopied] = useState(false);
  const [codeLanguagePreference, setCodeLanguagePreference] = useState<'python' | 'javascript'>('python');

  const copyPageContent = async () => {
    if (!article) return;
    await navigator.clipboard.writeText(article.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openAI = async (platform: 'claude' | 'gemini' | 'chatgpt') => {
    if (!article) return;
    const prompt = `I want help about this topic: ${article.title}\n\n${article.content}`;
    await navigator.clipboard.writeText(prompt);
    const urls = {
      claude: 'https://claude.ai/new',
      gemini: 'https://gemini.google.com/app',
      chatgpt: 'https://chat.openai.com',
    };
    window.open(urls[platform], '_blank');
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--background)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>Article Not Found</h1>
          <Link
            href="/docs"
            className="transition-colors"
            style={{ color: 'var(--muted-foreground)' }}
          >
            ← Back to Docs
          </Link>
        </div>
      </div>
    );
  }

  // Simple markdown to HTML converter
  const renderContent = (content: string) => {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeContent = '';
    let codeLanguage = '';
    let inTable = false;
    let tableRows: React.ReactNode[] = [];
    let inOrderedList = false;
    let orderedListItems: React.ReactNode[] = [];
    const { theme } = useTheme();

    const finishOrderedList = (currentIndex: number) => {
      if (inOrderedList && orderedListItems.length > 0) {
        elements.push(
          <ol key={`ol-${currentIndex}`} className="ml-6 mb-4 list-decimal">
            {orderedListItems}
          </ol>
        );
        orderedListItems = [];
        inOrderedList = false;
      }
    };

    const finishTable = (currentIndex: number) => {
      if (inTable && tableRows.length > 0) {
        // Group tbody rows together
        const tableContent: React.ReactNode[] = [];
        const tbodyRows: React.ReactNode[] = [];

        tableRows.forEach((row) => {
          if (row && typeof row === 'object' && 'type' in row && row.type === 'thead') {
            // If we have tbody rows, wrap them first
            if (tbodyRows.length > 0) {
              tableContent.push(
                <tbody key={`tbody-${currentIndex}-${tableContent.length}`}>
                  {[...tbodyRows]}
                </tbody>
              );
              tbodyRows.length = 0;
            }
            tableContent.push(row);
          } else {
            tbodyRows.push(row);
          }
        });

        // Add remaining tbody rows
        if (tbodyRows.length > 0) {
          tableContent.push(
            <tbody key={`tbody-${currentIndex}-final`}>
              {tbodyRows}
            </tbody>
          );
        }

        elements.push(
          <div key={`table-${currentIndex}`} className="overflow-x-auto my-4">
            <table className="w-full border-collapse" style={{ borderColor: 'var(--border)' }}>
              {tableContent}
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Code block handling
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLanguage = line.slice(3).trim();
          codeContent = '';
        } else {
          // Check if it's a mermaid diagram
          if (codeLanguage === 'mermaid') {
            elements.push(
              <MermaidDiagram key={`mermaid-${index}`} chart={codeContent} />
            );
          } else if (codeLanguage.includes('|')) {
            // Multi-language code block (e.g., python|javascript)
            const languages = codeLanguage.split('|');
            const codeParts = codeContent.split('|||');

            elements.push(
              <div key={`code-${index}`} className="my-4">
                <div className="flex gap-2 mb-2">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLanguagePreference(lang as 'python' | 'javascript')}
                      className="px-3 py-1 text-sm rounded-md transition-all"
                      style={{
                        background: codeLanguagePreference === lang ? 'var(--foreground)' : 'var(--muted)',
                        color: codeLanguagePreference === lang ? 'var(--background)' : 'var(--foreground)',
                      }}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                <SyntaxHighlighter
                  language={codeLanguagePreference}
                  style={theme === 'dark' ? oneDark : oneLight}
                  customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {codeParts[languages.indexOf(codeLanguagePreference)]?.trim() || codeParts[0]?.trim()}
                </SyntaxHighlighter>
              </div>
            );
          } else {
            elements.push(
              <div key={`code-${index}`} className="my-4">
                <SyntaxHighlighter
                  language={codeLanguage || 'text'}
                  style={theme === 'dark' ? oneDark : oneLight}
                  customStyle={{
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {codeContent}
                </SyntaxHighlighter>
              </div>
            );
          }
          inCodeBlock = false;
          codeContent = '';
        }
        return;
      }

      if (inCodeBlock) {
        codeContent += (codeContent ? '\n' : '') + line;
        return;
      }

      // Empty line
      if (!line.trim()) {
        return;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-3xl font-bold mb-4" style={{ color: 'var(--foreground)' }}>
            {line.slice(2)}
          </h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl font-semibold mt-8 mb-4 pb-2 border-b" style={{ color: 'var(--foreground)', borderColor: 'var(--border)' }}>
            {line.slice(3)}
          </h2>
        );
        return;
      }

      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-lg font-semibold mt-6 mb-3" style={{ color: 'var(--foreground)' }}>
            {line.slice(4)}
          </h3>
        );
        return;
      }

      // Image
      if (line.startsWith('![')) {
        const match = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (match) {
          const [, alt, src] = match;
          elements.push(
            <img
              key={`img-${index}`}
              src={src}
              alt={alt}
              className="rounded-lg my-6 w-full"
              style={{ maxWidth: '100%' }}
            />
          );
          return;
        }
      }

      // Blockquote
      if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={index} className="border-l-4 pl-4 my-4 italic" style={{ borderColor: 'var(--border)', color: 'var(--muted-foreground)' }}>
            {line.slice(2)}
          </blockquote>
        );
        return;
      }

      // List items (including nested with spaces/tabs)
      if (line.match(/^[\s]*[-*]\s/)) {
        const indent = line.match(/^[\s]*/)?.[0].length || 0;
        const content = line.replace(/^[\s]*[-*]\s/, '');
        const marginLeft = indent > 0 ? `${(indent / 2) + 2}rem` : '1.5rem';

        elements.push(
          <li key={index} className="mb-2 list-disc" style={{ color: 'var(--foreground)', marginLeft }}>
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }

      // Numbered list
      if (/^\d+\.\s/.test(line)) {
        const content = line.replace(/^\d+\.\s/, '');
        inOrderedList = true;
        orderedListItems.push(
          <li key={index} className="mb-2" style={{ color: 'var(--foreground)' }}>
            {renderInlineMarkdown(content)}
          </li>
        );
        return;
      }

      // If we were in an ordered list and hit a non-list line, finish the list
      if (inOrderedList) {
        finishOrderedList(index);
      }

      // Table handling
      if (line.includes('|')) {
        // Skip separator rows
        if (line.match(/^\|[\s\-:|]+\|$/)) return;

        const cells = line.split('|').filter(cell => cell.trim());
        const isHeader = index > 0 && lines[index + 1]?.match(/^\|[\s\-:|]+\|$/);

        inTable = true;

        if (isHeader) {
          tableRows.push(
            <thead key={`thead-${index}`}>
              <tr style={{ background: 'var(--muted)' }}>
                {cells.map((cell, i) => (
                  <th key={i} className="border px-4 py-2 text-left font-semibold" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                    {renderInlineMarkdown(cell.trim())}
                  </th>
                ))}
              </tr>
            </thead>
          );
        } else {
          // Just push the row, we'll wrap in tbody later
          tableRows.push(
            <tr key={`row-${index}`}>
              {cells.map((cell, i) => (
                <td key={i} className="border px-4 py-2" style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
                  {renderInlineMarkdown(cell.trim())}
                </td>
              ))}
            </tr>
          );
        }
        return;
      }

      // If we were in a table and hit a non-table line, finish the table
      if (inTable) {
        finishTable(index);
      }

      // Regular paragraph
      elements.push(
        <p key={index} className="mb-4 leading-relaxed" style={{ color: 'var(--foreground)' }}>
          {renderInlineMarkdown(line)}
        </p>
      );
    });

    // Finish any remaining table or list
    finishTable(lines.length);
    finishOrderedList(lines.length);

    return elements;
  };

  // Handle inline markdown (bold, italic, code, links)
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Italic
      const italicMatch = remaining.match(/\*(.+?)\*/);
      // Inline code
      const codeMatch = remaining.match(/`(.+?)`/);

      const matches = [
        { match: boldMatch, type: 'bold' },
        { match: italicMatch, type: 'italic' },
        { match: codeMatch, type: 'code' },
      ].filter(m => m.match).sort((a, b) => (a.match?.index || 0) - (b.match?.index || 0));

      if (matches.length === 0 || matches[0].match?.index === undefined) {
        parts.push(remaining);
        break;
      }

      const firstMatch = matches[0];
      const index = firstMatch.match!.index!;

      if (index > 0) {
        parts.push(remaining.slice(0, index));
      }

      if (firstMatch.type === 'bold') {
        parts.push(
          <strong key={keyIndex++} style={{ fontWeight: 600 }}>
            {firstMatch.match![1]}
          </strong>
        );
        remaining = remaining.slice(index + firstMatch.match![0].length);
      } else if (firstMatch.type === 'code') {
        parts.push(
          <code
            key={keyIndex++}
            className="px-1.5 py-0.5 rounded text-sm font-mono"
            style={{ background: 'var(--muted)', color: 'var(--foreground)' }}
          >
            {firstMatch.match![1]}
          </code>
        );
        remaining = remaining.slice(index + firstMatch.match![0].length);
      } else if (firstMatch.type === 'italic') {
        parts.push(
          <em key={keyIndex++}>{firstMatch.match![1]}</em>
        );
        remaining = remaining.slice(index + firstMatch.match![0].length);
      }
    }

    return parts;
  };

  return (
    <div className="min-h-full" style={{ background: 'var(--background)' }}>
      <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="px-3 py-1 text-xs font-bold rounded"
              style={{ background: 'var(--foreground)', color: 'var(--background)' }}
            >
              Module {article.module + 1}
            </div>
            <div className="flex items-center gap-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
              <Clock className="w-4 h-4" />
              <span>{article.readTime} min read</span>
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--foreground)' }}>
            {article.title}
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted-foreground)' }}>
            {article.description}
          </p>

          {/* AI Buttons */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={copyPageContent}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all hover:opacity-80"
              style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Page'}
            </button>
            <button
              onClick={() => openAI('claude')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all hover:opacity-80"
              style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <ExternalLink className="w-4 h-4" />
              Claude
            </button>
            <button
              onClick={() => openAI('gemini')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all hover:opacity-80"
              style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <ExternalLink className="w-4 h-4" />
              Gemini
            </button>
            <button
              onClick={() => openAI('chatgpt')}
              className="flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-all hover:opacity-80"
              style={{ background: 'var(--muted)', borderColor: 'var(--border)', color: 'var(--foreground)' }}
            >
              <ExternalLink className="w-4 h-4" />
              ChatGPT
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="prose-docs">
          {renderContent(article.content)}
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-12 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          {article.previousTopic ? (
            <Link
              href={`/docs/${article.previousTopic.module}/${article.previousTopic.slug}`}
              className="flex items-center gap-2 group transition-colors"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <div className="text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>Previous</div>
                <div className="font-semibold" style={{ color: 'var(--foreground)' }}>{article.previousTopic.title}</div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {article.nextTopic ? (
            <Link
              href={`/docs/${article.nextTopic.module}/${article.nextTopic.slug}`}
              className="flex items-center gap-2 group transition-colors ml-auto"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <div className="text-right">
                <div className="text-xs mb-1" style={{ color: 'var(--muted-foreground)' }}>Next</div>
                <div className="font-semibold" style={{ color: 'var(--foreground)' }}>{article.nextTopic.title}</div>
              </div>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

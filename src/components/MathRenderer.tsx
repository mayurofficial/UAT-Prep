'use client';

import React, { useMemo } from 'react';
import katex from 'katex';

interface MathRendererProps {
  content: string;
  className?: string;
  inline?: boolean;
}

interface MathSegment {
  type: 'text' | 'inline-math' | 'block-math';
  value: string;
}

/**
 * Parses markdown/text content into plain text and LaTeX/KaTeX math blocks.
 * Supports:
 * - $$math$$ or \[math\] for display / block formulas
 * - $math$ or \(math\) for inline formulas
 */
function parseMathSegments(text: string): MathSegment[] {
  if (!text) return [];

  const segments: MathSegment[] = [];
  const regex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$(?!\$)[\s\S]*?\$|\\\(.*?\\\))/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Push preceding text
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        value: text.slice(lastIndex, match.index),
      });
    }

    const matchedStr = match[0];
    if (matchedStr.startsWith('$$') && matchedStr.endsWith('$$')) {
      segments.push({
        type: 'block-math',
        value: matchedStr.slice(2, -2).trim(),
      });
    } else if (matchedStr.startsWith('\\[') && matchedStr.endsWith('\\]')) {
      segments.push({
        type: 'block-math',
        value: matchedStr.slice(2, -2).trim(),
      });
    } else if (matchedStr.startsWith('$') && matchedStr.endsWith('$')) {
      segments.push({
        type: 'inline-math',
        value: matchedStr.slice(1, -1).trim(),
      });
    } else if (matchedStr.startsWith('\\(') && matchedStr.endsWith('\\)')) {
      segments.push({
        type: 'inline-math',
        value: matchedStr.slice(2, -2).trim(),
      });
    }

    lastIndex = regex.lastIndex;
  }

  // Push remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: 'text',
      value: text.slice(lastIndex),
    });
  }

  return segments;
}

export const MathRenderer: React.FC<MathRendererProps> = ({
  content,
  className = '',
  inline = false,
}) => {
  const renderedElements = useMemo(() => {
    if (!content) return null;

    const segments = parseMathSegments(content);

    return segments.map((seg, idx) => {
      if (seg.type === 'text') {
        return <span key={idx}>{seg.value}</span>;
      }

      const isBlock = seg.type === 'block-math' && !inline;

      try {
        const html = katex.renderToString(seg.value, {
          displayMode: isBlock,
          throwOnError: false,
          output: 'htmlAndMathml',
        });

        if (isBlock) {
          return (
            <div
              key={idx}
              className="katex-block-wrapper"
              style={{
                margin: '0.6rem 0',
                overflowX: 'auto',
                padding: '0.25rem 0',
                textAlign: 'center',
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return (
          <span
            key={idx}
            className="katex-inline-wrapper"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      } catch {
        return (
          <code key={idx} style={{ padding: '0 4px', background: 'rgba(0,0,0,0.05)', borderRadius: '4px' }}>
            ${seg.value}$
          </code>
        );
      }
    });
  }, [content, inline]);

  if (!content) return null;

  return <span className={`math-content ${className}`}>{renderedElements}</span>;
};

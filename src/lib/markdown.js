import { marked } from 'marked';
import DOMPurify from 'dompurify';

// Configure marked
marked.setOptions({
  breaks: true,
  gfm: true,
  headerIds: true,
  mangle: false
});

export function parseMarkdown(markdown) {
  if (!markdown) return '';
  
  try {
    const html = marked.parse(markdown);
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'br', 'hr',
        'strong', 'em', 'u', 's', 'code', 'pre',
        'a', 'img',
        'ul', 'ol', 'li',
        'blockquote',
        'table', 'thead', 'tbody', 'tr', 'th', 'td'
      ],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'id']
    });
  } catch (error) {
    console.error('Error parsing markdown:', error);
    return '';
  }
}

export function extractFirstParagraph(markdown) {
  if (!markdown) return '';
  
  const paragraphs = markdown.split('\n\n');
  return paragraphs[0] || '';
}

export function stripMarkdown(markdown) {
  if (!markdown) return '';
  
  return markdown
    .replace(/[#*_~`\[\]()]/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\n+/g, ' ')
    .trim();
}

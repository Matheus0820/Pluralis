import DOMPurify from 'dompurify';

/**
 * Sanitiza conteúdos HTML ou texto rico antes da renderização na UI,
 * prevenindo vulnerabilidades de Cross-Site Scripting (XSS).
 */
export function sanitizeHtml(dirty: string): string {
  if (typeof window === 'undefined') {
    // No SSR seguro, retorna string tratada minimamente ou aguarda hidratação no cliente
    return dirty.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'b',
      'i',
      'em',
      'strong',
      'a',
      'p',
      'ul',
      'ol',
      'li',
      'br',
      'h1',
      'h2',
      'h3',
      'h4',
      'code',
      'pre',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
  });
}

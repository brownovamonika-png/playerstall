/**
 * Normalize a string for use as a URL slug (e.g. category or tag).
 * Lowercase, trim, replace spaces/slashes with hyphen, collapse multiple hyphens.
 */
export function slugify(value: string): string {
  if (typeof value !== 'string') return '';
  return value
    .trim()
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[\s/]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || '';
}

/**
 * Scheduled publishing for the blog.
 *
 * Posts are written and committed ahead of time with a future `datePublished`.
 * This predicate keeps them out of every listing — blog index, post pages,
 * categories, tags, archives and the sitemap — until their date arrives.
 * A daily rebuild (.github/workflows/daily-blog.yml) brings each one live.
 *
 * Use this everywhere instead of calling getCollection('blog') unfiltered,
 * otherwise unpublished posts leak into the sitemap and get announced to
 * search engines before they exist.
 */
export function isPublished({ data }) {
	if (data.draft) return false;
	if (!data.datePublished) return false;
	const today = new Date();
	today.setHours(23, 59, 59, 999);
	return new Date(data.datePublished + 'T12:00:00') <= today;
}

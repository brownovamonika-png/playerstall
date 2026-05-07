/**
 * Canonical locker lineup for structured data + shared UI data (sport pages).
 * Prices align with `/shop/` grid; AggregateOffer ranges match PDP width pricing.
 */
import { MODEL_X_HERO_IMAGE } from './model-x-assets';

export const SITE_ORIGIN = 'https://playerstall.com' as const;

export const PRICE_VALID_UNTIL = '2026-12-31';

export function toAbsoluteImageUrl(src: string): string {
	if (src.startsWith('http://') || src.startsWith('https://')) {
		return src;
	}
	const path = src.startsWith('/') ? src : `/${src}`;
	return `${SITE_ORIGIN}${path}`;
}

/** Canonical PDP URL with trailing slash (matches existing product JSON-LD). */
export function toAbsoluteProductUrl(slugPath: string): string {
	const trimmed = slugPath.replace(/^\//, '').replace(/\/$/, '');
	return `${SITE_ORIGIN}/${trimmed}/`;
}

export interface LockerCatalogEntry {
	readonly id: string;
	readonly listName: string;
	readonly schemaName: string;
	readonly slugPath: string;
	readonly description: string;
	/** Sort high → low (same as shop/sport prominence). */
	readonly priceSort: number;
	/** Single “from” price on hub grids / ItemList Offer. */
	readonly listPriceUsd: number;
	readonly aggregateLowUsd: number;
	readonly aggregateHighUsd: number;
	readonly uiInfo: string;
	readonly dimensions: string;
	readonly dimensionsNote: string;
	/** Angle images order used on sport page. */
	readonly images: readonly string[];
	/** Hero/thumbnail path for LOCKERS `.image` (may differ from images[0]). */
	readonly listingImage: string;
}

const ENTRIES_RAW: LockerCatalogEntry[] = [
	{
		id: 'model-x',
		listName: 'Model X',
		schemaName: 'Model X Wood Locker',
		slugPath: '/product-legendary-locker',
		description:
			'Model X wood locker: premium tier, curved design, maximum customization. 76" H x 19" or 24" D, widths 18"–32". Custom-built in three months. 5 year warranty.',
		priceSort: 649,
		listPriceUsd: 649,
		aggregateLowUsd: 649,
		aggregateHighUsd: 749,
		uiInfo:
			'Top-tier locker. Curved design, maximum durability and customization. Custom-built in three months with full color options.',
		dimensions: '24" W × 76" H × 24" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: MODEL_X_HERO_IMAGE,
		images: [
			'/images/model-x-dark-grey-front-base-cushion.png',
			'/images/model-x-dark-grey-right-side.png',
			'/images/model-x-dark-grey-left-side.png',
			'/images/model-x-dark-grey-side-view.png',
		],
	},
	{
		id: 'model-z',
		listName: 'Model Z',
		schemaName: 'Model Z Wood Locker',
		slugPath: '/product-elite-locker',
		description:
			'Model Z wood locker: curved design, 76" H x 19" or 24" D, widths 18"–32". Custom-built in three months. 5 year warranty. MPW-6C plywood core with premium melamine surface.',
		priceSort: 649,
		listPriceUsd: 649,
		aggregateLowUsd: 649,
		aggregateHighUsd: 749,
		uiInfo:
			'Top-tier locker. Curved design, premium materials. Custom-built to your specifications.',
		dimensions: '24" W × 76" H × 24" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/model-z-blue-left-side.png',
		images: [
			'/images/model-z-blue-front-base.png',
			'/images/model-z-blue-right-side.png',
			'/images/model-z-blue-left-side.png',
			'/images/model-z-blue-side.png',
		],
	},
	{
		id: 'model-l',
		listName: 'Model L',
		schemaName: 'Model L Wood Locker',
		slugPath: '/product-model-l',
		description:
			'Model L wood locker: premium melamine, 76" H x 19" or 24" D, widths 18"–32". Custom-built in 8–12 weeks. 5 year warranty.',
		priceSort: 649,
		listPriceUsd: 649,
		aggregateLowUsd: 599,
		aggregateHighUsd: 649,
		uiInfo:
			'Premium melamine, 19" or 24" depth. Reliable workhorse for team locker rooms. Custom-built to your specifications.',
		dimensions: '24" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/model-l-dark-oak-front-base.png',
		images: [
			'/images/model-l-dark-oak-front-base.png',
			'/images/model-l-dark-oak-right-side.png',
			'/images/model-l-oak-left-side.png',
			'https://playerstall.b-cdn.net/images/L%20dark%20oak%20side.png',
		],
	},
	{
		id: 'model-s',
		listName: 'Model S',
		schemaName: 'Model S Wood Locker',
		slugPath: '/product-model-s',
		description:
			'Model S wood locker: premium melamine, 76" H x 19" or 24" D, widths 18"–32". Custom-built in 8–12 weeks. 5 year warranty.',
		priceSort: 649,
		listPriceUsd: 649,
		aggregateLowUsd: 649,
		aggregateHighUsd: 749,
		uiInfo:
			'Premium melamine, stadium-grade. Heavy-duty build for high-traffic facilities. Custom-built to your specifications.',
		dimensions: '24" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/model-s-black-front-base.png',
		images: [
			'/images/model-s-black-front-base.png',
			'/images/model-s-black-right-side.png',
			'/images/model-s-black-left-side.png',
			'https://playerstall.b-cdn.net/images/S%20black%20side.png',
		],
	},
	{
		id: 'pro',
		listName: 'Pro',
		schemaName: 'Pro Locker',
		slugPath: '/product-pro-locker',
		description:
			'Pro Locker wood locker: 19" D, Pre-Finished Birch Plywood, 76" H, widths 18"–32". Essential line. Custom-built in 8–12 weeks. 5 year warranty.',
		priceSort: 599,
		listPriceUsd: 599,
		aggregateLowUsd: 599,
		aggregateHighUsd: 649,
		uiInfo:
			'Essential line. 19" depth only, Pre-Finished Birch Plywood. Ideal for schools and rec teams.',
		dimensions: '24" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/pro-locker-oak-front-base.png',
		images: [
			'/images/pro-locker-oak-front-base.png',
			'/images/pro-locker-oak-right-side.png',
			'/images/essential-locker-oak-left-side.png',
			'/images/pro-locker-oak-side-view.png',
		],
	},
	{
		id: 'stadium',
		listName: 'Stadium',
		schemaName: 'Stadium Locker',
		slugPath: '/product-stadium-locker',
		description:
			'Stadium Locker wood locker: 19" D, Pre-Finished Birch Plywood, 76" H, widths 18"–32". Essential line. Custom-built in 8–12 weeks. 5 year warranty.',
		priceSort: 599,
		listPriceUsd: 599,
		aggregateLowUsd: 599,
		aggregateHighUsd: 649,
		uiInfo:
			'Essential line. 19" depth only, Pre-Finished Birch Plywood. Stadium-style layout.',
		dimensions: '18" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/stadium-locker-oak-front-base-cushion.png',
		images: [
			'/images/stadium-locker-oak-front-base-cushion.png',
			'/images/stadium-locker-oak-right-side.png',
			'/images/stadium-locker-oak-left-side.png',
			'/images/stadium-locker-oak-side-view.png',
		],
	},
	{
		id: 'varsity',
		listName: 'Varsity',
		schemaName: 'Varsity Wood Locker',
		slugPath: '/product-varsity-locker',
		description:
			'Varsity wood locker: 3/4" solid wood premium finish, 76" H x 19" D, widths 18"–32". Full color options. Custom-built in three months. 5 year warranty.',
		priceSort: 449,
		listPriceUsd: 449,
		aggregateLowUsd: 449,
		aggregateHighUsd: 529,
		uiInfo:
			'Essential line. 3/4" solid wood premium finish. Great for varsity and competitive programs.',
		dimensions: '24" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"; optional 4" base',
		listingImage: '/images/varsity-locker.png',
		images: [
			'/images/varsity-locker.png',
			'/images/varsity-locker.png',
			'/images/varsity-locker.png',
			'/images/varsity-locker.png',
		],
	},
	{
		id: 'semi-pro',
		listName: 'Semi Pro',
		schemaName: 'Semi Pro Wood Locker',
		slugPath: '/product-semi-pro-locker',
		description:
			'Semi Pro wood locker: 3/4" solid wood, 76" H x 19" D, widths 18"–32". Full color options. Custom-built in three months. 5 year warranty.',
		priceSort: 349,
		listPriceUsd: 349,
		aggregateLowUsd: 349,
		aggregateHighUsd: 429,
		uiInfo:
			'Essential line. 3/4" solid wood, 19" depth only. Durable and ideal for schools and rec teams.',
		dimensions: '24" W × 76" H × 19" D',
		dimensionsNote: 'Widths 18"–32"',
		listingImage: 'https://playerstall.b-cdn.net/images/semi-pro-locker-new.png',
		images: [
			'https://playerstall.b-cdn.net/images/semi-pro-locker-new.png',
			'https://playerstall.b-cdn.net/images/semi-pro-locker-new.png',
			'https://playerstall.b-cdn.net/images/semi-pro-locker-new.png',
			'https://playerstall.b-cdn.net/images/semi-pro-locker-new.png',
		],
	},
];

/** Eight models, premium first (matches sport hub locker order). */
export function getLockersCatalogSorted(): LockerCatalogEntry[] {
	return [...ENTRIES_RAW].sort((a, b) => b.priceSort - a.priceSort || a.listName.localeCompare(b.listName));
}

export const LOCKERS_CATALOG_SORTED: LockerCatalogEntry[] = getLockersCatalogSorted();

export function getLockerCatalogBySlugPath(slugPath: string): LockerCatalogEntry | undefined {
	const normalized = slugPath.startsWith('/') ? slugPath : `/${slugPath}`;
	return ENTRIES_RAW.find((e) => e.slugPath === normalized);
}

/** Legacy shape for `[sport].astro` map loop (visual unchanged). */
export type SportLockerRow = {
	name: string;
	priceSort: number;
	image: string;
	images: string[];
	price: string;
	info: string;
	dimensions: string;
	dimensionsNote: string;
	href: string;
};

export function lockersForSportUi(): SportLockerRow[] {
	return LOCKERS_CATALOG_SORTED.map((e) => ({
		name: e.listName,
		priceSort: e.priceSort,
		image: e.listingImage,
		images: [...e.images],
		price: `$${e.listPriceUsd}`,
		info: e.uiInfo,
		dimensions: e.dimensions,
		dimensionsNote: e.dimensionsNote,
		href: e.slugPath,
	}));
}

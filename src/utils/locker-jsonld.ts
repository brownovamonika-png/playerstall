import {
	PRICE_VALID_UNTIL,
	type LockerCatalogEntry,
	toAbsoluteImageUrl,
	toAbsoluteProductUrl,
} from '../data/lockers-catalog';

type Entry = LockerCatalogEntry;

function brandNode() {
	return { '@type': 'Brand' as const, name: 'PlayerStall' };
}

function sellerNode() {
	return {
		'@type': 'Organization' as const,
		name: 'PlayerStall',
	};
}

function listOffer(entry: Entry) {
	return {
		'@type': 'Offer' as const,
		url: toAbsoluteProductUrl(entry.slugPath),
		priceCurrency: 'USD',
		price: entry.listPriceUsd,
		priceValidUntil: PRICE_VALID_UNTIL,
		availability: 'https://schema.org/InStock',
		seller: sellerNode(),
	};
}

/** Product node nested under ItemList → ListItem.item */
export function lockerToListProduct(entry: Entry) {
	const images = [...new Set(entry.images.map(toAbsoluteImageUrl))];
	return {
		'@type': 'Product' as const,
		name: entry.schemaName,
		description: entry.description,
		brand: brandNode(),
		image: images.length > 1 ? images : images[0],
		offers: listOffer(entry),
	};
}

/**
 * ItemList of all lockers for a hub page (sport, shop, products, /sports/).
 * @param listPageUrl - Canonical URL of the page hosting the list (with or without trailing slash).
 */
export function buildLockersItemList(
	entries: LockerCatalogEntry[],
	listPageUrl: string,
): Record<string, unknown> {
	const normalized = listPageUrl.replace(/\/?$/, '/');
	return {
		'@context': 'https://schema.org',
		'@type': 'ItemList',
		url: normalized,
		numberOfItems: entries.length,
		itemListElement: entries.map((entry, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: lockerToListProduct(entry),
		})),
	};
}

/** AggregateOffer matching PDP width/depth pricing spans. */
export function buildLockerAggregateOffer(entry: Entry) {
	return {
		'@type': 'AggregateOffer' as const,
		lowPrice: entry.aggregateLowUsd,
		highPrice: entry.aggregateHighUsd,
		priceCurrency: 'USD',
		availability: 'https://schema.org/InStock',
		priceValidUntil: PRICE_VALID_UNTIL,
		url: toAbsoluteProductUrl(entry.slugPath),
	};
}

export function buildLockerProductGraphNode(entry: Entry) {
	const images = [...new Set(entry.images.map(toAbsoluteImageUrl))];
	return {
		'@type': 'Product' as const,
		name: entry.schemaName,
		description: entry.description,
		url: toAbsoluteProductUrl(entry.slugPath),
		image: images.length > 1 ? images : images[0],
		brand: brandNode(),
		offers: buildLockerAggregateOffer(entry),
	};
}

export { PRICE_VALID_UNTIL };

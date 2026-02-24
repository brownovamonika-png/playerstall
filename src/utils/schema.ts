// Reusable Schema.org structured data components for SEO
// Import and use these in your Astro pages

interface Product {
	name: string;
	description: string;
	price: string;
	imageUrl: string;
	productUrl: string;
	sku?: string;
	ratingValue?: string;
	reviewCount?: string;
}

interface Article {
	title: string;
	description: string;
	datePublished: string;
	dateModified?: string;
	author?: string;
	imageUrl?: string;
	articleUrl: string;
	wordCount?: number;
	category?: string;
}

interface FAQItem {
	question: string;
	answer: string;
}

/**
 * Generate Product Schema for e-commerce items
 */
export function generateProductSchema(product: Product) {
	return {
		"@context": "https://schema.org",
		"@type": "Product",
		"name": product.name,
		"description": product.description,
		"image": product.imageUrl,
		"brand": {
			"@type": "Brand",
			"name": "PlayerStall"
		},
		"offers": {
			"@type": "Offer",
			"url": product.productUrl,
			"priceCurrency": "USD",
			"price": product.price,
			"priceValidUntil": "2026-12-31",
			"availability": "https://schema.org/InStock",
			"seller": {
				"@type": "Organization",
				"name": "PlayerStall"
			}
		},
		...(product.ratingValue && product.reviewCount && {
			"aggregateRating": {
				"@type": "AggregateRating",
				"ratingValue": product.ratingValue,
				"reviewCount": product.reviewCount
			}
		}),
		...(product.sku && { "sku": product.sku })
	};
}

/**
 * Generate Article Schema for blog posts
 */
export function generateArticleSchema(article: Article) {
	return {
		"@context": "https://schema.org",
		"@type": "Article",
		"headline": article.title,
		"description": article.description,
		"datePublished": article.datePublished,
		"dateModified": article.dateModified || article.datePublished,
		"author": {
			"@type": "Person",
			"name": article.author || "PlayerStall Editorial Team"
		},
		"publisher": {
			"@type": "Organization",
			"name": "PlayerStall",
			"logo": {
				"@type": "ImageObject",
				"url": "https://playerstall.com/images/logoblack2.png"
			}
		},
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": article.articleUrl
		},
		...(article.imageUrl && {
			"image": {
				"@type": "ImageObject",
				"url": article.imageUrl
			}
		}),
		...(article.wordCount && { "wordCount": article.wordCount })
	};
}

/**
 * Generate FAQPage Schema for pages with FAQs
 */
export function generateFAQSchema(faqs: FAQItem[]) {
	return {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		"mainEntity": faqs.map(faq => ({
			"@type": "Question",
			"name": faq.question,
			"acceptedAnswer": {
				"@type": "Answer",
				"text": faq.answer
			}
		}))
	};
}

/**
 * Generate BreadcrumbList Schema for navigation
 */
export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		"itemListElement": items.map((item, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"name": item.name,
			"item": item.url
		}))
	};
}

/**
 * Generate LocalBusiness Schema for homepage/contact pages
 */
export function generateLocalBusinessSchema() {
	return {
		"@context": "https://schema.org",
		"@type": "LocalBusiness",
		"name": "PlayerStall",
		"alternateName": "CustomSportsLockers.com",
		"description": "Premium wood sports lockers manufacturer specializing in custom athletic lockers for collegiate and professional teams. 30+ years experience with lifetime guarantee.",
		"image": "https://playerstall.com/images/logoblack2.png",
		"logo": "https://playerstall.com/images/logoblack2.png",
		"url": "https://playerstall.com",
		"telephone": "+11231245678901",
		"email": "info@customsportslockers.com",
		"priceRange": "$$",
		"address": {
			"@type": "PostalAddress",
			"streetAddress": "7300-7398 Colonial Rd",
			"addressLocality": "Brooklyn",
			"addressRegion": "NY",
			"postalCode": "11209",
			"addressCountry": "US"
		},
		"geo": {
			"@type": "GeoCoordinates",
			"latitude": "40.6184",
			"longitude": "-74.0302"
		},
		"openingHoursSpecification": [
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
				"opens": "09:00",
				"closes": "17:00"
			},
			{
				"@type": "OpeningHoursSpecification",
				"dayOfWeek": "Saturday",
				"opens": "10:00",
				"closes": "14:00"
			}
		],
		"serviceArea": {
			"@type": "Country",
			"name": "United States"
		},
		"areaServed": "US",
		"sameAs": [
			"https://www.facebook.com/PlayerStall-1715059388770006/",
			"https://vimeo.com/playerstall",
			"https://twitter.com/PSLockers",
			"https://www.pinterest.com/playerstallspor/",
			"https://www.linkedin.com/company/playerstall"
		]
	};
}

/**
 * Helper function to inject schema into page head
 * Usage in Astro:
 * 
 * import { generateProductSchema } from '../utils/schema';
 * const schema = generateProductSchema({ ... });
 * 
 * <script type="application/ld+json" set:html={JSON.stringify(schema)} slot="head" />
 */

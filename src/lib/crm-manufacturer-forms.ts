/** 24″ CAD manufacturer form options (L / X / S / Z) used in CRM locker type UI. */

export const MANUFACTURER_FORM_MODEL_VALUES = ['Model L', 'Model X', 'Model S', 'Model Z'] as const;
export type ManufacturerFormModel = (typeof MANUFACTURER_FORM_MODEL_VALUES)[number];

export type ManufacturerFormOption = {
	lockerType: ManufacturerFormModel;
	/** Primary line under the image */
	label: string;
	/** Secondary line (type + width) */
	subtitle: string;
	imageSrc: string;
};

export const MANUFACTURER_FORM_OPTIONS: ManufacturerFormOption[] = [
	{
		lockerType: 'Model L',
		label: 'Model L',
		subtitle: 'Type 1 · 24″',
		imageSrc: '/images/crm-manufacturer-forms/model-l-type-1-24-inch.png',
	},
	{
		lockerType: 'Model X',
		label: 'Model X',
		subtitle: 'Type 2 · 24″',
		imageSrc: '/images/crm-manufacturer-forms/model-x-type-2-24-inch.png',
	},
	{
		lockerType: 'Model S',
		label: 'Model S',
		subtitle: 'Type 3 · 24″',
		imageSrc: '/images/crm-manufacturer-forms/model-s-type-3-24-inch.png',
	},
	{
		lockerType: 'Model Z',
		label: 'Model Z',
		subtitle: 'Type 4 · 24″',
		imageSrc: '/images/crm-manufacturer-forms/model-z-type-4-24-inch.png',
	},
];

const CAD_MODEL_SET = new Set<string>(MANUFACTURER_FORM_MODEL_VALUES);

export function isManufacturerFormLockerType(value: string | null | undefined): value is ManufacturerFormModel {
	return CAD_MODEL_SET.has(String(value ?? '').trim());
}

/** Reference gallery on /admin/manufacturer-forms (24″ vs 19″ rows). */
export type ManufacturerFormGalleryItem = {
	/** Unique tab id / hash, e.g. model-l-24, model-l-19 */
	tabSlug: string;
	label: string;
	subtitle: string;
	imageSrc: string;
};

const GALLERY_BASE = [
	{
		tabBase: 'model-l',
		label: 'Model L',
		typeLine: 'Type 1',
		file24: '/images/crm-manufacturer-forms/model-l-type-1-24-inch.png',
		file19: '/images/crm-manufacturer-forms/model-l-type-1-19-inch.png',
	},
	{
		tabBase: 'model-x',
		label: 'Model X',
		typeLine: 'Type 2',
		file24: '/images/crm-manufacturer-forms/model-x-type-2-24-inch.png',
		file19: '/images/crm-manufacturer-forms/model-x-type-2-19-inch.png',
	},
	{
		tabBase: 'model-s',
		label: 'Model S',
		typeLine: 'Type 3',
		file24: '/images/crm-manufacturer-forms/model-s-type-3-24-inch.png',
		file19: '/images/crm-manufacturer-forms/model-s-type-3-19-inch.png',
	},
	{
		tabBase: 'model-z',
		label: 'Model Z',
		typeLine: 'Type 4',
		file24: '/images/crm-manufacturer-forms/model-z-type-4-24-inch.png',
		file19: '/images/crm-manufacturer-forms/model-z-type-4-19-inch.png',
	},
] as const;

function galleryItemsForWidth(width: '24' | '19'): ManufacturerFormGalleryItem[] {
	const inch = width === '24' ? '24″ wide' : '19″ depth';
	return GALLERY_BASE.map((row) => ({
		tabSlug: `${row.tabBase}-${width}`,
		label: row.label,
		subtitle: `${row.typeLine} · ${inch}`,
		imageSrc: width === '24' ? row.file24 : row.file19,
	}));
}

export const MANUFACTURER_FORM_GALLERY_24: ManufacturerFormGalleryItem[] = galleryItemsForWidth('24');
export const MANUFACTURER_FORM_GALLERY_19: ManufacturerFormGalleryItem[] = galleryItemsForWidth('19');

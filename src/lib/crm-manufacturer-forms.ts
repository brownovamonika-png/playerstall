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

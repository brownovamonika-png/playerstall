/**
 * Shared accessory list for shop grid and product-page slider (modal mode).
 * Each item has modal data (data-acc-*) so opening a card shows the same PDP-style modal with sliding images.
 */
const LOCK_BOX_IMG = 'https://playerstall.b-cdn.net/images/lock-box.png';
/** Original digital lock box product shot (4th gallery slide, cart thumbnail) */
const LOCK_BOX_DIGITAL_IMG = '/images/lock-box.png';
const LOCK_BOX_BLUE = 'https://playerstall.b-cdn.net/images/lock%20box%20blue.jpg';
const LOCK_BOX_LIGHT_GREY = 'https://playerstall.b-cdn.net/images/lock%20box%20light%20grey.jpg';
const LOCK_BOX_OAK = '/images/lock-box-oak.png';

/** Black cushion gallery (CDN); front = card + cart thumbnail */
const CUSHION_FRONT = 'https://playerstall.b-cdn.net/images/black%20cushion%20front%20view.jpg';
const CUSHION_SIDE = 'https://playerstall.b-cdn.net/images/black%20cushion%20side%20view.jpg';
const CUSHION_SEAM = 'https://playerstall.b-cdn.net/images/black%20cushion%20seam%20view.jpg';

/** Cart / checkout thumbnail for cushion line items */
export const CUSHION_CART_IMAGE = CUSHION_FRONT;

export interface ShopAccessoryModalItem {
	accImage: string;
	accImage2?: string;
	accImage3?: string;
	accImage4?: string;
	accTitle: string;
	accPrice: string;
	accDesc: string;
	/** Card thumbnail (same as shop: lock box for all) */
	image: string;
	alt: string;
	title: string;
}

export const SHOP_ACCESSORIES_MODAL: ShopAccessoryModalItem[] = [
	{
		accImage: '/images/premium/front-panel-metal-vented.jpg',
		accImage2: '/images/premium/front-panel-3-slot-vented.jpg',
		accImage3: '/images/premium/front-panel-pull-out-drawer.jpg',
		accImage4: '/images/premium/front-panel-solid.jpg',
		accTitle: 'Front Panels',
		accPrice: 'Solid front: included / 3-slot vented: + $40.00 / Metal vented: + $60.00 / Pull-out drawer: + $50.00',
		accDesc: 'Choose the bench front for your Premium lockers (Model S, L, X and Z): solid front (standard), 3-slot vented front, black metal vented front, or a pull-out drawer with a metal mesh front. Venting keeps gear dry and reduces odor.',
		image: '/images/premium/front-panel-metal-vented.jpg',
		alt: 'Black metal vented front panel on a walnut locker bench',
		title: 'Front Panels',
	},
	{
		accImage: CUSHION_FRONT,
		accImage2: CUSHION_SIDE,
		accImage3: CUSHION_SEAM,
		accTitle: 'Cushions',
		accPrice: '$75.00 (top or bottom) / $150.00 (both) / $125.00 (Model B set or corner unit)',
		accDesc: 'High-density foam cushions upholstered for comfort and durability – available on the top, bottom, or both.',
		image: CUSHION_FRONT,
		alt: 'Black upholstered locker cushion, front view',
		title: 'Cushions',
	},
	{
		accImage: '/images/hook-black.png',
		accImage2: '/images/hook-silver.png',
		accImage3: '/images/hook-spec-sheet.png',
		accTitle: 'Hooks',
		accPrice: '$15.00',
		accDesc: 'Additional interior hooks for bags, helmets, and everyday gear, matched to your locker layout. Available in black or silver.',
		image: '/images/hook-silver.png',
		alt: 'Silver hook for lockers',
		title: 'Hooks',
	},
	{
		accImage: '/images/name-plate-black.png',
		accImage2: '/images/name-plate-silver.png',
		accTitle: 'Name Plate',
		accPrice: '$10.00',
		accDesc: 'Clean, simple name plate for player identification – ideal for teams that want a classic, organized look. Available in black or silver.',
		image: '/images/name-plate-black.png',
		alt: 'Black name plate for lockers',
		title: 'Name Plate',
	},
	{
		accImage: '/images/skate-hook-black.png',
		accImage2: '/images/skate-hook-silver.png',
		accTitle: 'Skate Hooks',
		accPrice: '+ $25.00',
		accDesc: 'Additional wall-mounted hooks positioned for skates or gear, perfect for hockey or figure skating locker rooms. Available in black or silver.',
		image: '/images/skate-hook-silver.png',
		alt: 'Silver skate hook for hockey lockers',
		title: 'Skate Hooks',
	},
	{
		accImage: '/images/premium/custom-logo-spartan.png',
		accImage2: '/images/premium/custom-logo-walnut-locker.jpg',
		accImage3: '/images/premium/custom-logo-reivers.png',
		accImage4: '/images/premium/custom-logo-reivers-locker.jpg',
		accTitle: 'Custom Logo',
		accPrice: '+ $75.00',
		accDesc: 'Team or program branding applied to the locker face – reinforce your identity every time players walk in. Custom orders only.',
		image: '/images/premium/custom-logo-spartan.png',
		alt: 'Custom team logo example',
		title: 'Custom Logo',
	},
	{
		accImage: LOCK_BOX_BLUE,
		accImage2: LOCK_BOX_LIGHT_GREY,
		accImage3: LOCK_BOX_OAK,
		accImage4: '/images/lock-box-spec-sheet.png',
		accTitle: 'Lock Box with Digital Key Lock',
		accPrice: '$80.00',
		accDesc: 'Lock box with slow-closing hinge that closes gently and securely. Fitted with an electronic touchable keypad and RFID card lock: password or card entry, programmable master and user codes, battery-powered with emergency external power.',
		image: LOCK_BOX_BLUE,
		alt: 'Blue lock box with digital keypad and RFID lock',
		title: 'Lock Box with Digital Key Lock',
	},
];

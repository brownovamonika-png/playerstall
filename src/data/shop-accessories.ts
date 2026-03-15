/**
 * Shared accessory list for shop grid and product-page slider (modal mode).
 * Each item has modal data (data-acc-*) so opening a card shows the same PDP-style modal with sliding images.
 */
const LOCK_BOX_IMG = '/images/lock-box.png';
const CUSHION_IMG = 'https://playerstall.b-cdn.net/images/cushion-logo.png';

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
		accImage: '/images/elite-locker-vent-panel.png',
		accImage2: '/images/stadium-locker-vent-panel.png',
		accImage3: '/images/model-x-website-images/model-x-locker-vent-panel.png',
		accTitle: 'Vented Panel',
		accPrice: '+ $40.00',
		accDesc: 'Vented front panel for increased airflow – keeps gear dry and reduces odor. Available on Elite, Stadium, and Model X lockers.',
		image: '/images/elite-locker-vent-panel.png',
		alt: 'Vented front panel for sports lockers',
		title: 'Vented Panel',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: CUSHION_IMG,
		accTitle: 'Cushions',
		accPrice: '$75.00 (top or bottom) / $150.00 (both)',
		accDesc: 'High-density foam cushions upholstered for comfort and durability – available on the top, bottom, or both.',
		image: LOCK_BOX_IMG,
		alt: 'Locker cushion with team logo',
		title: 'Cushions',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: CUSHION_IMG,
		accTitle: 'Coat Rod',
		accPrice: '$20.00',
		accDesc: 'Heavy-duty coat rod for jerseys, jackets, and gear – sized to match each locker style.',
		image: LOCK_BOX_IMG,
		alt: 'Coat rod for lockers',
		title: 'Coat Rod',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: CUSHION_IMG,
		accTitle: 'Hooks',
		accPrice: '$15.00',
		accDesc: 'Additional interior hooks for bags, helmets, and everyday gear, matched to your locker layout.',
		image: LOCK_BOX_IMG,
		alt: 'Interior locker hook',
		title: 'Hooks',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: CUSHION_IMG,
		accTitle: 'Name Plate',
		accPrice: '$10.00',
		accDesc: 'Clean, simple name plate for player identification – ideal for teams that want a classic, organized look.',
		image: LOCK_BOX_IMG,
		alt: 'Locker name plate',
		title: 'Name Plate',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: CUSHION_IMG,
		accTitle: 'Skate Hooks',
		accPrice: '$25.00',
		accDesc: 'Additional wall-mounted hooks positioned for skates or gear, perfect for hockey or figure skating locker rooms.',
		image: LOCK_BOX_IMG,
		alt: 'Skate hook for hockey lockers',
		title: 'Skate Hooks',
	},
	{
		accImage: LOCK_BOX_IMG,
		accTitle: 'Custom Logo',
		accPrice: '+ $75.00',
		accDesc: 'Team or program branding applied to the locker face – reinforce your identity every time players walk in.',
		image: LOCK_BOX_IMG,
		alt: 'Custom team logo on wood',
		title: 'Custom Logo',
	},
	{
		accImage: LOCK_BOX_IMG,
		accTitle: 'Stick Rack',
		accPrice: 'Starting at $299',
		accDesc: 'Dedicated stick storage that keeps sticks organized, off the floor, and easy to grab on the way to the ice.',
		image: LOCK_BOX_IMG,
		alt: 'Stick rack for locker rooms',
		title: 'Stick Rack',
	},
	{
		accImage: LOCK_BOX_IMG,
		accImage2: LOCK_BOX_IMG,
		accImage3: LOCK_BOX_IMG,
		accImage4: '/images/lock-box-spec-sheet.png',
		accTitle: 'Lock Box with Digital Key Lock',
		accPrice: '$80.00',
		accDesc: 'Lock box with slow-closing hinge that closes gently and securely. Fitted with an electronic touchable keypad and RFID card lock: password or card entry, programmable master and user codes, battery-powered with emergency external power.',
		image: LOCK_BOX_IMG,
		alt: 'Lock box with digital keypad and RFID lock',
		title: 'Lock Box with Digital Key Lock',
	},
];

export interface ProgrammaticState {
  slug: string;
  name: string;
  region: string;
}

export interface ProgrammaticSport {
  slug: string;
  name: string;
  primaryNeed: string;
  gearFocus: string;
  blogUrl: string;
}

export const programmaticStates: ProgrammaticState[] = [
  { slug: 'texas', name: 'Texas', region: 'South' },
  { slug: 'california', name: 'California', region: 'West' },
  { slug: 'florida', name: 'Florida', region: 'Southeast' },
  { slug: 'ohio', name: 'Ohio', region: 'Midwest' },
  { slug: 'pennsylvania', name: 'Pennsylvania', region: 'Northeast' },
  { slug: 'georgia', name: 'Georgia', region: 'Southeast' },
  { slug: 'north-carolina', name: 'North Carolina', region: 'Southeast' },
  { slug: 'new-york', name: 'New York', region: 'Northeast' },
  { slug: 'illinois', name: 'Illinois', region: 'Midwest' },
  { slug: 'michigan', name: 'Michigan', region: 'Midwest' },
];

export const programmaticSports: ProgrammaticSport[] = [
  {
    slug: 'football',
    name: 'Football',
    primaryNeed: 'high-capacity lockers with ventilation and reinforced load support',
    gearFocus: 'helmets, shoulder pads, cleats, and game-week rotation gear',
    blogUrl: '/blog/football-lockers-complete-guide-to-custom-athletic-storage-solutions',
  },
  {
    slug: 'basketball',
    name: 'Basketball',
    primaryNeed: 'clean, organized player spaces with premium presentation',
    gearFocus: 'uniforms, shoes, recovery tools, and personal storage',
    blogUrl: '/blog/basketball-lockers-complete-guide-to-custom-athletic-storage-solutions',
  },
  {
    slug: 'hockey',
    name: 'Hockey',
    primaryNeed: 'extra-durable lockers with drying airflow and stick-ready organization',
    gearFocus: 'pads, skates, helmets, and wet-equipment drying workflows',
    blogUrl: '/blog/hockey-lockers-complete-guide-to-custom-athletic-storage-solutions',
  },
  {
    slug: 'baseball',
    name: 'Baseball',
    primaryNeed: 'locker layouts that balance gear storage and fast daily access',
    gearFocus: 'bats, gloves, cleats, uniforms, and rotation equipment',
    blogUrl: '/blog/complete-guide-custom-sports-lockers',
  },
  {
    slug: 'lacrosse',
    name: 'Lacrosse',
    primaryNeed: 'modular storage that handles mixed equipment and seasonal transitions',
    gearFocus: 'sticks, pads, helmets, footwear, and shared team gear',
    blogUrl: '/blog/sport-specific-locker-design',
  },
];

/** Sports used for Wood vs Metal comparison pages (includes Soccer). */
export const woodVsMetalSports: { slug: string; name: string }[] = [
  { slug: 'football', name: 'Football' },
  { slug: 'hockey', name: 'Hockey' },
  { slug: 'basketball', name: 'Basketball' },
  { slug: 'baseball', name: 'Baseball' },
  { slug: 'soccer', name: 'Soccer' },
  { slug: 'lacrosse', name: 'Lacrosse' },
];

/** Level/market pages: collegiate, high school, professional, college × sport. */
export const levelMarketPages: { levelSlug: string; levelName: string; sportSlug: string; sportName: string }[] = [
  { levelSlug: 'collegiate', levelName: 'Collegiate', sportSlug: 'football', sportName: 'Football' },
  { levelSlug: 'high-school', levelName: 'High School', sportSlug: 'football', sportName: 'Football' },
  { levelSlug: 'professional', levelName: 'Professional', sportSlug: 'hockey', sportName: 'Hockey' },
  { levelSlug: 'college', levelName: 'College', sportSlug: 'basketball', sportName: 'Basketball' },
];

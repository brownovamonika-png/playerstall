const programmaticStates = [
  { slug: "texas", name: "Texas", region: "South" },
  { slug: "california", name: "California", region: "West" },
  { slug: "florida", name: "Florida", region: "Southeast" },
  { slug: "ohio", name: "Ohio", region: "Midwest" },
  { slug: "pennsylvania", name: "Pennsylvania", region: "Northeast" },
  { slug: "georgia", name: "Georgia", region: "Southeast" },
  { slug: "north-carolina", name: "North Carolina", region: "Southeast" },
  { slug: "new-york", name: "New York", region: "Northeast" },
  { slug: "illinois", name: "Illinois", region: "Midwest" },
  { slug: "michigan", name: "Michigan", region: "Midwest" }
];
const programmaticSports = [
  {
    slug: "football",
    name: "Football",
    primaryNeed: "high-capacity lockers with ventilation and reinforced load support",
    gearFocus: "helmets, shoulder pads, cleats, and game-week rotation gear",
    blogUrl: "/blog/football-lockers-complete-guide-to-custom-athletic-storage-solutions"
  },
  {
    slug: "basketball",
    name: "Basketball",
    primaryNeed: "clean, organized player spaces with premium presentation",
    gearFocus: "uniforms, shoes, recovery tools, and personal storage",
    blogUrl: "/blog/basketball-lockers-complete-guide-to-custom-athletic-storage-solutions"
  },
  {
    slug: "hockey",
    name: "Hockey",
    primaryNeed: "extra-durable lockers with drying airflow and stick-ready organization",
    gearFocus: "pads, skates, helmets, and wet-equipment drying workflows",
    blogUrl: "/blog/hockey-lockers-complete-guide-to-custom-athletic-storage-solutions"
  },
  {
    slug: "baseball",
    name: "Baseball",
    primaryNeed: "locker layouts that balance gear storage and fast daily access",
    gearFocus: "bats, gloves, cleats, uniforms, and rotation equipment",
    blogUrl: "/blog/complete-guide-custom-sports-lockers"
  },
  {
    slug: "lacrosse",
    name: "Lacrosse",
    primaryNeed: "modular storage that handles mixed equipment and seasonal transitions",
    gearFocus: "sticks, pads, helmets, footwear, and shared team gear",
    blogUrl: "/blog/sport-specific-locker-design"
  }
];
const woodVsMetalSports = [
  { slug: "football", name: "Football" },
  { slug: "hockey", name: "Hockey" },
  { slug: "basketball", name: "Basketball" },
  { slug: "baseball", name: "Baseball" },
  { slug: "soccer", name: "Soccer" },
  { slug: "lacrosse", name: "Lacrosse" }
];
const canadianProvinces = [
  { slug: "ontario", name: "Ontario", region: "Central Canada" },
  { slug: "british-columbia", name: "British Columbia", region: "Western Canada" },
  { slug: "alberta", name: "Alberta", region: "Western Canada" },
  { slug: "quebec", name: "Quebec", region: "Eastern Canada" },
  { slug: "manitoba", name: "Manitoba", region: "Central Canada" },
  { slug: "saskatchewan", name: "Saskatchewan", region: "Central Canada" }
];
const canadianCities = [
  { slug: "toronto", name: "Toronto", province: "Ontario", provinceSlug: "ontario" },
  { slug: "vancouver", name: "Vancouver", province: "British Columbia", provinceSlug: "british-columbia" },
  { slug: "calgary", name: "Calgary", province: "Alberta", provinceSlug: "alberta" },
  { slug: "edmonton", name: "Edmonton", province: "Alberta", provinceSlug: "alberta" },
  { slug: "ottawa", name: "Ottawa", province: "Ontario", provinceSlug: "ontario" },
  { slug: "montreal", name: "Montreal", province: "Quebec", provinceSlug: "quebec" },
  { slug: "winnipeg", name: "Winnipeg", province: "Manitoba", provinceSlug: "manitoba" },
  { slug: "hamilton", name: "Hamilton", province: "Ontario", provinceSlug: "ontario" }
];
const levelMarketPages = [
  { levelSlug: "collegiate", levelName: "Collegiate", sportSlug: "football", sportName: "Football" },
  { levelSlug: "high-school", levelName: "High School", sportSlug: "football", sportName: "Football" },
  { levelSlug: "professional", levelName: "Professional", sportSlug: "hockey", sportName: "Hockey" },
  { levelSlug: "college", levelName: "College", sportSlug: "basketball", sportName: "Basketball" }
];

export { programmaticSports as a, canadianProvinces as b, canadianCities as c, levelMarketPages as l, programmaticStates as p, woodVsMetalSports as w };

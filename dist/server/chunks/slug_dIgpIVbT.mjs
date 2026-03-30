const CDN_BASE = "https://playerstall.b-cdn.net/images/";
const LEGACY_HERO_BLOCKLIST = [
  "blog-post-locker-room-1.jpg",
  "blog-post-custom-lockers.jpg",
  "blog-post-athletic-lockers-1.jpg",
  "blog-post-college-lockers.jpg",
  "blog-locker-room-featured-1.jpg",
  "hero-wood-sports-lockers.png",
  "football-hero-our-team.jpg",
  "hockey-player.png",
  "basketball-dribble.png",
  "customer-lockers/moose-locker-room-2.jpg"
];
const TOPIC_IMAGE_FILENAMES = {
  baseball: [
    "baseball-close-up.jpg",
    "baseball-glove-close.png",
    "baseball-glove.jpg",
    "baseball-hero.jpg",
    "baseball-pitch-fence.jpg",
    "baseball-player-2.jpg",
    "baseball-player-3.jpg",
    "baseball-player-nobg.png",
    "baseball-player.png",
    "baseball-team-1.jpg",
    "baseballs.jpg",
    "stadium-pov-baseball.jpg"
  ],
  basketball: [
    "basketball-dribble-hero.png",
    "basketball-dribble.png",
    "basketball-hoop-orange.jpg",
    "basketball-player.png",
    "basketball-rim-sunset.jpg"
  ],
  football: [
    "football-black-white-playerstall-lockers.jpg",
    "football-bottom-collage.png",
    "football-catch.jpg",
    "football-field.jpg",
    "football-helmet.jpg",
    "football-hero-our-team.jpg",
    "football-hero-our-team.png",
    "football-hero-playerstall-lockers.jpg",
    "football-player-1.jpg",
    "football-player-2.jpg",
    "football-player-3.png",
    "football-player-4.png",
    "football-player-broncos-throwing.png",
    "football-player-img-10.jpg",
    "football-player-img-11.jpg",
    "football-player-img-12.jpg",
    "football-player-img-13.jpg",
    "football-player-img-8.png",
    "football-player-img-9.png",
    "football-players-close-up.jpg",
    "helmet-bench.jpg",
    "nfl-footballs-logo.jpg",
    "player-football-blue-orange.png",
    "referree-close-up.jpg",
    "referree-hands-up.jpg",
    "romans-helmet.png",
    "titans-helmet.png"
  ],
  hockey: [
    "hockey-faceoff-playerstall-lockers.png",
    "hockey-player-2.png",
    "hockey-player.png",
    "hockey-referree-woman.jpg",
    "ice-hockey-close-up.jpg",
    "ice-hockey-game-distant-pov-2.jpg",
    "ice-hockey-game-distant-pov.jpg",
    "ice-hockey-game-zoom.jpg",
    "ice-hockey-hero-playerstall-lockers.jpg",
    "ice-hockey-puck-net.jpg",
    "ice-hockey-team-1.jpg",
    "ice-hockey-team-cheering.jpg",
    "ice-hockey-team-close.jpg"
  ],
  lacrosse: ["lacrosse-field-closeup.png", "lacrosse-hero.jpg"],
  soccer: ["soccer-hero-2.jpg", "soccer-hero.jpg", "soccer-player.png", "soccer.jpg"],
  generic: [
    "stadium-birds-eye-pov-hero-playerstall-lockers.jpg",
    "stadium-goalpost-playerstall-lockers.jpg",
    "stadium-hero-playerstall-lockers.jpg",
    "player-hero-playerstall-lockers.jpg",
    "team-trophy.jpg",
    "training-ground.jpg",
    "trophy-1.png",
    "trophy-2.png",
    "trophy-3.png",
    "trophy-4.png",
    "trophy-5.png",
    "black-screen.jpg",
    "header-banner.jpg"
  ]
};
const TOPIC_KEYS = ["basketball", "football", "hockey", "ice hockey", "baseball", "lacrosse", "soccer"];
const _pools = {};
for (const [topic, filenames] of Object.entries(TOPIC_IMAGE_FILENAMES)) {
  _pools[topic] = filenames.map((f) => CDN_BASE + f);
}
_pools["ice hockey"] = _pools["hockey"] ?? [];
const TOPIC_POOLS = _pools;
const DEFAULT_BLOG_HERO = CDN_BASE + "h1-img-8.jpg";
function norm(s) {
  return s.toLowerCase().replace(/\s+/g, "").replace(/-/g, "");
}
function resolveTopic(category, tags) {
  const candidates = [
    (category ?? "").trim(),
    ...(tags ?? []).map((t) => String(t).trim())
  ].filter(Boolean);
  for (const key of TOPIC_KEYS) {
    const keyNorm = norm(key);
    if (candidates.some((c) => norm(c) === keyNorm || norm(c).includes(keyNorm))) return key;
  }
  return "generic";
}
function topicToPoolKey(topic) {
  if (topic === "ice hockey") return "hockey";
  return topic;
}
function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h << 5) - h + slug.charCodeAt(i) | 0;
  return Math.abs(h);
}
function getBlogHeroUrl(options) {
  const raw = options.heroImage?.trim();
  if (raw) {
    const isBlocklisted = LEGACY_HERO_BLOCKLIST.some((bad) => raw.includes(bad));
    if (!isBlocklisted) return raw;
    return DEFAULT_BLOG_HERO;
  }
  const topic = resolveTopic(options.category, options.tags);
  const poolKey = topicToPoolKey(topic);
  const pool = TOPIC_POOLS[poolKey];
  const slug = options.slug?.trim() ?? "";
  const index = slug ? hashSlug(slug) % pool.length : 0;
  return pool[index];
}

function slugify(value) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().replace(/&/g, "and").replace(/[\s/]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "";
}

export { getBlogHeroUrl as g, slugify as s };

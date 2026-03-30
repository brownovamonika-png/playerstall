import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sports equipment storage will keep your gear healthy",
  "description": "Keep sports gear healthy with proper storage: drying, cleaning, and ventilation tips. Prevent odors and mold with wood lockers. PlayerStall—30+ years. Free consultation.",
  "category": "Maintenance & Care",
  "tags": ["equipment-storage", "equipment-care", "maintenance"],
  "heroImage": "https://playerstall.b-cdn.net/images/hockey-lockers-tahoe.jpg",
  "datePublished": "2023-01-07",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 334
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    img: "img",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["After a hard-fought game, it’s time to freshen up and get your gear clean and dry. To prevent your sports equipment from developing odors and mold, it’s important to dry it thoroughly. One option is to use a sports equipment storage locker like ", createVNode(_components.a, {
        href: "/gallery/",
        children: "PlayerStall"
      }), " to get your gear off the floor and into the air to dry."]
    }), "\n", createVNode(_components.p, {
      children: "An essential tool to keep your gear clean within your sports equipment storage locker is to use a cleaner. To create your own sports equipment cleaning solution, mix 3/4 teaspoon of bleach into 500mL of room temperature water. Be sure not to use too much bleach, as it can damage your fabrics. You can use this solution to soak larger items like hockey pads or add it to your washing machine when cleaning clothes. Make sure to dry the items thoroughly afterwards. If your equipment has blood on it, use gloves to scrub the affected areas with a solution of 3 tablespoons bleach in 5L of cold water, then set it in a well-ventilated area to dry inside your sports equipment storage."
    }), "\n", createVNode(_components.p, {
      children: "To quickly disinfect your equipment between washings, you can create a spray using a mixture of 5 parts water to 1 part vinegar and a few drops of scented essential oil. Spray this on all parts of your equipment and set it in a well-ventilated area to dry. This solution will kill harmful bacteria and eliminate bad odors."
    }), "\n", createVNode(_components.p, {
      children: ["By keeping your sports equipment clean, dry, and organized with a sports equipment storage locker, you can extend its lifespan and keep your space tidy. A PlayerStall Wood locker is a ", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: "convenient and affordable"
      }), " option for storing your sports gear and keeping it organized in your mudroom."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/01/sports-locker-mudroom-locker-1024x768.jpg",
        alt: "sports equipment storage in a garage"
      }), "\n", createVNode(_components.em, {
        children: "Sports equipment storage"
      })]
    })]
  });
}
function MDXContent(props = {}) {
  const {wrapper: MDXLayout} = props.components || ({});
  return MDXLayout ? createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  }) : _createMdxContent(props);
}

const url = "src/content/blog/sports-equipment-storage-will-keep-your-gear-healthy.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-equipment-storage-will-keep-your-gear-healthy.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-equipment-storage-will-keep-your-gear-healthy.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

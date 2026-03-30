import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "A Sports locker keep you clean",
  "description": "Keep gear clean and dry after games. Why sports lockers prevent odors and mold—cleaning tips and ventilation. PlayerStall wood lockers for 30+ years. Free consultation.",
  "category": "Maintenance & Care",
  "tags": ["bacteria-prevention", "equipment-care"],
  "heroImage": "https://playerstall.b-cdn.net/images/IMG_29331002.jpg",
  "datePublished": "2023-01-10",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 304
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    img: "img",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["After an intense game, it’s essential to take care of your gear by cleaning and drying it thoroughly. Damp or moist equipment can lead to unpleasant odors and mold growth, which can cause damage to the gear. A great way to avoid this is by using a sports locker such as the ", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: "PlayerStall "
      }), "to elevate your gear off the ground and into the air to dry."]
    }), "\n", createVNode(_components.p, {
      children: "To create a cleaning solution, you can mix 3/4 teaspoon of bleach into 500mL of room temperature water. This solution can be used to clean larger items such as hockey pads, but be careful not to use too much bleach as it can damage fabrics. Additionally, when cleaning equipment that has blood stains, use gloves and a solution of 3 tablespoons of bleach mixed in 5L of cold water. Scrub the affected areas and then place it in a well-ventilated area to dry."
    }), "\n", createVNode(_components.p, {
      children: "In between washings, you can quickly disinfect your equipment with a spray solution made from mixing 5 parts water with 1 part vinegar and adding a few drops of scented essential oil. Spray this on all parts of your equipment and let it dry in a well-ventilated area. This solution is effective in eliminating harmful bacteria and bad odors."
    }), "\n", createVNode(_components.p, {
      children: ["By keeping your sports equipment clean, dry, and organized in a sports locker, you can prolong its lifespan and maintain a tidy space. The PlayerStall sports locker offers an affordable and convenient solution for storing and organizing your sports gear in your mudroom or ", createVNode(_components.a, {
        href: "/gallery",
        children: "locker room"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/01/mudroom-lockers-1-768x1024.jpg",
        alt: "sports locker in a mudroom"
      })
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

const url = "src/content/blog/a-sports-locker-keep-you-clean.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/a-sports-locker-keep-you-clean.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/a-sports-locker-keep-you-clean.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

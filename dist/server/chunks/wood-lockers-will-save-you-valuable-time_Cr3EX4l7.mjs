import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Wood lockers will save you valuable time",
  "description": "Like PlayerStall wood lockers, Hockey players are known for their toughness, but they also understand the importance of maintaining their equipment to protect t",
  "category": "Buying Guides",
  "tags": ["wood-lockers", "organization", "maintenance"],
  "heroImage": "https://playerstall.b-cdn.net/images/EkPbSwSXcAA172U.jpg",
  "datePublished": "2023-01-16",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 339
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    img: "img",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Like PlayerStall wood lockers, Hockey players are known for their toughness, but they also understand the importance of maintaining their equipment to protect them while on the ice. Keeping your hockey equipment in top shape is crucial for your safety and performance. Here are some tips on how to maintain your skates, helmet, gloves, and apparel:"
    }), "\n", createVNode(_components.p, {
      children: "Skates:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Make sure they fit properly, as small skates can distract you from the game.- Sharp blades are safer than dull ones, so sharpen them as soon as they start to dull.- Clean blades after every game.- Check the rivets and have them adjusted by a professional if necessary.- Pull out sweaty insoles to dry them out in your wood locker to reduce bacteria."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Helmet:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Regularly check for dents and cracks, as they can weaken the outer shell and pose a safety hazard."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Gloves:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["Don’t put them near a heat source because they can shrink and crack.- Hang them up to dry after every game and use a ", createVNode(_components.a, {
          href: "https://homesteadandchill.com/homemade-hand-sanitizer/",
          children: "homemade sanitizing spray"
        }), " to freshen them up."]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "Jerseys:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: "Wash them thoroughly after every game.- Use a sports locker to hang them up and get them dry, and keep your equipment organized."
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "/gallery",
        children: "PlayerStall"
      }), " provides top-notch sports lockers that are functional, affordable, and great-looking. Our hockey lockers are perfect for keeping your locker room or garage organized. Our wood lockers are perfect for moms who are always cleaning up stinky, sweaty gear and looking for missing items before games. A wood locker will make your hockey mom life a lot easier and certainly a lot more organized."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/01/StickRack-1-576x1024.jpg",
        alt: "stick rack"
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

const url = "src/content/blog/wood-lockers-will-save-you-valuable-time.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/wood-lockers-will-save-you-valuable-time.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/wood-lockers-will-save-you-valuable-time.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Athletic Lockers- Safety tips in the Locker Room",
  "description": "Safety tips in the Locker Room   While sitting in your athletic lockers, look around at the potential for injury. Staying safe is a given, especially on the fie",
  "category": "Maintenance & Care",
  "tags": ["maintenance", "equipment-care"],
  "heroImage": "https://playerstall.b-cdn.net/images/IMG_29341002.jpg",
  "datePublished": "2017-05-14",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 383
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    img: "img",
    li: "li",
    p: "p",
    strong: "strong",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Safety tips in the Locker Room"
    }), "\n", createVNode(_components.p, {
      children: "While sitting in your athletic lockers, look around at the potential for injury. Staying safe is a given, especially on the field or the ice. We make sure all our sports gear is in shape, ready to protect us from hits, bumps and bruises. Once you take your gear off, you still need to be cognisant of some of the dangers outside the playing arena. The locker room can cause a ton of injuries so here are a few tips to keep you and your teammates safe so you are are ready for the next game."
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "If you have any valuables, keep them locked inside your sports lockers."
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["After everyone has left the locker room, make sure all the ", createVNode(_components.a, {
            href: "/products/",
            children: "athletic lockers"
          }), " are locked, and lock the main door behind you."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: ["Wear shoes in the locker room. Slippery floors can cause some major damage to ligaments and limbs- store some shoes in those ", createVNode(_components.strong, {
            children: "athletic lockers"
          }), " so you can slip them on when you are walking around."]
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "If you are heading to the weight room, bring a buddy. Having a spotter will let you lift without worrying about injuries."
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "If your sports equipment is sweaty, hang it up right away in athletic lockers. This will dry it out and will prevent bacteria growing which may cause infections."
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: ["At PlayerStall, we build the highest value athletic lockers in the business. Other products out there may claim to be the best drying unit but they can’t match us in quality, price or design. We back up our product with a five year guarantee. Does the other ", createVNode(_components.a, {
        href: "/products/",
        children: "sports lockers"
      }), " out there match up? Not a chance!"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/03/custom_sm.png",
        alt: "athletic lockers"
      })
    }), "\n", createVNode(_components.p, {
      children: ["If you are looking for locker room lockers or mudroom lockers for our garage, PlayerStall is the best ", createVNode(_components.em, {
        children: "sports equipment storage"
      }), " solution out there."]
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

const url = "src/content/blog/athletic-lockers-safety-tips-locker-room.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/athletic-lockers-safety-tips-locker-room.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/athletic-lockers-safety-tips-locker-room.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

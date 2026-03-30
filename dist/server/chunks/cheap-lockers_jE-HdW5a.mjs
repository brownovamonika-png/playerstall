import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Tired of cheap lockers?",
  "description": "Tired of that Flimsy Sports Locker ? Switch to PlayerStall Sports Locker!   Storing and organizing your kid’s sports equipment can be a real pain. To avoid thos",
  "category": "Buying Guides",
  "tags": ["buying-guide", "budget", "durability"],
  "heroImage": "https://playerstall.b-cdn.net/images/football-lockers-bonnyville2.jpg",
  "datePublished": "2017-09-29",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 347
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
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: ["Tired of that Flimsy ", createVNode(_components.strong, {
        children: "Sports Locker"
      }), "? Switch to PlayerStall Sports Locker!"]
    }), "\n", createVNode(_components.p, {
      children: ["Storing and organizing your kid’s sports equipment can be a real pain. To avoid those last minute expeditions of finding that missing shin pad,choose a better ", createVNode(_components.em, {
        children: "sports equipment storage"
      }), " solution. Sport Lockers keep all your gear dry and organized so its ready to go when you are!"]
    }), "\n", createVNode(_components.p, {
      children: ["Avoid those flimsy Sport Locker companies out there that charge an arm and a leg for their cheap lockers. Our athletic locker has a rigid design using ¾” wood- our wood lockers are unmatched for quality and price. At PlayerStall, our sports locker will change the way you think about storing your sports equipment. We have a variety of sports locker models that are perfect as ", createVNode(_components.a, {
        href: "/mudroom-lockers/",
        children: "mudroom lockers"
      }), ", entryway lockers, bedroom lockers or any type of home locker."]
    }), "\n", createVNode(_components.p, {
      children: ["Whether you are a parent or a coach looking for a football locker, hockey locker, soccer locker or any\n", createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/03/CL1buBfWwAAYclA-300x225.jpg",
        alt: "athletic locker room"
      }), "\ntype of ", createVNode(_components.strong, {
        children: "sports locker"
      }), ", we have you covered. Ask us about our team locker discounts that we give to teams that are looking to transform their old locker room into a pro locker room."]
    }), "\n", createVNode(_components.p, {
      children: "At PlayerStall, our mission is to give the highest quality sports locker for the best price. We have been making the best wood lockers in the industry for a long time and continue to provide the best athletic locker on the market. If you are looking for lockers for sale, you have come to the right place."
    }), "\n", createVNode(_components.p, {
      children: ["Feel free to call us anytime to discuss which sports locker option is the best sports equipment storage solution for you. Check out our ", createVNode(_components.a, {
        href: "/gallery/",
        children: "locker room gallery"
      }), " and our", createVNode(_components.a, {
        href: "http://facebook.com/playerstallsports/",
        children: " Facebook"
      }), " page to see some the recent locker room projects we have completed."]
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

const url = "src/content/blog/cheap-lockers.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/cheap-lockers.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/cheap-lockers.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Come see our latest Sports Locker Rooms we have done!",
  "description": "See recent custom sports locker rooms completed by PlayerStall for amateur and professional teams across North America, with a five year guarantee and free design consultation.",
  "category": "Locker Room Design",
  "tags": ["locker-room-design", "wood-lockers", "custom-lockers"],
  "heroImage": "https://playerstall.b-cdn.net/images/tisdale-trojans-locker-room2.PNG",
  "datePublished": "2017-04-08",
  "readTime": "1 min read",
  "author": "PlayerStall",
  "wordCount": 104
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "custom-sports-locker-rooms",
    "text": "Custom Sports Locker Rooms"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "custom-sports-locker-rooms",
      children: "Custom Sports Locker Rooms"
    }), "\n", createVNode(_components.p, {
      children: ["[embed]", createVNode(_components.a, {
        href: "https://www.youtube.com/watch?v=Rp6iqtv6ZQU%5B/embed",
        children: "https://www.youtube.com/watch?v=Rp6iqtv6ZQU[/embed"
      }), "]"]
    }), "\n", createVNode(_components.p, {
      children: ["We custom design locker rooms for Amateur and Professional Sports teams all over North America. If you are looking for that recruiting edge, ", createVNode(_components.a, {
        href: "/contact",
        children: "give us a call"
      }), " and we will custom design your room free of charge. Our lockers look great and are built to last. We back up that promise with a five year guarantee on all our sports lockers. ", createVNode(_components.a, {
        href: "/gallery",
        children: "Click here"
      }), " to see some of the recent projects we have completed. Learn more about ", createVNode(_components.a, {
        href: "/blog/college-athletic-locker-guide",
        children: "choosing athletic lockers for college teams"
      }), " or explore our ", createVNode(_components.a, {
        href: "/blog/complete-guide-custom-sports-lockers",
        children: "complete guide to custom sports lockers"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "/products",
        children: "Click here to see our lineup"
      }), ". Read about ", createVNode(_components.a, {
        href: "/blog/wood-vs-metal-sports-lockers-complete-2025-comparison-guide",
        children: "wood vs metal sports lockers"
      }), " to understand the benefits of wood, or check out our ", createVNode(_components.a, {
        href: "/blog/choose-athletic-lockers",
        children: "guide on why to choose athletic lockers"
      }), ". ", createVNode(_components.a, {
        href: "/contact",
        children: "Contact us directly"
      }), " for our Team Order Discount price list."]
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

const url = "src/content/blog/come-see-latest-sports-locker-rooms-done.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/come-see-latest-sports-locker-rooms-done.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/come-see-latest-sports-locker-rooms-done.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

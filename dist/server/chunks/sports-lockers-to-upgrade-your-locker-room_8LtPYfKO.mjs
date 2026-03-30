import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sports lockers to upgrade your locker room",
  "description": "PlayerStall sports lockers have been helping teams for decades to upgrade their locker room. Having helped over 500 teams across North America, we are proud on ",
  "category": "Locker Room Design",
  "tags": ["locker-room-design", "wood-lockers"],
  "heroImage": "https://playerstall.b-cdn.net/images/20200602_174428.jpg",
  "datePublished": "2023-02-14",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 234
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
      children: "PlayerStall sports lockers have been helping teams for decades to upgrade their locker room. Having helped over 500 teams across North America, we are proud on being the low cost, highest value manufacturer of wood lockers in the industry."
    }), "\n", createVNode(_components.p, {
      children: "If your team is budget conscious, PlayerStall wood lockers are your solution to upgrade your room while not breaking the bank."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/Wood-Lockers-UBC-1024x1024.jpg",
        alt: ""
      })
    }), "\n", createVNode(_components.p, {
      children: "Unlike other manufacturers out there, our wooden lockers are made with full 3/4” cabinet grade plywood. Our classically designed wood lockers will look good for decades, and its robust design will ensure that they last decades too."
    }), "\n", createVNode(_components.p, {
      children: ["Feel free to take a look at some of our recent projects in our ", createVNode(_components.a, {
        href: "/gallery/",
        children: "gallery"
      }), " or go to our ", createVNode(_components.a, {
        href: "https://www.facebook.com/playerstallsports/",
        children: "facebook"
      }), " page to get an idea of what to expect from us. We fully custom size the lockers to fit your locker room perfectly."]
    }), "\n", createVNode(_components.p, {
      children: "If you are interested in upgrading your locker room, feel free to fill out a form and we will send you a layout. Also, feel free to call our toll free phone number anytime to talk us about how we can help."
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

const url = "src/content/blog/sports-lockers-to-upgrade-your-locker-room.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-to-upgrade-your-locker-room.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-to-upgrade-your-locker-room.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

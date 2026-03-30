import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "New Wood Lockers for Sale",
  "description": "PlayerStall has a variety of wood lockers for sale to fit any need. Are you looking for new locker room lockers for your sports team or just looking for a coupl",
  "category": "Buying Guides",
  "tags": ["buying-guide", "wood-lockers", "custom-lockers"],
  "heroImage": "https://playerstall.b-cdn.net/images/image0.jpeg",
  "datePublished": "2023-02-25",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 274
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
      children: ["PlayerStall has a variety of wood lockers for sale to fit any need. Are you looking for new locker room lockers for your sports team or just looking for a couple ", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: "garage lockers"
      }), " as a ", createVNode(_components.a, {
        href: "/products/",
        children: "sports equipment storage"
      }), " solution?"]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/hockey-lockers-tahoe.jpg",
        alt: ""
      })
    }), "\n", createVNode(_components.p, {
      children: "The picture above is a great example of how to change a regular old room into a professional hockey locker room using our Stadium Locker."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/FHS-Room-1024x227.jpg",
        alt: ""
      })
    }), "\n", createVNode(_components.p, {
      children: "The Stadium Locker is one of many lockers for sale at PlayerStall. We have models that will fit any budget."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/unnamed-7-1024x244.jpg",
        alt: ""
      })
    }), "\n", createVNode(_components.p, {
      children: "The locker room lockers in the picture above is our Varsity locker. The Varsity locker is our most popular locker for sale because of its classic, robust design and its price. Our “cheap lockers” are only cheap in price, not quality."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/sports-lockers-basement-1-1024x1024.jpg",
        alt: ""
      })
    }), "\n", createVNode(_components.p, {
      children: ["Are you looking for a garage locker as a sports equipment storage solution? ", createVNode(_components.a, {
        href: "/products/",
        children: "Take a look"
      }), " at the lockers for sale that suit your needs and budget. Feel free to reach out and contact us if you have any questions about our locker room lockers."]
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

const url = "src/content/blog/new-wood-lockers-for-sale.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/new-wood-lockers-for-sale.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/new-wood-lockers-for-sale.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

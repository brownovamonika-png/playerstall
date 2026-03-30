import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Simple Tips to keep your Sports Equipment in Top Shape",
  "description": "Keep your Sports Equipment in Top shape with these simple Tips   If you are an athlete, you need your equipment to be strong and durable to keep you safe during",
  "category": "Maintenance & Care",
  "tags": ["equipment-care", "maintenance"],
  "heroImage": "https://playerstall.b-cdn.net/images/Surrey-Locker-Room.jpg",
  "datePublished": "2017-07-23",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 340
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "keep-your-sports-equipment-in-top-shape-with-these-simple-tips",
    "text": "Keep your Sports Equipment in Top shape with these simple Tips"
  }, {
    "depth": 3,
    "slug": "pads",
    "text": "Pads"
  }, {
    "depth": 3,
    "slug": "helmet",
    "text": "Helmet"
  }, {
    "depth": 3,
    "slug": "gloves",
    "text": "Gloves"
  }, {
    "depth": 3,
    "slug": "cleats",
    "text": "Cleats"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    h3: "h3",
    img: "img",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "keep-your-sports-equipment-in-top-shape-with-these-simple-tips",
      children: "Keep your Sports Equipment in Top shape with these simple Tips"
    }), "\n", createVNode(_components.p, {
      children: "If you are an athlete, you need your equipment to be strong and durable to keep you safe during the game or during workouts. There are a few things you can do to make sure your equipment is in good shape and ready to do the job when you are."
    }), "\n", createVNode(_components.h3, {
      id: "pads",
      children: "Pads"
    }), "\n", createVNode(_components.p, {
      children: "Pads are one of the most important pieces of equipment that any athlete needs. Inspect them before you hit the field or rink and make sure they aren’t fray, ripped or smelly. Use a wood locker to store your gear after the game to prevent bacteria and mold forming on your pads."
    }), "\n", createVNode(_components.h3, {
      id: "helmet",
      children: "Helmet"
    }), "\n", createVNode(_components.p, {
      children: ["Your helmet is also a great place for bacteria to gather. All the heat and sweat during the game creates microbes that can multiply quickly. Place the helmet on one of the shelves of a sports lockers to air it out.", createVNode(_components.a, {
        href: "/products/",
        children: " Athletic lockers"
      }), " will keep them dry and ready to go."]
    }), "\n", createVNode(_components.h3, {
      id: "gloves",
      children: "Gloves"
    }), "\n", createVNode(_components.p, {
      children: "Hang those gloves up to get them dry. Using one of the hooks in the** wood lockers** will keep them organized and dried out."
    }), "\n", createVNode(_components.h3, {
      id: "cleats",
      children: "Cleats"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2017/06/Mudroom-Locker-1-225x300.jpg",
        alt: "mudroom lockers"
      })
    }), "\n", createVNode(_components.p, {
      children: "Our seat compartment in the sports locker will keep them organized so you aren’t spending all morning looking for them."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.a, {
        href: "https://www.facebook.com/playerstallsports/",
        children: "PlayerStall Wood Lockers "
      }), "are a perfect compliment for any athlete looking to keep their gear oragnized and dry. We have many options of ", createVNode(_components.strong, {
        children: "sports lockers"
      }), "; whether you are looking for mudroom lockers, sports lockers, athletic lockers or , we have got what you need."]
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

const url = "src/content/blog/simple-tips-keep-sports-equipment-top-shape.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/simple-tips-keep-sports-equipment-top-shape.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/simple-tips-keep-sports-equipment-top-shape.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

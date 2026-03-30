import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sports Equipment Storage: Keep Gear Dry and Organized",
  "description": "Sports equipment storage that keeps gear dry and organized. Wood lockers from PlayerStall—30+ years, five year guarantee. Free consultation. Get your quote today. Custom solutions.",
  "category": "Buying Guides",
  "tags": ["equipment-storage", "organization"],
  "heroImage": "https://playerstall.b-cdn.net/images/View-recent-photos-1.png",
  "datePublished": "2017-04-03",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 341
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
      children: [createVNode("h2", {
        children: createVNode(_components.strong, {
          children: "Sports equipment storage"
        })
      }), "\nSo you have spent a lot of money on your sports equipment and now the challenge is to find some sports equipment storage for it. If your new equipment is not taken care of so it can completely dry, it will quickly breakdown and start to smell really bad. The answer to this problem is a sports locker from PlayerStall."]
    }), "\n", createVNode(_components.p, {
      children: ["[caption id=“attachment_422” align=“alignright” width=“200”]", createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/03/Sports-Lockers-Stadium-200x300.jpg",
        alt: "Stadium Sports Locker"
      }), " Sports equipment storage[/caption]"]
    }), "\n", createVNode(_components.p, {
      children: "Sports equipment is very expensive so we have the solution to keep it off the floor and dry, and organized. Your equipment, whether it be hockey equipment, ringette equipment, lacrosse equipment, football equipment, baseball equipment or basketball equipment, will be ready to go when it is game time."
    }), "\n", createVNode(_components.p, {
      children: ["Our ", createVNode(_components.em, {
        children: "sports lockers"
      }), " are made with the strongest and best materials and are built to last well beyond your sports playing career. Our ", createVNode(_components.strong, {
        children: "wood lockers"
      }), " are made with full ¾” wood and all our hardware is made with brushed nickel to ensure the strength and ", createVNode(_components.a, {
        href: "/products/",
        children: "look of our sports equipment storage unit"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["You have spent a lot of time and money researching the best sports equipment on the market. Now that you have bought the perfect pieces, it’s time to protect your sports equipment. We have the most affordable, high quality ", createVNode(_components.a, {
        href: "/products/",
        children: "athletic lockers"
      }), " in the business to keep your equipment lasting years to come. Whether you want a storage solution for your garage, mudroom or professional locker room, PlayerStall has many custom solutions to fit any high impact environment. Call us anytime to discuss your particular room and let us solve your sports equipment storage needs."]
    }), "\n", createVNode(_components.p, {
      children: "If you are an amateur or professional sports team looking to improve your locker room at a very affordable price, give us a call to receive our Team order discounts. Nobody in the industry can offer the quality and price like we can- Our price and quality can not be matched."
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

const url = "src/content/blog/sportsequipmentstorage.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sportsequipmentstorage.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sportsequipmentstorage.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Take back your garage with PlayerStall Sports Lockers",
  "description": "Take back your mudroom or garage with PlayerStall Sports Lockers   Anybody with kids in sports probably has probably gotten quite frustrated with the mess and s",
  "category": "Home Storage",
  "tags": ["mudroom", "garage-storage", "organization", "wood-lockers"],
  "heroImage": "https://playerstall.b-cdn.net/images/20201110_154836.jpg",
  "datePublished": "2017-05-22",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 339
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "why-buy-lockers",
    "text": "Why buy lockers?"
  }, {
    "depth": 2,
    "slug": "where-can-i-put-the-wood-lockers",
    "text": "Where can I put the wood lockers?"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    img: "img",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Take back your mudroom or garage with PlayerStall Sports Lockers"
    }), "\n", createVNode(_components.p, {
      children: ["Anybody with kids in sports probably has probably gotten quite frustrated with the mess and stinky equipment being laid out all over the house. You get home and your kids just throw there bag on the floor, waiting for Mom to clean up their gear. If you are lucky, they may even take out the gear and throw it on the floor. Well it’s time to take back your house, mudroom or garage using a PlayerStall Sports Locker! Our ", createVNode(_components.a, {
        href: "/products/",
        children: "sports equipment storage"
      }), " solutions will keep your equipment organized, dry and will help you take back that valuable floor space. We have tons of lockers for sale to suit anybodys needs."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2017/05/twitter-ad-300x120.jpg",
        alt: "lockers for sale"
      })
    }), "\n", createVNode(_components.h2, {
      id: "why-buy-lockers",
      children: "Why buy lockers?"
    }), "\n", createVNode(_components.p, {
      children: "Sports Lockers will not only keep your house tidy from all that sports equipment but it will also:"
    }), "\n", createVNode(_components.p, {
      children: "Keep your equipment dry and free from smelling bad\nPrevent forgetting valuable equipment for the game\nMake your space look great"
    }), "\n", createVNode(_components.h2, {
      id: "where-can-i-put-the-wood-lockers",
      children: "Where can I put the wood lockers?"
    }), "\n", createVNode(_components.p, {
      children: ["PlayerStall Sports Lockers can be put anywhere! They look great and you can rest assured that our sports lockers will last well beyond your young athlete’s career. You can use your wood lockers as Hockey lockers, ", createVNode(_components.a, {
        href: "/products/",
        children: "Football lockers"
      }), ", Mudroom Lockers or as any kind of athletic lockers. Our sports lockers not only saves space but keeps all that equipment organized so you don’t have to worry about your athlete forgetting anything again. PlayerStall has lots of different lockers for sale, so check us out and give us a call."]
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

const url = "src/content/blog/take-back-mudroom-garage-playerstall-sports-lockers.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/take-back-mudroom-garage-playerstall-sports-lockers.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/take-back-mudroom-garage-playerstall-sports-lockers.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

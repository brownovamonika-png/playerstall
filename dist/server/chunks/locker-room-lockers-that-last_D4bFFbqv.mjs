import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Locker room lockers that last",
  "description": "PlayerStall Sports Lockers was founded with the goal of providing a superior solution for storing and drying sports equipment, particularly locker room lockers.",
  "category": "Buying Guides",
  "tags": ["wood-lockers", "durability", "maintenance"],
  "heroImage": "https://playerstall.b-cdn.net/images/h1-img-8.jpg",
  "datePublished": "2023-01-21",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 338
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
      children: ["PlayerStall Sports Lockers was founded with the goal of providing a superior solution for storing and drying sports equipment, particularly locker room lockers. Our company is a leading provider of wood lockers for not only hockey but also for ringette, lacrosse, football, soccer, and baseball. Our ", createVNode(_components.a, {
        href: "/gallery/",
        children: "wooden lockers"
      }), " are designed to be both functional and attractive, constructed to be durable and resistant to moisture. The unique design of our lockers allows for optimal airflow, which dries equipment faster than any other hockey equipment drying rack. Also, our wood lockers keep al your gear organized so its ready to go when you are. Knowing that there was a need for a better solution, we set out to address the problems with other systems. Our focus on design and practicality has made us a preferred choice for mudrooms, schools, arenas, field houses, and locker rooms. Contact us to learn more about our sports equipment storage solutions and we can provide a floor plan sketch so you can see how professional your locker room can become. PlayerStall is a company that identified a need and set out to solve it with practical, durable, and easy-to-use storage solutions for various sports equipment. Our unique service promotes organization, storage, and drying for your sports equipment, so you won’t have to worry about tripping over or getting moldy equipment. PlayerStall sports lockers have been making our classically designed sports lockers for decades and have provided countless teams with high value, cheap lockers that will last decades."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/01/image1-300x225.jpeg",
        alt: "locker room lockers"
      })
    }), "\n", createVNode(_components.p, {
      children: ["Call or email us anytime with any inquiries. Our locker room lockers are built strong and built to last through the rigors of a locker room environment. ", createVNode(_components.a, {
        href: "https://www.facebook.com/playerstallsports/",
        children: "PlayerStall"
      }), " has the highest value lockers for sale in the industry. So whether you are looking for football lockers, hockey lockers or any locker room locker, give us a call."]
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

const url = "src/content/blog/locker-room-lockers-that-last.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/locker-room-lockers-that-last.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/locker-room-lockers-that-last.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

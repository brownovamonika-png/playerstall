import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sports Lockers selection guide- What matters?",
  "description": "Sports locker selection guide: what matters by sport, location, delivery, and features. Choose the right wood or custom lockers. 30+ years. Free consultation.",
  "category": "Buying Guides",
  "tags": ["buying-guide", "wood-lockers", "locker-room-design"],
  "heroImage": "https://playerstall.b-cdn.net/images/unnamed-8.jpg",
  "datePublished": "2023-01-28",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 307
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
      children: "When selecting sports lockers, it’s important to consider the sport the locker will be used for, the location of the locker, the time frame for delivery, and any additional features desired."
    }), "\n", createVNode(_components.p, {
      children: "First, think about the sport the locker will be used for. Different sports require different amounts of space for equipment, so it’s important to choose a locker that is specifically made for the sport. For example, football lockers will be larger than a standard sports locker."
    }), "\n", createVNode(_components.p, {
      children: "Next, consider where the lockers will be located. If they will be in a high-traffic area with media access, it’s important to choose a locker that has a professional and aesthetically pleasing appearance. Wood lockers are a great option for this as they give a high-end look and provide ample ventilation for sports equipment."
    }), "\n", createVNode(_components.p, {
      children: "It’s also important to consider the time frame for delivery. Depending on the deadline, our sales team can give suggestions on the type of material to choose and the estimated costs."
    }), "\n", createVNode(_components.p, {
      children: "Finally, think about any special or additional features that you would like on the lockers. Some people may want team logos or colors incorporated into the design. Communicating these preferences in advance can help determine costs and give the locker company time to thoughtfully incorporate them into the design."
    }), "\n", createVNode(_components.p, {
      children: ["Contact ", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: "PlayerStall"
      }), " today for all your sports equipment storage solutions, whether you’re part of a team looking for ", createVNode(_components.a, {
        href: "/gallery/",
        children: "locker room lockers"
      }), " or need mudroom lockers for your garage. We can make it happen within your budget limits."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/01/IMG_0850-300x225.jpg",
        alt: "sports locker room"
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

const url = "src/content/blog/sports-lockers-selection-guide-what-matters.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-selection-guide-what-matters.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-selection-guide-what-matters.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

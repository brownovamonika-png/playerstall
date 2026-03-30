import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "PlayerStall- Sports Lockers for the People",
  "description": "PlayerStall sports lockers are a high quality wood locker that is affordable for all types of levels of athletes. Most of our competitors offer a similar locker",
  "category": "Buying Guides",
  "tags": ["custom-lockers", "wood-lockers"],
  "heroImage": "https://playerstall.b-cdn.net/images/View-recent-photos-1.png",
  "datePublished": "2023-02-12",
  "readTime": "2 min read",
  "author": "PlayerStall",
  "wordCount": 399
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    img: "img",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "PlayerStall sports lockers are a high quality wood locker that is affordable for all types of levels of athletes. Most of our competitors offer a similar locker for twice the price. PlayerStall is a family company that builds a robust, classically designed sports locker that will stand the test of time."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Semi Pro Locker"
      })
    }), "\n", createVNode(_components.p, {
      children: "Our Semi Pro sports locker is our entry level model that is priced right for any level of athlete. This athletic locker is easy to build, is strong enough to last and won’t break the budget."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Varsity Locker"
      })
    }), "\n", createVNode(_components.p, {
      children: "The Varsity is our upgrade version of the Semi Pro. The Varsity comes with the same great quality but we’ve added a lift up seat to add a sports equipment storage solution for the players."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Pro Locker"
      })
    }), "\n", createVNode(_components.p, {
      children: "Our Pro Locker is a classic take on the Basketball/ Arena type locker. The deep side panels off pleanty of shelf space and privacy for the athlete. Again, this locker is built strong and will stand the test of time."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.strong, {
        children: "Stadium Locker"
      })
    }), "\n", createVNode(_components.p, {
      children: "The Stadium locker is our flagship wood locker. For the price, you will not find a wooden locker that comes close in quality and value. This locker is our original hockey locker model that is classically designed to look good for years to come."
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "https://playerstall.com/wp-content/uploads/2023/02/Skating-Institute-athletic-lockers.jpg",
        alt: "sports lockers solution"
      })
    }), "\n", createVNode(_components.p, {
      children: ["If your team is looking to outfit your ", createVNode(_components.a, {
        href: "/gallery/",
        children: "locker room"
      }), " with high quality locker room lockers, PlayerStall has you covered. Feel free to send us an email and we will send you a layout that fits your locker room perfectly. Our custom sizing ensures that you get a high quality look without the price tag. Nobody in the industry has the history or guarantees that we provide for our", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: " wood sports lockers"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: "If you are looking for an affordable solution for your locker room, PlayerStall sports lockers is the answer."
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

const url = "src/content/blog/playerstall-sports-lockers-for-the-people.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/playerstall-sports-lockers-for-the-people.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/playerstall-sports-lockers-for-the-people.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

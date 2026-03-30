import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Stinky Football Gear?",
  "description": "Stinky Football Gear? We have the solution! Football Lockers.   Football Lockers are the answer! Everybody who plays sports knows that horrid stink that your sw",
  "category": "Football",
  "tags": ["football", "equipment-care", "bacteria-prevention", "maintenance"],
  "heroImage": "https://playerstall.b-cdn.net/images/IMG_8092.jpg",
  "datePublished": "2017-05-16",
  "readTime": "3 min read",
  "author": "PlayerStall",
  "wordCount": 406
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "stinky-football-gear-we-have-the-solution-football-lockers",
    "text": "Stinky Football Gear? We have the solution! Football Lockers."
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    img: "img",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.h2, {
      id: "stinky-football-gear-we-have-the-solution-football-lockers",
      children: "Stinky Football Gear? We have the solution! Football Lockers."
    }), "\n", createVNode(_components.p, {
      children: [createVNode(_components.strong, {
        children: "Football Lockers"
      }), " are the answer! Everybody who plays sports knows that horrid stink that your sweaty football equipment has after a couple days sitting in the garage after a game. We know it just comes with the territory, and instead of fixing the problem, we usually just jam it back in the bag and deal with it another time. Curling it in a ball in your bag or in your trunk is not helping anyone… except bacteria. Instead of creating a stench and a bacterial nightmare, hang your gear in PlayerStall’s football lockers.\n", createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2017/04/football-locker-mudroom-locker-300x200.jpg",
        alt: "athletic locker football lockers"
      })]
    }), "\n", createVNode(_components.p, {
      children: "When you play, you sweat. All that sweat is soaked up by your football equipment. You take it, throw it in your bag, and now the bacteria is ready to turn into a stinky monster. Bacteria loves the dark, hot and moist environment of your bag and its ready to set up shop."
    }), "\n", createVNode(_components.p, {
      children: ["A quick and easy solution is to clean your gear, which we discuss in our guide on ", createVNode(_components.a, {
        href: "/blog/athletic-lockers-disinfection",
        children: "athletic locker disinfection"
      }), ", and hang it up in one of our football lockers. A big pain for Mom is to get their kids to organize their gear and to keep it dry. ", createVNode(_components.a, {
        href: "/sport/football",
        children: "Football lockers"
      }), " are the perfect solution. Your equipment will stay dry and your kids will want to hang their sports equipment just like the pros! Learn more about ", createVNode(_components.a, {
        href: "/blog/clean-football-equipment",
        children: "cleaning football equipment"
      }), " and discover ", createVNode(_components.a, {
        href: "/blog/sport-equipment-storage",
        children: "proper sports equipment storage"
      }), " techniques. Proper drying will make your sports equipment last longer, smell better and will help stop bacteria from getting out of control.\nPlayerStall has a bunch of options for football lockers. You can check out some of the recent projects on our ", createVNode(_components.a, {
        href: "/gallery",
        children: "gallery page"
      }), ". Our solid design ensures that our football lockers will last a lifetime, and they look great too! PlayerStall ", createVNode(_components.strong, {
        children: "Sports Lockers"
      }), " is the market leader in football lockers, ", createVNode(_components.a, {
        href: "/blog/hockey-wood-lockers-complete-2025-guide-for-ice-hockey-teams",
        children: "hockey lockers"
      }), ", ", createVNode(_components.a, {
        href: "/blog/making-life-easier-wood-lockers",
        children: "mudroom lockers"
      }), ", or any other wood lockers that you can imagine. If you need garage lockers, we got them. Looking for bedroom lockers, lockers for home or mudroom storage lockers? Playerstall is where to buy sports lockers. Read our ", createVNode(_components.a, {
        href: "/blog/complete-guide-custom-sports-lockers",
        children: "complete guide to custom sports lockers"
      }), " and learn ", createVNode(_components.a, {
        href: "/blog/choose-athletic-lockers",
        children: "why you should choose athletic lockers"
      }), ". Our quality is unmatched in the industry and thats why we back it up with a five year guarantee. If you are looking for high quality cheap lockers, give us a call anytime and we will help you out."]
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

const url = "src/content/blog/football-lockers-stinky-football-gear.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/football-lockers-stinky-football-gear.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/football-lockers-stinky-football-gear.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

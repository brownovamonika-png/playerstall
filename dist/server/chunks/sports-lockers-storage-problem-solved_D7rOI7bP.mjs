import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Sports Lockers- For any sport you play, we have your sports equipment storage problem solved",
  "description": "Sports Lockers- For any sport you play, we have your sports equipment storage problem solved   At PlayerStall Athletic Lockers , we have the sports lockers and ",
  "category": "Buying Guides",
  "tags": ["equipment-storage", "organization"],
  "heroImage": "https://playerstall.b-cdn.net/images/View-recent-photos-1.png",
  "datePublished": "2017-05-01",
  "readTime": "3 min read",
  "author": "PlayerStall",
  "wordCount": 426
};
function getHeadings() {
  return [{
    "depth": 3,
    "slug": "locker-room-lockers",
    "text": "Locker room lockers"
  }, {
    "depth": 3,
    "slug": "athletic-lockers-design",
    "text": "Athletic Lockers Design"
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    h3: "h3",
    img: "img",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode("h2", {
      children: "Sports Lockers- For any sport you play, we have your sports equipment storage problem solved"
    }), "\n", createVNode(_components.p, {
      children: ["At PlayerStall ", createVNode(_components.em, {
        children: "Athletic Lockers"
      }), ", we have the ", createVNode(_components.strong, {
        children: "sports lockers"
      }), " and storage solutions for any sport you can imagine. From hockey to football, skating to skiing, lacrosse, soccer, or baseball, we have the athletic lockers for you to store your gear away when it’s not in use. Simply send us a layout of your locker room, and we can provide a diagram with wood lockers, sports storage, and other solutions, which is perfectly tailored for your team’s needs. With single and multi sports locker options, we have any and everything your require for your locker room space. We custom design sizes and shapes, and can fit lockers in tight quarters to accommodate all your usable space."]
    }), "\n", createVNode(_components.h3, {
      id: "locker-room-lockers",
      children: "Locker room lockers"
    }), "\n", createVNode(_components.p, {
      children: ["Our products typically accommodate our clients’ needs and with this in mind, we can ", createVNode(_components.a, {
        href: "/gallery/",
        children: "custom design"
      }), " something to fit your specific goals or layout. Not only will our sports lockers help prevent the bacterial contamination and possible dangers of dirty equipment, we can help eliminate those foul odors in tight spaces as well with our drying and storage solutions."]
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/03/CL1buBfWwAAYclA-300x225.jpg",
        alt: "athletic locker room"
      })
    }), "\n", createVNode(_components.p, {
      children: "Finished with solid urethane, all of our lockers are constructed of solid birch wood for a durable, sturdy product. Our birch offers a rich, beautiful finish, alongside the most durable strength to avoid damage. Shelves are wide and deep and hardware is nickel brushed plated for optimal durability and strength. The high quality finishes we use allows us to provide you the highest quality wood lockers, while producing spaces which are moisture-resistant. It makes it ideal for all sports seasons."
    }), "\n", createVNode(_components.h3, {
      id: "athletic-lockers-design",
      children: "Athletic Lockers Design"
    }), "\n", createVNode(_components.p, {
      children: ["We have taken durability and looks into consideration in designing our sports equipment storage solutions. We match this claim with a five year warranty on all our sports lockers. Simply call our team for a consultation and we can get the design plan underway. Let us show you why so many others have chosen us, and allow us to provide the high quality locker room lockers you desire, for any athletic locker space.\nIf you have a team looking for ", createVNode(_components.strong, {
        children: "hockey lockers"
      }), ", ", createVNode(_components.a, {
        href: "/products/",
        children: "football lockers"
      }), ", wood lockers, employee lockers or are just looking for mudroom lockers to keep your young athletes gear intact and dry, give us a call today!"]
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

const url = "src/content/blog/sports-lockers-storage-problem-solved.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-storage-problem-solved.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/sports-lockers-storage-problem-solved.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

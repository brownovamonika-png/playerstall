import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Custom Sports Lockers for your team",
  "description": "Custom Sports Lockers for your team   If you are looking for locker room lockers, Custom made sports lockers are not as expensive as you think. Many locker manu",
  "category": "Buying Guides",
  "tags": ["custom-lockers", "team-culture"],
  "heroImage": "https://playerstall.b-cdn.net/images/Cc_PT6YUEAEIJb8.jpg",
  "datePublished": "2017-05-17",
  "readTime": "3 min read",
  "author": "PlayerStall",
  "wordCount": 430
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    img: "img",
    li: "li",
    p: "p",
    ul: "ul",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "Custom Sports Lockers for your team"
    }), "\n", createVNode(_components.p, {
      children: ["If you are looking for locker room lockers, Custom made ", createVNode(_components.a, {
        href: "/products/",
        children: "sports lockers"
      }), " are not as expensive as you think. Many locker manufacturers sell overpriced sports lockers which are flimsy and of poor quality. Take a look around the internet and you will see many of of competitors have their lockers made overseas and just slap their label on it. At PlayerStall, our wood lockers are 100% made in North America. All the design, materials, service and manufacturing is done right here in Langley, British Columbia."]
    }), "\n", createVNode(_components.p, {
      children: ["If you are looking to outfit a locker room with Athletic Lockers, you may assume that it is quite expensive. If you have a team, PlayerStall makes high quality ", createVNode(_components.a, {
        href: "https://www.instagram.com/playerstallsports/?hl=en",
        children: "sports lockers"
      }), " at steeply discounted prices. Our** wood lockers** are made of ¾” Birch and is a modular design so if it every gets damaged, you give us a call and we will ship you out new pieces… free of charge!"]
    }), "\n", createVNode(_components.p, {
      children: ["[caption id=“attachment_629” align=“alignright” width=“200”]\n", createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/04/Sports-Lockers-Stadium-200x300.jpg",
        alt: "sports Lockers"
      }), "\nPlayerStall Sports Lockers[/caption]"]
    }), "\n", createVNode(_components.p, {
      children: "The advantages of having athletic lockers in your locker room is plentiful. Keeping your equipment and organized is easier said than done but if you have wood lockers in your locker room, its so easy. For those wanting to dry their football equipment, baseball equipment, hockey equipment, ringette equipment, lacrosse equipment… our sports lockers make it a snap."
    }), "\n", createVNode(_components.p, {
      children: ["The look of our ", createVNode(_components.a, {
        href: "/products/",
        children: "athletic lockers"
      }), " is another great advantage. Whether you want to give your team that professional look or are just looking for that recruiting edge, PlayerStall’s athletic lockers are a great addition."]
    }), "\n", createVNode(_components.p, {
      children: "We have a wide selection of wood sports lockers to fit any sport:"
    }), "\n", createVNode(_components.ul, {
      children: ["\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Football Lockers"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Hockey Lockers"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Baseball Lockers"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Basketball Lockers"
        }), "\n"]
      }), "\n", createVNode(_components.li, {
        children: ["\n", createVNode(_components.p, {
          children: "Mudroom Lockers"
        }), "\n"]
      }), "\n"]
    }), "\n", createVNode(_components.p, {
      children: "We custom make each sports locker to specifically match the room you are using. If you are interested in purchasing some locker room lockers, give us a call and we will work within your budget to transform your locker room."
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

const url = "src/content/blog/custom-sports-lockers-team.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/custom-sports-lockers-team.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/custom-sports-lockers-team.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

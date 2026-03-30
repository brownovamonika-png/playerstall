import { j as createVNode, F as Fragment, az as __astro_tag_component__ } from './astro/server_BKRL6jPE.mjs';
import 'clsx';

const frontmatter = {
  "title": "Wood Lockers help keep your equipment clean",
  "description": "Wood Lockers help kill sports equipment bacteria   Anyone who plays sports can confirm the need to keep your sports equipment clean and disinfected. Most sports",
  "category": "Maintenance & Care",
  "tags": ["wood-lockers", "equipment-care", "bacteria-prevention"],
  "heroImage": "https://playerstall.b-cdn.net/images/IMG_8092.jpg",
  "datePublished": "2017-10-07",
  "readTime": "3 min read",
  "author": "PlayerStall",
  "wordCount": 414
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
      children: createVNode(_components.strong, {
        children: "Wood Lockers help kill sports equipment bacteria"
      })
    }), "\n", createVNode(_components.p, {
      children: "Anyone who plays sports can confirm the need to keep your sports equipment clean and disinfected. Most sports are intense, high contact activities filled with sweat, blood and dirt. To keep you or your young athlete clean and healthy, here are a few tips when it comes to keeping your sports equipment clean, and healthy:"
    }), "\n", createVNode(_components.p, {
      children: ["Spray your sports equipment after every use. We have a ", createVNode(_components.a, {
        href: "/blog/athletic-lockers-dont-damage-equipment",
        children: "post"
      }), " on how to make your own healthy disinfectant spray at home using common household items free of harsh chemicals. Hang up your equipment in a ", createVNode(_components.strong, {
        children: "sports locker"
      }), " for ease of drying and spraying. ", createVNode(_components.a, {
        href: "/blog",
        children: "Wood lockers"
      }), " are a great way to keep your gear organized and dry!\nSoak your equipment. After a few uses, spraying your equipment won’t do the trick. Take your sports equipment from your sports locker and soak it in water and detergent. You can also put some softer equipment in the washing machine on the gentle cycle.\nGet yourself a wood locker. Of course this is the easiest solution to keep your sports equipment dry and organized! If you are looking for sports lockers for sale, PlayerStall has a large lineup of"]
    }), "\n", createVNode(_components.p, {
      children: ["[caption id=“attachment_442” align=“alignright” width=“200”]", createVNode(_components.img, {
        src: "http://playerstall.com/wp-content/uploads/2016/03/Semi-LU-1-1-200x300.jpg",
        alt: "wood lockers"
      }), " Sports Locker[/caption]"]
    }), "\n", createVNode(_components.p, {
      children: "the best wood lockers in the business. If you are looking for mudroom lockers, hockey lockers, football lockers, or any kind of sports locker, we have you covered."
    }), "\n", createVNode(_components.p, {
      children: ["At PlayerStall, we can help you with your sports equipment storage solutions with our innovative sports locker designs. Don’t go with the other guy’s ", createVNode(_components.em, {
        children: "cheap lockers"
      }), "- check out PlayerStall if you are looking for lockers for sale. Our wood lockers are built to last and at a price nobody can match in the athletic locker business. We started PlayerStall to offer hockey lockers to young athletes and have expanded over the years to provide", createVNode(_components.a, {
        href: "/blog/football-lockers-complete-guide-to-custom-athletic-storage-solutions",
        children: " football lockers"
      }), ", baseball lockers, bedroom lockers, mudroom lockers and any kind of ", createVNode(_components.strong, {
        children: "wood locker"
      }), " you can think of. If you are looking for lockers for sale, we have them! Check out our ", createVNode(_components.a, {
        href: "http://www.facebook.com/playerstallsports/",
        children: "Facebook"
      }), " page to see some of the recent wood locker projects we have done."]
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

const url = "src/content/blog/wood-lockers-help-keep-equipment-clean.mdx";
const file = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/wood-lockers-help-keep-equipment-clean.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "/Users/monikabrownova/Documents/github/player-stall December 19 2025/src/content/blog/wood-lockers-help-keep-equipment-clean.mdx";
__astro_tag_component__(Content, 'astro:jsx');

export { Content, Content as default, file, frontmatter, getHeadings, url };

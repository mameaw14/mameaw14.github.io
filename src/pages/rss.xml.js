import rss from "@astrojs/rss";
import { SITE_DESCRIPTION, SITE_TITLE } from "../config";
import sanitizeHtml from "sanitize-html";
import { getCollection } from "astro:content";

// const parser = new MarkdownIt();

export const get = async () => {
  const blog = await getCollection("exteen");
  // const postImportResult = import.meta.glob("./blog/*.{md}");

  // const posts = Object.values(postImportResult);
  return rss({
    title: SITE_TITLE, description: SITE_DESCRIPTION, site: import.meta.env.SITE, items: [
      // ...posts.map((post) => {
      // console.log("0-1010");

      // return {
      // ...post?.frontmatter, content: sanitizeHtml(post.compiledContent)
      // };
      // }),
      ...blog.splice(0,4).map((post) => {
        let customData = `<category>exteen</category>`;
        if (post.data?.tags) {
          customData += post.data?.tags.map(tag => `<tag>${tag}</tag>`).join("");
          // customData += `<tag>${post.data?.tags.join(',')}</tag>`

        }
        if (post.data?.heroImage) {
          customData += `<image>${post.data?.heroImage}</image>`;
        }
        if (post.data?.updatedDate) {
          customData += `<lastBuildDate>${post.data?.updatedDate}</lastBuildDate>`;
        }
        return {
          link: `/blog/${post.slug}/`,
          content: sanitizeHtml(post.body),
          customData: customData,
          draft: post.data?.draft,

          ...post.data
        };
      })]
  });
};

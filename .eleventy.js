const path = require("path");
const yaml = require("js-yaml");
const image = require("@11ty/eleventy-img");

const imageShortcode = async (imagePath, attrs, thn = false) => {
  const imgMeta = await image(imagePath, {
    filenameFormat: (id, src, w, f) =>
      `${path.basename(src, `.${f}`)}-${id}-${w}.${f}`,
    formats: ["auto"],
    outputDir: "_site/images/",
    widths: [thn ? 150 : 800],
  });

  const attrString = Object.entries(JSON.parse(attrs ?? "{}"))
    .map(([key, value]) => `${key}="${value}"`)
    .join(" ")
    .trim();

  const img = imgMeta[Object.keys(imgMeta)[0]].pop();

  return `<img src="/images/${encodeURIComponent(img.filename)}" ${
    attrString.length ? attrString : ""
  }>`;
};

module.exports = (config) => {
  config.addDataExtension("yaml", (data) => yaml.load(data));
  config.addDataExtension("yml", (data) => yaml.load(data));
  config.addPassthroughCopy("main.css");

  config.addShortcode("project", (link) =>
    path.join(process.env.BASEURL ?? "", link)
  );

  config.addShortcode("image", async (imagePath, attrs) =>
    imageShortcode(imagePath, attrs, false)
  );

  config.addShortcode("thumbnail", async (imagePath, attrs) =>
    imageShortcode(imagePath, attrs, true)
  );

  function extractExcerpt(article) {
    if (!article.hasOwnProperty("templateContent")) {
      console.warn(
        'Failed to extract excerpt: Document has no property "templateContent".'
      );
      return null;
    }

    let excerpt = null;
    const content = article.templateContent;

    excerpt = content
      .replace(/<[^>]*>/g, "")
      .substring(0, 300) // Cap at 200 characters
      .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
      .trim()
      .concat("...");
    return excerpt;
  }

  config.addShortcode("excerpt", extractExcerpt);

  return {
    dir: {
      data: "data",
      includes: "includes",
      output: "_site",
    },
  };
};

const path = require("path");
const yaml = require("js-yaml");
const image = require("@11ty/eleventy-img");

const imageShortcode = async (imagePath, alt, caption, width) => {
  const imgMeta = await image(imagePath, {
    filenameFormat: (id, src, w, f) =>
      `${path.basename(src, `.${f}`)}-${id}-${w}.${f}`,
    formats: ["auto"],
    outputDir: "_site/images/",
    widths: [width],
  });

  const img = imgMeta[Object.keys(imgMeta)[0]].pop();
  const imgHtml = `<img src="/images/${encodeURIComponent(
    img.filename
  )}" alt="${alt}">`;

  if (caption) {
    return `<figure>${imgHtml}<figcaption>${caption}</figcaption></figure>`;
  } else {
    return imgHtml;
  }
};

module.exports = (config) => {
  config.addDataExtension("yaml", (data) => yaml.load(data));
  config.addDataExtension("yml", (data) => yaml.load(data));
  config.addPassthroughCopy("main.css");

  config.addShortcode("project", (link) =>
    path.join(process.env.BASEURL ?? "", link)
  );

  config.addShortcode("image", async (imagePath, alt, caption) =>
    imageShortcode(imagePath, alt, caption, 800)
  );

  config.addShortcode("thumbnail", async (imagePath, alt, caption) =>
    imageShortcode(imagePath, alt, caption, 150)
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

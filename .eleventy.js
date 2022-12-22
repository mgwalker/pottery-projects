const path = require("path");
const yaml = require("js-yaml");

module.exports = (config) => {
  config.addLiquidShortcode("project", (link) =>
    path.join(process.env.BASEURL ?? "", link)
  );

  config.addDataExtension("yaml", (data) => yaml.load(data));
  config.addDataExtension("yml", (data) => yaml.load(data));
  config.addPassthroughCopy("main.css");

  return {
    dir: {
      data: "data",
      includes: "includes",
      output: "_site",
    },
  };
};

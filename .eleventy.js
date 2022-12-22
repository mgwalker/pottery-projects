const path = require("path");
const yaml = require("js-yaml");

module.exports = (config) => {
  config.addLiquidShortcode("project", (link) =>
    path.join(process.env.BASEURL ?? "", link)
  );

  config.addDataExtension("yaml", (data) => yaml.load(data));
  config.addDataExtension("yml", (data) => yaml.load(data));

  return {
    dir: {
      data: "data",
      includes: "includes",
      output: "docs",
    },
  };
};

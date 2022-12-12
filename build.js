import { readFile, writeFile } from "fs/promises";
import { load } from "js-yaml";
import Mustache from "mustache";

const { projects } = load(await readFile("projects.yml"));

const status = new Map([
  ["current", { name: "In-progress", children: [], minor: [] }],
  ["done", { name: "Complete", children: [] }],
  ["future", { name: "Thinking about", children: [] }],
  ["glazed", { name: "Glazed", children: [] }],
  ["bisqued", { name: "Bisque-fired", children: [] }],
  ["cleaned", { name: "Cleaned/trimmed", children: [] }],
  ["built", { name: "Constructed", children: [] }],
]);

const data = {
  major: [status.get("current"), status.get("done"), status.get("future")],
};

status.get("current").minor.push(status.get("glazed"));
status.get("current").minor.push(status.get("bisqued"));
status.get("current").minor.push(status.get("cleaned"));
status.get("current").minor.push(status.get("built"));

projects.forEach((project) => {
  if (project.step) {
    status.get(project.step).children.push(project);
  } else {
    status.get("future").children.push(project);
  }
});

for (const [, { children }] of status) {
  if (children.length > 0) {
    children[0].first = true;
    children[children.length - 1].last = true;
  }
}

const template = await readFile("index.mustache", { encoding: "utf-8" });
const html = Mustache.render(template, data);

await writeFile("docs/index.html", html, { encoding: "utf-8" });

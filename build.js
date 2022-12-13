import { readFile, writeFile } from "fs/promises";
import MarkdownIt from "markdown-it";
import { format } from "prettier";

const md = new MarkdownIt();
const file = await readFile("projects.md", { encoding: "utf-8" });
const content = md.render(file);

const template = await readFile("index.template", { encoding: "utf-8" });
const html = template.replace("{{ content }}", content);
await writeFile("docs/index.html", format(html, { parser: "html" }));

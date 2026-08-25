import { DOMParser, type Element, type Node } from "@b-fuze/deno-dom";

const BASE_URL = "https://projecteuler.net";

const ELEMENT_NODE = 1;
const TEXT_NODE = 3;

const collapseWhitespace = (text: string) => text.replace(/\s+/g, " ");

const resolveUrl = (url: string) =>
  /^([a-z]+:)?\/\//i.test(url) ? url : `${BASE_URL}/${url.replace(/^\//, "")}`;

const childNodesOf = (el: Element) => Array.from(el.childNodes) as Node[];

// Underscores/carets/asterisks inside $...$ are LaTeX, not markdown emphasis - never escape them.
const convertInline = (node: Node): string => {
  if (node.nodeType === TEXT_NODE) return collapseWhitespace(node.textContent ?? "");
  if (node.nodeType !== ELEMENT_NODE) return "";

  const el = node as Element;
  const tag = el.tagName.toLowerCase();
  const inlineChildren = () => childNodesOf(el).map(convertInline).join("");

  switch (tag) {
    case "br":
      return "\n\n";
    case "b":
    case "strong":
      return `**${inlineChildren()}**`;
    case "i":
    case "em":
      return `_${inlineChildren()}_`;
    case "code":
      return `\`${el.textContent}\``;
    case "sup":
      return `^${inlineChildren()}^`;
    case "sub":
      return `~${inlineChildren()}~`;
    case "a":
      return `[${inlineChildren()}](${resolveUrl(el.getAttribute("href") ?? "")})`;
    case "img":
      return `![${el.getAttribute("alt") ?? ""}](${resolveUrl(el.getAttribute("src") ?? "")})`;
    default:
      return inlineChildren();
  }
};

const asParagraphs = (text: string): string =>
  text.split("\n\n").map(part => collapseWhitespace(part).trim()).filter(Boolean).join("\n\n");

const convertList = (el: Element, ordered: boolean): string =>
  childNodesOf(el)
    .filter((node): node is Element => node.nodeType === ELEMENT_NODE && (node as Element).tagName.toLowerCase() === "li")
    .map((item, index) => `${ordered ? `${index + 1}.` : "-"} ${childNodesOf(item).map(convertInline).join("").trim()}`)
    .join("\n");

const convertTable = (el: Element): string => {
  const rows = Array.from(el.querySelectorAll("tr")) as Element[];
  if (rows.length === 0) return "";

  const cellsOf = (row: Element) =>
    (Array.from(row.querySelectorAll("th, td")) as Element[])
      .map(cell => childNodesOf(cell).map(convertInline).join("").trim());

  const [headerRow, ...bodyRows] = rows;
  const header = cellsOf(headerRow);
  const lines = [header, header.map(() => "---"), ...bodyRows.map(cellsOf)];

  return lines.map(cells => `| ${cells.join(" | ")} |`).join("\n");
};

const convertBlock = (node: Node): string => {
  if (node.nodeType === TEXT_NODE) return collapseWhitespace(node.textContent ?? "").trim();
  if (node.nodeType !== ELEMENT_NODE) return "";

  const el = node as Element;
  const tag = el.tagName.toLowerCase();

  switch (tag) {
    case "p":
    case "div":
    case "center":
      return asParagraphs(childNodesOf(el).map(convertInline).join(""));
    case "ul":
      return convertList(el, false);
    case "ol":
      return convertList(el, true);
    case "table":
      return convertTable(el);
    case "blockquote":
      return childNodesOf(el)
        .map(convertBlock)
        .filter(Boolean)
        .join("\n\n")
        .split("\n")
        .map(line => `> ${line}`)
        .join("\n");
    case "h1":
    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return `${"#".repeat(Number(tag[1]))} ${childNodesOf(el).map(convertInline).join("").trim()}`;
    default:
      return childNodesOf(el).map(convertBlock).filter(Boolean).join("\n\n");
  }
};

export const htmlToMarkdown = (html: string): string => {
  const document = new DOMParser().parseFromString(html, "text/html");
  if (!document?.body) throw new Error("Failed to parse HTML");

  const blocks = childNodesOf(document.body).map(convertBlock).map(block => block.trim()).filter(Boolean);

  return `${blocks.join("\n\n")}\n`;
};

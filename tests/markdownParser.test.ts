import { parseMarkdown } from "../src/utils/markdownParser";
import { expect, jest, test, describe, it } from "@jest/globals";

describe("Markdown Parser", () => {
    it("Parses headings correctly", () => {
        const markdown =
            "# Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6";
        const expected =
            "<h1>Heading 1</h1>\n<h2>Heading 2</h2>\n<h3>Heading 3</h3>\n<h4>Heading 4</h4>\n<h5>Heading 5</h5>\n<h6>Heading 6</h6>";
        expect(parseMarkdown(markdown)).toBe(expected);
    });

    it("Parses bold text", () => {
        const markdown = "This is **bold**";
        const expected = "<p>This is <strong>bold</strong></p>";
        expect(parseMarkdown(markdown).trim()).toBe(expected);
    });

    it("Parses italic text", () => {
        const markdown = "This is *italic*";
        const expected = "<p>This is <em>italic</em></p>";
        expect(parseMarkdown(markdown).trim()).toBe(expected);
    });

    it("Parses text that is both bold and italic", () => {
        const markdown = "This is ***bold and italic***";
        const expected =
            "<p>This is <strong><em>bold and italic</em></strong></p>";
        expect(parseMarkdown(markdown).trim()).toBe(expected);
    });

    it("Parses lists", () => {
        const markdown = "- Item 1\n- Item 2";
        const expected = "<li>Item 1</li>\n<li>Item 2</li>";
        expect(parseMarkdown(markdown).trim()).toBe(expected);
    });

    it("Parses links", () => {
        const markdown = "Go to [Google](https://www.google.com)";
        const expected =
            "<p>Go to <a href='https://www.google.com'>Google</a></p>";
        expect(parseMarkdown(markdown).trim()).toBe(expected);
    });
});

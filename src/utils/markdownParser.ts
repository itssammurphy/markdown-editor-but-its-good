export function parseMarkdown(markdown: string): string {
    const lines = markdown.split("\n");
    const htmlLines = lines.map((line) => parseLine(line));
    return htmlLines.join("\n");
}

function parseLine(line: string): string {
    // Headings support
    if (line.startsWith("###### ")) {
        return `<h6>${line.slice(7)}</h6>`;
    }
    if (line.startsWith("##### ")) {
        return `<h5>${line.slice(6)}</h5>`;
    }
    if (line.startsWith("#### ")) {
        return `<h4>${line.slice(5)}</h4>`;
    }
    if (line.startsWith("### ")) {
        return `<h3>${line.slice(4)}</h3>`;
    }
    if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`;
    }
    if (line.startsWith("# ")) {
        return `<h1>${line.slice(2)}</h1>`;
    }

    // Lists support
    if (line.startsWith("- ")) {
        return `<li>${line.slice(2)}</li>`;
    }

    // Inline formatting - bold, italic, underline, links
    let formattedLine = line;

    // Bold + italic ***text***
    formattedLine = formattedLine.replace(
        /\*\*\*(.*?)\*\*\*/g,
        "<strong><em>$1</em></strong>",
    );

    // Bold **text**
    formattedLine = formattedLine.replace(
        /\*\*(.*?)\*\*/g,
        "<strong>$1</strong>",
    );

    // Italic *text*
    formattedLine = formattedLine.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Links [text](url)
    formattedLine = formattedLine.replace(
        /\[(.*?)\]\((.*?)\)/g,
        "<a href='$2'>$1</a>",
    );

    return `<p>${formattedLine}</p>`;
}

import {
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");
const contentDirectory = path.join(repoRoot, "src", "content");
const publicDirectory = path.join(repoRoot, "public");
const generatedDirectory = path.join(repoRoot, "src", "generated");
const outputFile = path.join(generatedDirectory, "blog-content.ts");

const REQUIRED_FIELDS = [
  "title",
  "subtitle",
  "date",
  "author",
  "slug",
  "description",
  "coverImage",
];

function toPosixPath(value) {
  return value.replace(/\\/g, "/");
}

function escapeImportPath(value) {
  return value.replace(/\\/g, "/");
}

function parseValue(value) {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (/^-?\d+$/.test(trimmed)) {
    return Number.parseInt(trimmed, 10);
  }

  return trimmed;
}

function parseFrontmatter(fileContent, filePath) {
  const normalizedContent = fileContent.replace(/^\uFEFF/, "");

  if (!normalizedContent.startsWith("---")) {
    throw new Error(`${filePath} is missing frontmatter.`);
  }

  const frontmatterMatch = normalizedContent.match(
    /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/,
  );

  if (!frontmatterMatch || frontmatterMatch.index !== 0) {
    throw new Error(`${filePath} has an unterminated frontmatter block.`);
  }

  const frontmatterBlock = frontmatterMatch[1];
  const body = normalizedContent.slice(frontmatterMatch[0].length).trimStart();
  const lines = frontmatterBlock.split(/\r?\n/);
  const data = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!line.trim()) {
      continue;
    }

    const listItemMatch = line.match(/^\s*-\s+/);

    if (listItemMatch) {
      throw new Error(
        `${filePath} has a list item without a parent key in frontmatter.`,
      );
    }

    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      throw new Error(`${filePath} has an invalid frontmatter line: ${line}`);
    }

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1);

    if (!rawValue.trim()) {
      const items = [];

      while (index + 1 < lines.length && /^\s*-\s+/.test(lines[index + 1])) {
        index += 1;
        items.push(lines[index].replace(/^\s*-\s+/, "").trim());
      }

      data[key] = items;
      continue;
    }

    data[key] = parseValue(rawValue);
  }

  return { data, body };
}

function assertRequiredFields(frontmatter, filePath) {
  for (const field of REQUIRED_FIELDS) {
    const value = frontmatter[field];

    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(
        `${filePath} is missing required frontmatter field "${field}".`,
      );
    }
  }
}

function assertIsoDate(value, filePath) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(
      `${filePath} has an invalid date "${value}". Use YYYY-MM-DD.`,
    );
  }
}

function assertPublicAssetExists(assetPath, filePath, fieldName) {
  if (!assetPath.startsWith("/")) {
    throw new Error(
      `${filePath} has a non-public ${fieldName} path "${assetPath}". Use /... from public.`,
    );
  }

  const resolvedPath = path.join(publicDirectory, assetPath.slice(1));

  if (!existsSync(resolvedPath)) {
    throw new Error(
      `${filePath} references missing ${fieldName} asset "${assetPath}".`,
    );
  }
}

function assertMarkdownAssetsExist(body, filePath) {
  const imageMatches = [...body.matchAll(/!\[[^\]]*]\(([^)]+)\)/g)];

  for (const match of imageMatches) {
    const imagePath = match[1]?.trim();

    if (!imagePath || !imagePath.startsWith("/")) {
      continue;
    }

    assertPublicAssetExists(imagePath, filePath, "markdown image");
  }
}

function assertSlug(slug, filePath) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error(
      `${filePath} has invalid slug "${slug}". Use lowercase kebab-case.`,
    );
  }
}

function normalizeTags(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(
    (tag) => typeof tag === "string" && tag.trim().length > 0,
  );
}

function sortPosts(left, right) {
  // Featured posts always come first
  if (left.featured !== right.featured) {
    return left.featured ? -1 : 1;
  }

  // Date descending: newest first (primary sort)
  const dateDiff = right.date.localeCompare(left.date);
  if (dateDiff !== 0) return dateDiff;

  // sortOrder as tiebreaker only when dates are equal
  return left.sortOrder - right.sortOrder;
}

function buildGeneratedFile(posts) {
  const importLines = posts.map((post, index) => {
    const importPath = `@/content/${escapeImportPath(post.fileName)}?raw`;
    return `import blogContent${index} from ${JSON.stringify(importPath)};`;
  });

  const entries = posts.map((post, index) => {
    return `  {
    title: ${JSON.stringify(post.title)},
    subtitle: ${JSON.stringify(post.subtitle)},
    date: ${JSON.stringify(post.date)},
    author: ${JSON.stringify(post.author)},
    slug: ${JSON.stringify(post.slug)},
    description: ${JSON.stringify(post.description)},
    coverImage: ${JSON.stringify(post.coverImage)},
    featured: ${post.featured},
    draft: ${post.draft},
    sortOrder: ${post.sortOrder},
    tags: ${JSON.stringify(post.tags)},
    sourceFile: ${JSON.stringify(post.sourceFile)},
    content: blogContent${index},
  }`;
  });

  return `${importLines.join("\n")}

export interface BlogPostRecord {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  slug: string;
  description: string;
  coverImage: string;
  featured: boolean;
  draft: boolean;
  sortOrder: number;
  tags: string[];
  sourceFile: string;
  content: string;
}

export const blogPosts: BlogPostRecord[] = [
${entries.join(",\n")}
];

export const publishedBlogPosts = blogPosts.filter((post) => !post.draft);

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostRecord>;
`;
}

function collectPosts() {
  const markdownFiles = readdirSync(contentDirectory)
    .filter((entry) => entry.endsWith(".md") && !entry.startsWith("_"))
    .sort((left, right) => left.localeCompare(right));

  const posts = markdownFiles.map((fileName) => {
    const absoluteFilePath = path.join(contentDirectory, fileName);
    const sourceFile = toPosixPath(path.join("src", "content", fileName));
    const fileContent = readFileSync(absoluteFilePath, "utf8");
    const { data, body } = parseFrontmatter(fileContent, sourceFile);

    assertRequiredFields(data, sourceFile);
    assertIsoDate(data.date, sourceFile);
    assertSlug(data.slug, sourceFile);
    assertPublicAssetExists(data.coverImage, sourceFile, "coverImage");
    assertMarkdownAssetsExist(body, sourceFile);

    return {
      fileName,
      sourceFile,
      title: data.title,
      subtitle: data.subtitle,
      date: data.date,
      author: data.author,
      slug: data.slug,
      description: data.description,
      coverImage: data.coverImage,
      featured: data.featured === true,
      draft: data.draft === true,
      sortOrder: typeof data.sortOrder === "number" ? data.sortOrder : 999,
      tags: normalizeTags(data.tags),
    };
  });

  const duplicateSlugs = posts
    .map((post) => post.slug)
    .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);

  if (duplicateSlugs.length > 0) {
    throw new Error(`Duplicate blog slugs found: ${duplicateSlugs.join(", ")}`);
  }

  return posts.sort(sortPosts);
}

function main() {
  const posts = collectPosts();
  const fileContents = buildGeneratedFile(posts);

  mkdirSync(generatedDirectory, { recursive: true });
  writeFileSync(outputFile, `${fileContents}\n`, "utf8");
  console.log(
    `Generated ${path.relative(repoRoot, outputFile)} for ${posts.length} post(s) from the current src/content state.`,
  );
}

main();

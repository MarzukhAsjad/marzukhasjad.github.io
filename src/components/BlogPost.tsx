import React, { useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import mermaid from "mermaid";
import "highlight.js/styles/github-dark.css";
import QuizComponent from "@/components/QuizComponent";
import { formatBlogDate, stripFrontmatter } from "@/lib/blog";

interface BlogProps {
  title: string;
  subtitle: string;
  content: string;
  author: string;
  date: string;
  coverImage: string;
  tags: string[];
}

let mermaidIsInitialized = false;

const MermaidBlock: React.FC<{ chart: string }> = ({ chart }) => {
  const rawId = useId();
  const [view, setView] = useState<"diagram" | "code">("diagram");
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const chartId = useMemo(
    () => `mermaid-${rawId.replace(/[^a-zA-Z0-9_-]/g, "")}`,
    [rawId],
  );

  useEffect(() => {
    let cancelled = false;

    const render = async () => {
      if (!mermaidIsInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "loose",
          theme: "dark",
          flowchart: {
            htmlLabels: true,
          },
        });
        mermaidIsInitialized = true;
      }

      try {
        const { svg: renderedSvg } = await mermaid.render(chartId, chart);
        if (!cancelled) {
          setSvg(renderedSvg);
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to render Mermaid diagram. Please check syntax.");
        }
      }
    };

    void render();

    return () => {
      cancelled = true;
    };
  }, [chart, chartId]);

  return (
    <div className="mb-6 rounded-lg border border-cyan-800/50 bg-slate-900/70 p-3 sm:p-4">
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          className={`rounded-md px-3 py-1 text-xs font-mono transition-colors ${
            view === "diagram"
              ? "bg-cyan-500 text-slate-950"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
          }`}
          onClick={() => setView("diagram")}
        >
          Diagram
        </button>
        <button
          type="button"
          className={`rounded-md px-3 py-1 text-xs font-mono transition-colors ${
            view === "code"
              ? "bg-cyan-500 text-slate-950"
              : "bg-slate-800 text-slate-200 hover:bg-slate-700"
          }`}
          onClick={() => setView("code")}
        >
          Code
        </button>
      </div>

      {view === "diagram" ? (
        error ? (
          <p className="text-sm text-red-300">{error}</p>
        ) : (
          <div
            className="overflow-x-auto rounded-md bg-slate-950 p-3 [&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )
      ) : (
        <pre className="overflow-x-auto rounded-md bg-slate-950 p-3 text-xs text-cyan-200 sm:text-sm">
          <code>{chart}</code>
        </pre>
      )}
    </div>
  );
};

const BlogPost: React.FC<BlogProps> = ({
  title,
  subtitle,
  content,
  author,
  date,
  coverImage,
  tags,
}) => {
  const codeComponent: Components["code"] = ({
    className,
    children,
    ...props
  }) => {
    const match = /language-(\w+)/.exec(className || "");
    const inline = !match;

    if (!inline && match?.[1] === "mermaid") {
      return <MermaidBlock chart={String(children).replace(/\n$/, "")} />;
    }

    return !inline ? (
      <div className="mb-4 text-left">
        <pre className="bg-gray-900 text-green-400 p-2 sm:p-4 rounded-lg overflow-x-auto text-left">
          <code className={`${className} text-xs sm:text-sm`} {...props}>
            {children}
          </code>
        </pre>
      </div>
    ) : (
      <code
        className="bg-gray-700 text-green-300 px-1 py-0.5 rounded text-xs sm:text-sm"
        {...props}
      >
        {children}
      </code>
    );
  };

  // Function to process markdown content and extract quizzes
  const processContent = (content: string) => {
    const parts: React.ReactElement[] = [];
    const sections = content.split(/\\quiz_start[\s\S]*?\\quiz_end/);
    const quizMatches = content.match(/\\quiz_start[\s\S]*?\\quiz_end/g);

    sections.forEach((section, index) => {
      // Add regular markdown content
      if (section.trim()) {
        parts.push(
          <ReactMarkdown
            key={`content-${index}`}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-4xl font-bold mb-4 text-pink-300 font-serif text-left">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-semibold mb-3 text-green-500 font-mono text-center">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-semibold mb-2 text-blue-400 font-mono text-left">
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p className="font-inter text-gray-200 mb-4 text-left leading-relaxed">
                  {children}
                </p>
              ),
              a: ({ href, children }) => {
                const isExternal = href?.startsWith("http");

                return (
                  <a
                    href={href}
                    className="text-yellow-300 underline underline-offset-4 decoration-yellow-400 hover:text-yellow-200 transition-colors"
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {children}
                  </a>
                );
              },
              h4: ({ children }) => (
                <h4 className="text-lg font-medium mb-4 text-gray-400 text-center italic">
                  {children}
                </h4>
              ),
              h5: ({ children }) => (
                <h5 className="text-base font-semibold mb-3 text-purple-300 text-left">
                  {children}
                </h5>
              ),
              strong: ({ children }) => (
                <strong className="font-bold text-white">{children}</strong>
              ),
              code: codeComponent,
              ul: ({ children }) => (
                <ul className="list-disc list-inside text-gray-200 mb-4 text-left">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-outside ml-6 text-gray-200 mb-4 text-left">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="mb-1 text-left pl-2">{children}</li>
              ),
              img: ({ src, alt }) => {
                // Parse width from alt text if specified in format: alt text {width: w-100}
                const validWidths: { [key: string]: string } = {
                  "w-50": "w-50",
                  "w-75": "w-75",
                  "w-100": "w-100",
                  "w-150": "w-150",
                  "w-200": "w-200",
                  "w-32": "w-32",
                  "w-64": "w-64",
                  "w-96": "w-96",
                  "w-full": "w-full",
                  "w-1/2": "w-1/2",
                  "w-1/3": "w-1/3",
                  "w-2/3": "w-2/3",
                };

                let width = "w-150"; // default
                let cleanAlt = alt || "";

                if (alt && alt.includes("{width:")) {
                  const widthMatch = alt.match(/\{width:\s*([^}]+)\}/);
                  if (widthMatch && widthMatch[1]) {
                    const requestedWidth = widthMatch[1].trim();
                    width = validWidths[requestedWidth] || "w-150";
                    cleanAlt = alt.replace(/\{width:\s*[^}]+\}/, "").trim();
                  }
                }

                return (
                  <div className="flex flex-col items-center mb-4">
                    <img
                      src={src}
                      alt={cleanAlt}
                      className={`rounded-2xl ${width} h-auto mb-2`}
                    />
                    <caption className="text-gray-500 text-sm text-center">
                      {cleanAlt}
                    </caption>
                  </div>
                );
              },
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-yellow-500 bg-yellow-900/20 pl-4 pr-4 py-3 rounded-r-lg italic text-yellow-200 mb-4 font-mono text-center [&>p]:mb-0 [&>p]:text-center [&>p]:font-mono [&>p]:italic">
                  {children}
                </blockquote>
              ),
            }}
          >
            {section}
          </ReactMarkdown>,
        );
      }

      // Add quiz component if there's a quiz match
      if (quizMatches && quizMatches[index]) {
        parts.push(
          <QuizComponent key={`quiz-${index}`} content={quizMatches[index]} />,
        );
      }
    });

    return parts;
  };

  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <header className="mb-8">
          <Link
            to="/blog"
            className="mt-4 text-sm sm:text-lg !text-yellow-400 font-mono mb-4 inline-block hover:!text-yellow-600 transition-colors"
          >
            ← Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-pink-300 font-serif">
            {title}
          </h1>
          <TypingAnimation
            duration={50}
            className="mt-4 text-sm sm:text-lg font-mono"
            as={"header"}
          >
            {subtitle}
          </TypingAnimation>
        </header>

        <div className="space-y-8">
          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex justify-center mb-6">
              <img
                src={coverImage}
                alt={title}
                className="rounded-2xl w-150 max-w-full h-auto"
              />
            </div>
            {processContent(stripFrontmatter(content))}

            <div className="flex flex-col gap-3 text-sm text-gray-500 mt-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center">
                <span>{author}</span>
                <span className="mx-2">•</span>
                <span>{formatBlogDate(date)}</span>
              </div>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-gray-600 px-3 py-1 text-xs uppercase tracking-wide text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

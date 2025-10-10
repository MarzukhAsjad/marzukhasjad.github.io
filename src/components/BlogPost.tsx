import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import QuizComponent from "@/components/QuizComponent";

interface BlogProps {
  content: string;
}

const BlogPost: React.FC<BlogProps> = ({ content }) => {
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
              code: ({ node, className, children, ...props }: any) => {
                const match = /language-(\w+)/.exec(className || "");
                const inline = !match;
                return !inline ? (
                  <div className="mb-4 text-left">
                    <pre className="bg-gray-900 text-green-400 p-2 sm:p-4 rounded-lg overflow-x-auto text-left">
                      <code
                        className={`${className} text-xs sm:text-sm`}
                        {...props}
                      >
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
              },
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
          </ReactMarkdown>
        );
      }

      // Add quiz component if there's a quiz match
      if (quizMatches && quizMatches[index]) {
        parts.push(
          <QuizComponent key={`quiz-${index}`} content={quizMatches[index]} />
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
            ← Back to Blogs
          </Link>
          <h1 className="text-4xl font-bold mb-2 text-pink-300 font-serif">
            Blog
          </h1>
          <TypingAnimation
            duration={50}
            className="mt-4 text-sm sm:text-lg font-mono"
            as={"header"}
          >
            {"Dumping thoughts, tutorials, and insights..."}
          </TypingAnimation>
        </header>

        <div className="space-y-8">
          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            {processContent(content)}

            <div className="flex items-center text-sm text-gray-500 mt-6">
              <span>Marzukh Akib Asjad</span>
              <span className="mx-2">•</span>
              <span>09/10/2025</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;

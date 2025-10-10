import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";

const Blog = () => {
  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
        <header className="mb-8">
          <Link
            to="/"
            className="mt-4 text-sm sm:text-lg !text-yellow-400 font-mono mb-4 inline-block hover:!text-yellow-600 transition-colors"
          >
            ← Back to Home
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
            <div className="text-gray-300">
              This will contain post tiles, clicking them will redirect to the
              specific post. The tiles will have a title, sub-title, image
              preview, a short description, author and the created date
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};
export default Blog;

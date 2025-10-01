import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="container mx-auto px-4 py-8">
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
            <h2 className="text-2xl font-semibold mb-3 text-green-500 font-mono">
              Secure modularised microservices with webhooks communication
            </h2>
            <p className="text-gray-400 mb-4 font-mono">
              How to communicate using webhooks between REST API based
              microservices while maintaining simplicity, security and
              modularity.
            </p>
            <div className="flex justify-center mb-4">
              <img
                src="/webhook_post_image.png"
                alt="Webhooks"
                className="rounded-2xl w-100 h-auto"
              />
            </div>
            <caption className="flex justify-center text-gray-500 text-sm mb-4">
              Webhooks communication between microservices
            </caption>
            <div className="flex items-center text-sm text-gray-500">
              <span>Marzukh Akib Asjad</span>
              <span className="mx-2">•</span>
              <span>Coming Soon</span>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default Blog;

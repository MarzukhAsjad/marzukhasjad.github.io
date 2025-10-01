import React from "react";
import { Link } from "react-router-dom";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <Link
            to="/"
            className="text-blue-400 hover:text-blue-300 mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-2">Blog</h1>
          <p className="text-gray-400">Thoughts, tutorials, and insights</p>
        </header>

        <div className="space-y-8">
          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Coming Soon: My First Blog Post
            </h2>
            <p className="text-gray-300 mb-4">
              Stay tuned for upcoming articles about software engineering,
              full-stack development, and my journey building scalable
              applications.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Marzukh Akib Asjad</span>
              <span className="mx-2">•</span>
              <span>Coming Soon</span>
            </div>
          </article>

          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              Building Modern Web Applications
            </h2>
            <p className="text-gray-300 mb-4">
              Exploring the latest trends in React, TypeScript, and cloud
              deployment strategies for enterprise-grade applications.
            </p>
            <div className="flex items-center text-sm text-gray-500">
              <span>Marzukh Akib Asjad</span>
              <span className="mx-2">•</span>
              <span>Coming Soon</span>
            </div>
          </article>

          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-2xl font-semibold mb-3 text-white">
              From Fintech to EdTech: Lessons Learned
            </h2>
            <p className="text-gray-300 mb-4">
              Insights from building production systems at Rabbit Credit and
              co-founding Examify - the challenges and victories along the way.
            </p>
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

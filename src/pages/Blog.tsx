import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import BlogPreview from "@/components/BlogPreview";

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
        <article className="bg-gray-800 rounded-lg p-6 border border-gray-700 flex justify-center">
          <div className="space-y-8 w-175 mt-4">
            {/* Featured Blog Post */}
            <BlogPreview
              title="Secure modularised microservices with webhooks communication"
              subtitle="How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity."
              imageUrl="/blog1/webhook_post_image.png"
              description="Microservices are super beneficial for a large company, with a large subdivided team. But for a small-medium sized company with 2 to 5 developers, it can be a dilemma. Do you go with them because the trend nowadays is spinning microservices? For instance, a friend of mine works with a personal credit lender firm and they have at least 9 microservices, one of which is literally adding 2 and 3 but on a slightly larger scale."
              slug="secure-modularised-microservices-with-webhooks-communication"
              author="Marzukh Akib Asjad"
              createdDate="10/10/2025"
              featured={true}
            />

            {/* More Blog Posts Coming Soon */}
            <div className="text-center">
              <h3 className="text-2xl font-mono font-semibold text-white mb-6 mt-12">
                More Posts Coming Soon
              </h3>
              <p className="text-gray-300 text-lg font-inter">
                I'm working on more exciting blog posts about software
                development, entrepreneurship, tech insights, and my programming
                journey. So check back soon!
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
export default Blog;

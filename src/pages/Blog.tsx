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
              createdDate="09/10/2025"
              featured={true}
            />

            {/* More Blog Posts Coming Soon */}
            <div className="text-center">
              <h3 className="text-2xl font-mono font-semibold text-white mb-6 mt-12">
                Check out my other post!
              </h3>
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 items-center justify-center">
                <BlogPreview
                  title="B2C success is about customer convenience"
                  subtitle="B2C success hinges on customer convenience: seamless WhatsApp AI chat, quick on-boarding, and precise guidance driving rapid 3k+ user growth in 3 months."
                  imageUrl="/blog2/convenience_affects_b2c.png"
                  description="As the co-founder of an ed-tech startup, I’ve seen firsthand how focusing on customers’ convenience drives success in the B2C (Business to Consumers) space. It really surprised me that nowadays, no one wants to go to a website, click a link, download an app, create their profile on the app, sign up through an external auth provider, be rerouted back to the website to pay, do 10 other steps to be finally onboarded onto the app."
                  slug="b2c-success-hinges-on-customer-convenience"
                  author="Marzukh Akib Asjad"
                  createdDate="15/07/2025"
                  featured={false}
                />
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
export default Blog;

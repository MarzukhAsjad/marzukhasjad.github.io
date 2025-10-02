import React from "react";
import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";

const Blog: React.FC = () => {
  return (
    <div className="min-h-screen bg-purple-950 text-white">
      <div className="container mx-auto px-30 py-8">
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
                className="rounded-2xl w-150 h-auto"
              />
            </div>
            <caption className="flex justify-center text-gray-500 text-sm mb-4">
              Webhooks communication between microservices
            </caption>
            <p className="text-gray-200 mb-4 text-justify">
              When your company starts to grow, so does the complexity of your
              systems and naturally, you will end up with having some
              microservices. If you created one API, and are currently serving
              less than 1000 users, and if you have some microservices for your
              single programming language/framework API, then nah, microservices
              are not worth it. But sometimes, even for a small user base, you
              happen to have some microservices built in completely different
              frameworks for different use cases. In my company for example, we
              have one microservice that handles customer enquiry reports,
              talking with third party services, and managing these reports,
              let's call it the credit enquiry service. We also have another
              microservice that is used internally by our operations team, i.e,
              the loan management system. These two systems are built in two
              different frameworks. The credit enquiry service is built with
              Java Spring Boot, whereas the loan management system is built with
              Node.js. I am not going to discuss the pros and cons of
              microservices here, but one of the challenges you will face is how
              to make these microservices communicate with each other.
            </p>
            <p className="text-gray-200 mb-4 text-justify">
              With any large system, we have to take some assumptions.
            </p>
            <p className="text-gray-200 mb-1 text-justify">
              1. These microservices are not allowed to directly access each
              other's database.
            </p>
            <p className="text-gray-200 mb-1 text-justify">
              2. They are REST API based.
            </p>
            <p className="text-gray-200 mb-1 text-justify">
              3. Your distributed system does not handle excessively large
              traffic, like in the scale of millions of requests per second
              (even then it would technically be fine but requires further
              optimisations).
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

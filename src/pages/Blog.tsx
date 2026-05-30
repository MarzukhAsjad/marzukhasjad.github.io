import { Link } from "react-router-dom";
import { TypingAnimation } from "@/components/magicui/terminal";
import BlogPreview from "@/components/BlogPreview";
import { publishedBlogPosts } from "@/generated/blog-content";
import { formatBlogDate } from "@/lib/blog";

const Blog = () => {
  const featuredPost =
    publishedBlogPosts.find((post) => post.featured) ?? publishedBlogPosts[0];
  const secondaryPosts = publishedBlogPosts.filter(
    (post) => post.slug !== featuredPost?.slug,
  );
  const leftLanePosts = secondaryPosts.filter((_, index) => index % 2 === 0);
  const rightLanePosts = secondaryPosts.filter((_, index) => index % 2 === 1);

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
            {featuredPost ? (
              <BlogPreview
                title={featuredPost.title}
                subtitle={featuredPost.subtitle}
                imageUrl={featuredPost.coverImage}
                description={featuredPost.description}
                slug={featuredPost.slug}
                author={featuredPost.author}
                createdDate={formatBlogDate(featuredPost.date)}
                featured={featuredPost.featured}
              />
            ) : null}

            {secondaryPosts.length > 0 ? (
              <div className="text-center">
                <h3 className="text-2xl font-mono font-semibold text-white mb-6 mt-12">
                  Check out my other posts!
                </h3>
                <div className="space-y-8 xl:hidden">
                  {secondaryPosts.map((post) => (
                    <BlogPreview
                      key={post.slug}
                      title={post.title}
                      subtitle={post.subtitle}
                      imageUrl={post.coverImage}
                      description={post.description}
                      slug={post.slug}
                      author={post.author}
                      createdDate={formatBlogDate(post.date)}
                      featured={post.featured}
                    />
                  ))}
                </div>

                <div className="hidden xl:grid xl:grid-cols-2 xl:gap-8 xl:items-start">
                  <div className="flex flex-col gap-8">
                    {leftLanePosts.map((post) => (
                      <BlogPreview
                        key={`left-${post.slug}`}
                        title={post.title}
                        subtitle={post.subtitle}
                        imageUrl={post.coverImage}
                        description={post.description}
                        slug={post.slug}
                        author={post.author}
                        createdDate={formatBlogDate(post.date)}
                        featured={post.featured}
                      />
                    ))}
                  </div>

                  <div className="flex flex-col gap-8">
                    {rightLanePosts.map((post) => (
                      <BlogPreview
                        key={`right-${post.slug}`}
                        title={post.title}
                        subtitle={post.subtitle}
                        imageUrl={post.coverImage}
                        description={post.description}
                        slug={post.slug}
                        author={post.author}
                        createdDate={formatBlogDate(post.date)}
                        featured={post.featured}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </div>
  );
};
export default Blog;

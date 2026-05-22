import { Link, useParams } from "react-router-dom";
import BlogPost from "@/components/BlogPost";
import { blogPostsBySlug } from "@/generated/blog-content";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsBySlug[slug] : undefined;

  if (!post || post.draft) {
    return (
      <div className="min-h-screen bg-purple-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/blog"
            className="mt-4 text-sm sm:text-lg !text-yellow-400 font-mono mb-4 inline-block hover:!text-yellow-600 transition-colors"
          >
            ← Back to Blog
          </Link>
          <article className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h1 className="text-3xl font-bold text-pink-300 font-serif mb-4">
              Post not found
            </h1>
            <p className="text-gray-200 font-inter leading-relaxed">
              The requested blog post does not exist or is not published.
            </p>
          </article>
        </div>
      </div>
    );
  }

  return (
    <BlogPost
      title={post.title}
      subtitle={post.subtitle}
      content={post.content}
      author={post.author}
      date={post.date}
      coverImage={post.coverImage}
      tags={post.tags}
    />
  );
};

export default BlogPostPage;

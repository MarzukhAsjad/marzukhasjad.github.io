import React from "react";
import { Link } from "react-router-dom";

type ImageAspect = "aspect-video" | "aspect-[4/3]" | "aspect-[3/2]" | "aspect-square";

interface BlogPreviewProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  author: string;
  createdDate: string;
  slug: string;
  featured?: boolean;
  imageAspect?: ImageAspect;
}

const BlogPreview: React.FC<BlogPreviewProps> = ({
  title,
  subtitle,
  imageUrl,
  description,
  author,
  createdDate,
  slug,
  featured = false,
  imageAspect = "aspect-video",
}) => {
  return (
    <Link
      to={`/blog/${slug}`}
      className="block group transition-transform duration-300 hover:scale-105 break-inside-avoid mb-8"
    >
      <article
        className={`bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-gray-600 transition-colors ${
          featured ? "ring-2 ring-yellow-400/50" : ""
        }`}
      >
        {featured && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-3 py-1">
            FEATURED BLOG POST
          </div>
        )}

        <div className={`${imageAspect} overflow-hidden`}>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-3 text-green-500 font-mono text-center group-hover:text-cyan-300 transition-colors">
            {title}
          </h2>

          {subtitle && (
            <h3 className="text-lg font-medium mb-4 text-gray-400 text-center italic group-hover:text-green-500 transition-colors">
              {subtitle}
            </h3>
          )}

          <p className="text-gray-300 mb-4 leading-relaxed font-inter line-clamp-3">
            {description}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <span className="font-medium">{author}</span>
            <time className="font-mono">{createdDate}</time>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default BlogPreview;

import blogContent0 from "@/content/blog1.md?raw";
import blogContent1 from "@/content/blog2.md?raw";
import blogContent2 from "@/content/blog3.md?raw";

export interface BlogPostRecord {
  title: string;
  subtitle: string;
  date: string;
  author: string;
  slug: string;
  description: string;
  coverImage: string;
  featured: boolean;
  draft: boolean;
  sortOrder: number;
  tags: string[];
  sourceFile: string;
  content: string;
}

export const blogPosts: BlogPostRecord[] = [
  {
    title: "Secure modularised microservices with webhooks communication",
    subtitle:
      "How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity.",
    date: "2025-10-09",
    author: "Marzukh Akib Asjad",
    slug: "secure-modularised-microservices-with-webhooks-communication",
    description:
      "Microservices are super beneficial for a large company, with a large subdivided team. But for a small-medium sized company with 2 to 5 developers, it can be a dilemma. Do you go with them because the trend nowadays is spinning microservices?",
    coverImage: "/blog1/webhook_post_image.png",
    featured: true,
    draft: false,
    sortOrder: 1,
    tags: ["microservices", "webhooks", "distributed-systems"],
    sourceFile: "src/content/blog1.md",
    content: blogContent0,
  },
  {
    title: "B2C success is about customer convenience",
    subtitle:
      "B2C success hinges on customer convenience: seamless WhatsApp AI chat, quick on-boarding, and precise guidance driving rapid 3k+ user growth in 3 months.",
    date: "2025-07-15",
    author: "Marzukh Akib Asjad",
    slug: "b2c-success-hinges-on-customer-convenience",
    description:
      "As the co-founder of an ed-tech startup, I’ve seen firsthand how focusing on customers’ convenience drives success in the B2C space. It really surprised me that nowadays, no one wants to go through 10 other steps to finally be onboarded onto the app.",
    coverImage: "/blog2/convenience_affects_b2c.png",
    featured: false,
    draft: false,
    sortOrder: 2,
    tags: ["b2c", "product", "growth"],
    sourceFile: "src/content/blog2.md",
    content: blogContent1,
  },
  {
    title: "Monitoring your distributed microservices with Observability Tools",
    subtitle:
      "How you can monitor and keep checks on your FastAPI microservices with Logfire before they burn down",
    date: "2026-01-04",
    author: "Marzukh Akib Asjad",
    slug: "monitoring-your-distributed-microservices",
    description:
      "When your system has more than a few microservices, how do you keep track of them all? How do you find out what went wrong when something breaks? What about precautionary measures to prevent failures?",
    coverImage: "/blog3/centralise-monitoring.png",
    featured: false,
    draft: false,
    sortOrder: 3,
    tags: ["observability", "fastapi", "microservices"],
    sourceFile: "src/content/blog3.md",
    content: blogContent2,
  },
];

export const publishedBlogPosts = blogPosts.filter((post) => !post.draft);

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostRecord>;

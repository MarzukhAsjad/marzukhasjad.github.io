import blogContent0 from "@/content/blog1.md?raw";
import blogContent1 from "@/content/blog5.md?raw";
import blogContent2 from "@/content/blog4.md?raw";
import blogContent3 from "@/content/blog3.md?raw";
import blogContent4 from "@/content/blog2.md?raw";

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
    subtitle: "How to communicate using webhooks between REST API based microservices while maintaining simplicity, security and modularity.",
    date: "2025-10-09",
    author: "Marzukh Akib Asjad",
    slug: "secure-modularised-microservices-with-webhooks-communication",
    description: "Microservices are super beneficial for a large company, with a large subdivided team. But for a small-medium sized company with 2 to 5 developers, it can be a dilemma. Do you go with them because the trend nowadays is spinning microservices?",
    coverImage: "/blog1/webhook_post_image.png",
    featured: true,
    draft: false,
    sortOrder: 999,
    tags: ["microservices","webhooks","distributed-systems"],
    sourceFile: "src/content/blog1.md",
    content: blogContent0,
  },
  {
    title: "How I Built a DIY Webcam with My Android Phone and Laptop",
    subtitle: "Turning an Android phone into a local webcam server with CameraX and a lightweight embedded stream endpoint.",
    date: "2026-05-30",
    author: "Marzukh Akib Asjad",
    slug: "diy-webcam-android-phone-laptop",
    description: "I am really attracted to shiny and glowy objects. So when I saw the ASUS ROG G14 with the crazy backlit animation, I did not hesitate at all to buy it during the first year of college. It was only after turning it on that I realised it did not have a webcam.",
    coverImage: "/blog5/day1-cover.jpg",
    featured: false,
    draft: false,
    sortOrder: 5,
    tags: ["android","build-in-public","server"],
    sourceFile: "src/content/blog5.md",
    content: blogContent1,
  },
  {
    title: "Jobless, procrastinating, but not lost",
    subtitle: "Beat the algorithm and use your jobless time to learn new things, even when you have no motivation to do so.",
    date: "2026-05-23",
    author: "Marzukh Akib Asjad",
    slug: "jobless-but-not-lost",
    description: "Being jobless gives you a new perspective on life. Suddenly you have a lot of time on your hands and you do not know what to do with it. You go to LinkedIn to apply for a job, but you see 1 of 3 things when you go on to that atrocious platform",
    coverImage: "/blog4/todd-rhines-W0jzK552m8E-unsplash.jpg",
    featured: false,
    draft: false,
    sortOrder: 999,
    tags: ["self-care","learning"],
    sourceFile: "src/content/blog4.md",
    content: blogContent2,
  },
  {
    title: "Monitoring your distributed microservices with Observability Tools",
    subtitle: "How you can monitor and keep checks on your FastAPI microservices with Logfire before they burn down",
    date: "2026-01-04",
    author: "Marzukh Akib Asjad",
    slug: "monitoring-your-distributed-microservices",
    description: "When your system has more than a few microservices, how do you keep track of them all? How do you find out what went wrong when something breaks? What about precautionary measures to prevent failures?",
    coverImage: "/blog3/centralise-monitoring.png",
    featured: false,
    draft: false,
    sortOrder: 999,
    tags: ["observability","fastapi","microservices"],
    sourceFile: "src/content/blog3.md",
    content: blogContent3,
  },
  {
    title: "B2C success is about customer convenience",
    subtitle: "B2C success hinges on customer convenience: seamless WhatsApp AI chat, quick on-boarding, and precise guidance driving rapid 3k+ user growth in 3 months.",
    date: "2025-07-15",
    author: "Marzukh Akib Asjad",
    slug: "b2c-success-hinges-on-customer-convenience",
    description: "As the co-founder of an ed-tech startup, I’ve seen firsthand how focusing on customers’ convenience drives success in the B2C space. It really surprised me that nowadays, no one wants to go through 10 other steps to finally be onboarded onto the app.",
    coverImage: "/blog2/convenience_affects_b2c.png",
    featured: false,
    draft: false,
    sortOrder: 999,
    tags: ["b2c","product","growth"],
    sourceFile: "src/content/blog2.md",
    content: blogContent4,
  }
];

export const publishedBlogPosts = blogPosts.filter((post) => !post.draft);

export const blogPostsBySlug = Object.fromEntries(
  blogPosts.map((post) => [post.slug, post]),
) as Record<string, BlogPostRecord>;


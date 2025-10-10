import BlogPost from "@/components/BlogPost";
import blog1Content from "@/content/blog1.md?raw";

const blog1 = () => {
  return <BlogPost content={blog1Content} />;
};

export default blog1;

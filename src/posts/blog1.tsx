import BlogPost from "@/components/BlogPost";
import blog1Content from "@/content/blog1.md?raw";

const blog1 = () => {
  return (
    <BlogPost
      content={blog1Content}
      author="Marzukh Akib Asjad"
      date="09/10/2025"
    />
  );
};

export default blog1;

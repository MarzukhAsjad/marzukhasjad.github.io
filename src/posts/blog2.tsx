import BlogPost from "@/components/BlogPost";
import blog2Content from "@/content/blog2.md?raw";

const blog2 = () => {
  return (
    <BlogPost
      content={blog2Content}
      author="Marzukh Akib Asjad"
      date="15/07/2025"
    />
  );
};

export default blog2;

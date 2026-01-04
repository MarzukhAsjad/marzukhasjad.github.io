import BlogPost from "@/components/BlogPost";
import blog3Content from "@/content/blog3.md?raw";

const blog3 = () => {
  return (
    <BlogPost
      content={blog3Content}
      author="Marzukh Akib Asjad"
      date="09/12/2025"
    />
  );
};

export default blog3;

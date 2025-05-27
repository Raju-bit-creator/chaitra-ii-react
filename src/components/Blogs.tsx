import React from "react";
import SmallBanner from "./SmallBanner";
import BlogCards from "./BlogCards";

const Blogs = () => {
  const title = "Blogs";

  return (
    <div>
      <SmallBanner title={title} />
      <BlogCards />
    </div>
  );
};

export default Blogs;

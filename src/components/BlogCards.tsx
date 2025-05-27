import React from "react";
import BlogImg from "../assets/participant1.jpg";

type card = {
  title: string;
  description: string;
  id: number;
};

const BlogCards = () => {
  const Blogs = [
    {
      id: 1,
      title: "Blog 1",
      description: "This is the first blog post",
    },
    {
      id: 2,
      title: "Blog 2",
      description: "This is the first blog post",
    },
    ,
    {
      id: 3,
      title: "Blog 3",
      description: "This is the first blog post",
    },
    {
      id: 4,
      title: "Blog 4",
      description: "This is the first blog post",
    },
  ];
  return (
    <div className="container">
      <div className="row">
        {Blogs &&
          Blogs.map((item: any) => {
            return (
              <div className="col-md-3">
                <div className="card">
                  <img src={BlogImg} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                    <a href="#" className="btn btn-primary">
                      Go somewhere
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default BlogCards;

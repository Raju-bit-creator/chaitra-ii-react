import React, { useEffect } from "react";

const BlogCards = () => {
  const blogs = [
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
  const [news, setNews] = React.useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=d125d26fbc6d49728775e0b977bddc5a"
    );
    const data = await response.json();
    console.log("this is data from api", data.articles);
    setNews(data.articles);
  };
  React.useEffect(() => {
    fetchData();
  }, []);

  // useEffect(()=>{
  //   fetchData();
  // },[])
  return (
    <div className="blogs-section">
      <div className="container">
        <div className="row">
          {news.map((i) => {
            return (
              <div key={i.title}>
                <h6>{i.description}</h6>
              </div>
            );
          })}
          <h4>Our latest blogs</h4>
          {blogs &&
            blogs.map((item) => {
              return (
                <div className="col-md-3">
                  <div key={item.id} className="card custom-card">
                    <img
                      src="/participant1.jpg"
                      className="card-img-top"
                      alt="..."
                    />
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
    </div>
  );
};

export default BlogCards;

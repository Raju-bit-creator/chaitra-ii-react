import React from "react";

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
      "https://jsonplaceholder.typicode.com/todos/2"
    );
    const data = await response.json();
    console.log("this is data from api", data);
    setNews(data);
  };
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="blogs-section">
      <div className="container">
        <div className="row">
          <h4>{news.title}</h4>
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

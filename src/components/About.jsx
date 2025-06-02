import React, { useContext, useEffect } from "react";
import SmallBanner from "./SmallBanner";
import ProductContext from "../context/ProductContext";

const About = () => {
  const context = useContext(ProductContext);
  const { product, count, fetchData, news } = context;
  console.log("product", product);
  console.log("count", count);
  console.log("news", news);

  let title = "About Us";

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SmallBanner title={title} />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <div class="card">
              <img src="/oranges.jpg" class="card-img-top" alt="..." />
              <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">{product.description}</p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

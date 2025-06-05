import React, { useContext, useEffect } from "react";
import SmallBanner from "./SmallBanner";
import ProductContext from "../context/ProductContext";

const About = () => {
  const context = useContext(ProductContext);
  const {
    product,
    state: { cart, products },
    dispatch,
    count,
    fetchData,
    news,
  } = context;
  console.log("product fruits", product);
  console.log("products", products);
  console.log("cart", cart);

  let title = "About Us";

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <SmallBanner title={title} />
      <div className="about">
        <div className="container">
          <div className="row">
            {product.map((item) => {
              return (
                <div key={item._id} className="col-md-3">
                  <div class="card">
                    <img src="/oranges.jpg" class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">{item.title}</h5>
                      <p class="card-text">{item.description}</p>
                      <p class="card-text">Rs. {item.price}</p>

                      <a
                        href="#"
                        class="btn btn-primary"
                        onClick={() =>
                          dispatch({
                            type: "ADD_TO_CART",
                            payload: item,
                          })
                        }
                      >
                        Add to cart
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

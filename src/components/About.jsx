import React, { useContext, useEffect } from "react";
import SmallBanner from "./SmallBanner";
import ProductContext from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";

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
        {/* <button
          onClick={() =>
            dispatch({
              name: "hello world",
            })
          }
        >
          click me
        </button> */}
        <div className="container">
          <div className="row">
            {product.map((item) => {
              return (
                <div key={item._id} className="col-md-3">
                  <div className="card">
                    <img
                      src="/oranges.jpg"
                      className="card-img-top"
                      alt="orange image"
                    />
                    <div className="card-body">
                      <div className="title-content">
                        <h5 className="card-title">{item.title}</h5>
                        <BsThreeDots />
                      </div>
                      <p className="card-text">{item.description}</p>
                      <p className="card-text">Rs. {item.price}</p>

                      {/* ternary operator  */}

                      {cart && cart.some((p) => p._id === item._id) ? (
                        <a
                          href="#"
                          className="btn btn-danger"
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            })
                          }
                        >
                          Remove from cart
                        </a>
                      ) : (
                        <a
                          href="#"
                          className="btn btn-primary"
                          onClick={() =>
                            dispatch({
                              type: "ADD_TO_CART",
                              payload: item,
                            })
                          }
                        >
                          Add to cart
                        </a>
                      )}
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

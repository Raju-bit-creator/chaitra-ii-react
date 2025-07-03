import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../context/ProductContext";

const SearchResult = () => {
  const { searchQuery } = useParams();
  const context = useContext(ProductContext);

  const {
    state: { cart },
    allProduct,
    product,
    dispatch,
  } = context;

  console.log("all product search ", product);

  useEffect(() => {
    allProduct(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      <div className="container">
        <div className="row">
          <h4>hello i am search result</h4>
          {product.map((item) => {
            return (
              <div key={item._id} className="col-md-3">
                <div className="card">
                  <img
                    src={
                      item.image?.[0]
                        ? `http://localhost:5000/uploads/${item.image[0]}`
                        : "/oranges.jpg"
                    }
                    className="card-img-top"
                    alt="orange image"
                  />
                  <div className="card-body">
                    <div className="title-content">
                      <h5 className="card-title">{item.title}</h5>
                    </div>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text">Rs. {item.price}</p>

                    {/* ternary operator  */}

                    {cart && cart.some((p) => p._id === item._id) ? (
                      <button
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
                      </button>
                    ) : (
                      <button
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
                      </button>
                    )}
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

export default SearchResult;

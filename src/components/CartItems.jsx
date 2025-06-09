import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";
import { MdDelete } from "react-icons/md";

const CartItems = () => {
  const context = useContext(ProductContext);

  const {
    state: { cart },
    dispatch,
  } = context;
  console.log("nav  cart", cart);
  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  return (
    <div className="container mt-4 ">
      <div className="productcontainer-cart">
        <ul className="product-list">
          {cart?.map((item) => (
            <li key={item._id}>
              <div className="row">
                <div className="col-md-2 mb-2">
                  <img
                    src="/oranges.jpg"
                    style={{ height: "80px", width: "80px" }}
                    alt="orange image"
                  />
                </div>
                <div className="col-md-2">
                  <h6>{item.title}</h6>
                </div>
                <div className="col-md-2">
                  <h6>price: Rs. {item.price}</h6>
                </div>
                <div className="col-md-2">
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      dispatch({
                        type: "UPDATE_CART_ITEM",
                        payload: { _id: item._id, qty: e.target.value },
                      })
                    }
                    className="form-control"
                  >
                    {[...Array(item.instock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-light"
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: item,
                      })
                    }
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="summary">
        <div className="title"> Total items: {cart.length}</div>
        <h4>Sub-total: {total}</h4>
        <button className="btn btn-primary">Proceed to checkout</button>
      </div>
    </div>
  );
};

export default CartItems;

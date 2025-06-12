import React, { useContext, useEffect, useState } from "react";
import SmallBanner from "./SmallBanner";
import ProductContext from "../context/ProductContext";
import { BsThreeDots } from "react-icons/bs";
import EditProductModal from "./EditProductModal";

const About = () => {
  const context = useContext(ProductContext);
  const {
    product,
    allProduct,
    state: { cart, products },
    dispatch,
  } = context;
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  let title = "About Us";

  const toggleMenu = (id) => {
    console.log("toggle item id ", id);
    setMenuVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const closeEditModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const saveEdit = (updateData) => {
    console.log("save edit product ", updateData);
    editProduct(selectedProduct._id, updateData);
  };

  const handleDelete = (id) => {
    console.log("delete item id ", id);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    console.log("editing product", product);

    setModalVisible(true);
  };

  useEffect(() => {
    allProduct();
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
                  <div className="card">
                    <img
                      src="/oranges.jpg"
                      className="card-img-top"
                      alt="orange image"
                    />
                    <div className="card-body">
                      <div className="title-content">
                        <h5 className="card-title">{item.title}</h5>
                        <BsThreeDots onClick={() => toggleMenu(item._id)} />
                        {menuVisible[item._id] && (
                          <div className="menu-options">
                            <button onClick={() => openEditModal(item)}>
                              Edit
                            </button>
                            <button onClick={() => handleDelete(item._id)}>
                              Delete
                            </button>
                          </div>
                        )}
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
                  {modalVisible &&
                    selectedProduct &&
                    selectedProduct._id === item._id && (
                      <EditProductModal
                        product={selectedProduct}
                        onClose={closeEditModal}
                        onSave={saveEdit}
                      />
                    )}
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

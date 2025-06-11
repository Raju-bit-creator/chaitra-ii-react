import React, { useState } from "react";

const EditProductModal = ({ product, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: product.title,
    price: product.price,
    description: product.description,
    instock: product.instock,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div
        className="modal open"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Edit Product</h5>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={onClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="title"
                    value={formData.title}
                    id="title"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    name="description"
                    value={formData.description}
                    id="description"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    name="price"
                    value={formData.price}
                    id="price"
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Instock
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    onChange={handleChange}
                    name="instock"
                    value={formData.instock}
                    id="title"
                    aria-describedby="emailHelp"
                  />
                </div>

                <button
                  type="submit"
                  onClick={() => onSave(formData)}
                  className="btn btn-primary"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;

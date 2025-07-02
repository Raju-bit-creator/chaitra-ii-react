import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
  // const BACKEND_URL = process.env.BACKEND_URL;
  const products = [
    {
      _id: 1,
      title: "Apple",
      description: "this is local product of mustang",
      price: 200,
      instock: 5,
    },
    {
      _id: 2,
      title: "Mango",
      description: "this is local product of terai",
      price: 300,
      instock: 5,
    },
    {
      _id: 3,
      title: "Banana",
      description: "this is local product of Gorkha",
      price: 100,
      instock: 2,
    },
    {
      _id: 4,
      title: "Banana1",
      description: "this is local product of Gorkha",
      price: 200,
      instock: 4,
    },
  ];
  const [product, setProduct] = React.useState(products);

  const [state, dispatch] = useReducer(cartReducer, {
    products: product,
    cart: [],
  });

  const allProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/allhomeproduct`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setProduct(data);
      console.log("data from backend response", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  //edit product
  const editProduct = async (id, updateData) => {
    const { title, description, instock, price } = updateData;

    try {
      const response = await fetch(
        `http://localhost:5000/api/product/updateproduct/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
          body: JSON.stringify({ title, description, instock, price }),
        }
      );

      const data = await response.json();
      console.log("edited data", data);
      allProduct();
    } catch (error) {
      console.log("internal server error", error);
      throw new Error("failed to update product");
    }
  };

  //delete product
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/product/deleteproduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("data deleted", data);
      allProduct();
    } catch (error) {
      console.log("error", error);
      throw new Error("filed to delete product");
    }
  };

  return (
    <ProductContext.Provider
      value={{
        product,
        state,
        dispatch,
        allProduct,
        editProduct,
        deleteProduct,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

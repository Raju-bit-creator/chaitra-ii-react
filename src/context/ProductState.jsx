import React, { useReducer } from "react";
import ProductContext from "./ProductContext";
import { cartReducer } from "./Reducer";

const ProductState = (props) => {
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
        "http://localhost:5000/api/product/getproduct",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6I",
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
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR",
          },
          body: JSON.stringify({ title, description, instock, price }),
        }
      );

      const data = await response.json();
      console.log("data from backend response", data);
      allProduct();
    } catch (error) {
      console.log("internal server error", error);
      throw new Error("failed to update product");
    }
  };

  return (
    <ProductContext.Provider
      value={{ product, state, dispatch, allProduct, editProduct }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

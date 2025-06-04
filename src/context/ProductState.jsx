import React from "react";
import ProductContext from "./ProductContext";

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

  const [count, setCount] = React.useState(10);

  const [news, setNews] = React.useState([]);
  const fetchData = async () => {
    const response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=us&apiKey=d125d26fbc6d49728775e0b977bddc5a"
    );
    const data = await response.json();
    console.log("this is data from api", data.articles);
    setNews(data.articles);
  };
  return (
    <ProductContext.Provider
      value={{ product, count, setCount, news, fetchData }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductState;

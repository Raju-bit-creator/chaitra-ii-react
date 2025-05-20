import { useState } from "react";

import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";

function App() {
  const [count, setCount] = useState(10); //initialize
  const [name, setName] = useState("John "); //initialize
  const [mode, setMode] = useState("dark");
  const handleIncrement = () => {
    setCount(count + 1);
    setName("Ramesh");
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  let title = "onlinekhabar.com";

  return (
    <>
      <Navbar mode={mode} title={title} />
      <Banner />
      <div className="container">
        <h1 className="title">chaitra group</h1>
        <div className="card">
          <button onClick={handleIncrement}>Click me to increase</button>
          <button onClick={handleDecrement}>Click me to decrease</button>
        </div>
        <div>
          <h4>Counter: {count}</h4>
          <h5>My name is: {name}</h5>
        </div>
      </div>
    </>
  );
}

export default App;

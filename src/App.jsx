import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import "./App.css";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Alert from "./components/Alert";
import One from "./components/One";

function App() {
  const [count, setCount] = useState(10); //initialize
  const [name, setName] = useState("John "); //initialize
  const [mode, setMode] = useState("dark");
  const [text, setText] = useState("Dark mode");
  const [alert, setAlert] = useState(null);

  const toggleMode = () => {
    if (mode === "dark") {
      setMode("light");
      setText("Dark mode");
      showAlert("Light mode has been enabled", "success");
    } else {
      setMode("dark");
      setText("Light mode");
      showAlert("Dark mode has been enabled", "success");
    }
  };
  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const handleIncrement = () => {
    setCount(count + 1);
    setName("Ramesh");
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  let title = "onlinekhabar.com";
  const notify = () => toast("Login successfull");

  return (
    <>
      <Navbar mode={mode} toggleMode={toggleMode} text={text} title={title} />
      <ToastContainer />
      <Alert alert={alert} />
      <Banner />
      <One mode={mode} />
      <div className="container">
        <h1 className="title">chaitra group</h1>
        <div className="card">
          <button onClick={handleIncrement}>Click me to increase</button>
          <button onClick={notify}>Tostify</button>
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

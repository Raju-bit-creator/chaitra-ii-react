import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import Alert from "./components/Alert";

import Home from "./components/Home";
import About from "./components/About";

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
      <Router>
        <Navbar mode={mode} toggleMode={toggleMode} text={text} title={title} />
        <ToastContainer />
        <Alert alert={alert} />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

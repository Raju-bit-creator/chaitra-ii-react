import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import Alert from "./components/Alert";

import Home from "./components/Home";
import About from "./components/About";
import Contact from "./components/Contact";
import Blogs from "./components/Blogs";
import ClassBased from "./components/ClassBased";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";
import ProductState from "./context/ProductState";
import Login from "./components/Login";
import SignUp from "./components/signup";
import CartItems from "./components/CartItems";
import AddProduct from "./components/AddProduct";
import SearchResult from "./components/SearchResult";
import ForgotPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

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
      <ProductState>
        <Router>
          <Navbar
            mode={mode}
            toggleMode={toggleMode}
            text={text}
            title={title}
          />
          <ToastContainer />
          <Alert alert={alert} />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/:id/:username/:age" element={<UserDetail />} />
            <Route path="/cartitems" element={<CartItems />} />
            <Route path="/search/:searchQuery" element={<SearchResult />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/reset_password/:id/:token"
              element={<ResetPassword />}
            ></Route>
          </Routes>
          {/* <ClassBased /> */}
        </Router>
      </ProductState>
    </>
  );
}

export default App;

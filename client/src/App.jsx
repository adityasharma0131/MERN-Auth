import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isAuthenticated = !!document.cookie
    .split("; ")
    .find((row) => row.startsWith("user_email="));
  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/sign-in" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute element={Home} />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;

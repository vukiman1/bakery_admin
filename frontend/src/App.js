import { Routes, Route } from "react-router-dom";

import AdminPage from "./components/AdminPage";
import React from "react";
import Login from "./components/Login/Login";
import Product from "./components/Body/Content/Product/productContent";
import User from "./components/Body/Content/User/userContent";
function App() {
  return (
    <Routes>
      <Route path="*" element={<AdminPage />}>
        <Route path="product" element={<Product />} />
        <Route path="user" element={<User />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;

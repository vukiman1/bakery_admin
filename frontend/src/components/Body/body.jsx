import SideBar from "./SlideBar/sideBar";
import { Routes, Route } from "react-router-dom";
import Product from "./Content/Product/productContent";
import User from "./Content/User/userContent";
// import FormInput from "./FormInput/FormInput";

function Body() {
  return (
    <>
      <main className="row position-relative" style={{ height: "80vh" }}>
        <nav className=" col-2">
          <SideBar />
        </nav>
        <div className="col-10">
          <Routes>
            <Route path="/product" element={<Product />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </main>
    </>
  );
}

export default Body;

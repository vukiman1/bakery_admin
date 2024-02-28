import Header from "./Header/header";
import Body from "./Body/body";
// import useBearStore from "./state/state";
import { Navigate } from "react-router-dom";

function AdminPage() {
  // const isUserValid = useBearStore((state) => state.isUserValid);
  const isUserValid2 = localStorage.getItem("setIsUserValid");
  console.log(isUserValid2);

  return isUserValid2 ? (
    <>
      <Header />
      <Body />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default AdminPage;

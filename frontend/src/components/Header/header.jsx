import "./header.css";
import "./headerResponsive.css";
import { useNavigate } from "react-router-dom";

function MyHeader() {
  const getUser = localStorage.getItem("user");
  const user = JSON.parse(getUser);
  console.log(user);
  const navigat = useNavigate();

  function handleLogout() {
    localStorage.removeItem("setIsUserValid");
    localStorage.removeItem("user");
    navigat("../login");
  }

  return (
    <header
      className="d-flex justify-content-center mt-2"
      style={{ height: "70px" }}
    >
      <div className="d-flex align-items-center justify-content-between container-md position-fixed">
        <a className="logo" href="http://localhost:3000/product">
          <img className="logo_img" src="./assets/images/logo.png" alt="" />
        </a>
        <a className="Dashboard" href="http://localhost:3000/product">
          <h1 className="Dashboard_title">Dashboard</h1>
        </a>

        <div className="search d-flex align-items-center">
          <input className="search_input" type="text" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search search_icon"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
        </div>

        <a className="nofication" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bell-fill nofication_icon"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
          </svg>
        </a>

        <div className="user d-flex">
          <div className="user_text">
            <p className="user_text-name">{user.username}</p>
            <p className="user_text-assets user-select-none">Adminstrator</p>
          </div>
          <div className="user_avatar">
            <img
              className="user_avatar-img rounded-circle"
              src={user.image}
              alt="avatar"
            />
            <div className="dropdow">
              <h5 onClick={handleLogout}>Đăng xuất</h5>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default MyHeader;

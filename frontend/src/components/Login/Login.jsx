import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState, useEffect } from "react";
import axios from "axios";
import useBearStore from "../state/state";
import "./login.css";

import image from "../../factory_bg.png";
function Login() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [check, setCheck] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:9999/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  console.log(users);

  const navigate = useNavigate();
  const setIsUserValid = useBearStore((state) => state.setIsUserValid);

  function handleSubmit(e) {
    e.preventDefault();

    users.map((user) => {
      if (
        user.username === formData.username &&
        user.password === formData.password
      ) {
        localStorage.setItem("setIsUserValid", true);
        localStorage.setItem("user", JSON.stringify(user));
        setIsUserValid(true);
        return navigate("/");
      } else {
        return setCheck(true);
      }
    });
  }

  return (
    <>
      <section className="vh-100 login-background">
        <div
          clasName="no-name"
          style={{ height: "100%", backgroundImage: `url('${image}')` }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col col-xl-10">
                <div className="card shadow" style={{ borderRadius: "1rem" }}>
                  <div className="row g-0">
                    <div className="col-md-6 col-lg-5 d-none d-md-block login-image"></div>
                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                      <div className="card-body p-4 p-lg-5 text-black">
                        <Form onSubmit={handleSubmit}>
                          <div className="d-flex align-items-center mb-3 pb-1">
                            <i
                              className="fas fa-cubes fa-2x me-3"
                              style={{ color: "#ff6219" }}
                            ></i>
                            <span className="h1 fw-bold mb-0">Đăng nhập</span>
                          </div>

                          <FloatingLabel label="Tên đăng nhập" className="mb-3">
                            <Form.Control
                              type="text"
                              id="userName"
                              value={formData.username}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  username: e.target.value,
                                })
                              }
                              placeholder="Nhập tên người dùng"
                            />
                          </FloatingLabel>
                          <FloatingLabel label="Mật khẩu" className="mb-3">
                            <Form.Control
                              type="password"
                              id="passWord"
                              value={formData.password}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  password: e.target.value,
                                })
                              }
                              placeholder="Nhập mật khẩu"
                            />
                            {!check ? (
                              ""
                            ) : (
                              <span className="text-danger mt-3 position-absolute">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  fill="currentColor"
                                  className="bi bi-x-circle me-1 pb-1"
                                  viewBox="0 0 16 16"
                                >
                                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                                Sai tên đăng nhập hoặc mật khẩu
                              </span>
                            )}
                          </FloatingLabel>

                          <div className="pt-1 mb-4 ">
                            <Button
                              variant="dark"
                              className="btn-lg btn-block mt-2"
                              type="submit"
                            >
                              Đăng nhập
                            </Button>
                          </div>

                          <a className="small text-muted me-4" href="#!">
                            Quên mật khẩu?
                          </a>
                          <a className="small text-muted" href="#!">
                            Tạo mới
                          </a>
                        </Form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;

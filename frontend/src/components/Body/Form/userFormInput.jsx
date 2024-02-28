import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function UserForm() {
  const [message, setMessage] = useState(["No message"]);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);
  const [inputData, setInputData] = useState({
    id: "",
    image: "",
    username: "",
    password: "",
  });

  const navigat = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8888/bakery/users").then((res) => {
      setUsers(res.data.Users);
    });
  }, []);

  function checkValid() {
    const checkId = document.getElementById("inputId2");
    const checkUserName = document.getElementById("inputUserName2");
    const checkPassword = document.getElementById("inputPassword2");

    const message = [];
    var check = false;
    var isValidId = false;
    for (const x of users) {
      if (x.id === checkId.value) {
        isValidId = true;
      }
    }

    if (isValidId) {
      message.push("Đã tồn tại id, vui lòng nhập id khác!");
      setShow(true);
      checkId.focus();
      check = true;
    }

    if (checkId.value === "") {
      message.push("Chưa nhập Id");
      setShow(true);
      checkId.focus();
      check = true;
    }

    if (checkUserName.value === "") {
      message.push("Chưa nhập tên đăng nhập");
      setShow(true);
      checkId.focus();
      check = true;
    }

    if (checkPassword.value === "") {
      message.push("Chưa nhập mật khẩu");
      setShow(true);
      checkId.focus();
      check = true;
    }
    //s
    setMessage(message);
    return check;
  }

  function handleSubmit(e) {
    e.preventDefault();

    checkValid();

    if (!checkValid()) {
      setMessage("");
      axios
        .post("http://localhost:8888/bakery/users", inputData)
        .then((res) => {
          navigat(0);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div
      className="modal fade"
      id="userFormInput"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
        {message.map((message, index) => {
          return (
            <Toast
              onClose={() => setShow(false)}
              show={show}
              delay={3000}
              autohide
              bg="danger"
              key={index}
            >
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Thông báo!</strong>
                <small>1s trước</small>
              </Toast.Header>
              <Toast.Body>{message}</Toast.Body>
            </Toast>
          );
        })}
      </ToastContainer>
      <div className="modal-dialog">
        <div className="modal-content shadow">
          <div className="modal-header justify-content-center">
            <h2>
              <b>Thêm người dùng</b>
            </h2>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="Nhập ID" className="mb-3">
                <Form.Control
                  type="text"
                  id="inputId2"
                  placeholder="Nhập ID"
                  onChange={(e) =>
                    setInputData({ ...inputData, id: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Chọn ảnh đại diện" className="mb-3">
                <Form.Control
                  type="text"
                  id="inputImage2"
                  placeholder="Chọn ảnh đại diện"
                  onChange={(e) =>
                    setInputData({ ...inputData, image: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Tên đăng nhập" className="mb-3">
                <Form.Control
                  type="text"
                  id="inputUserName2"
                  placeholder="Tên đăng nhập"
                  onChange={(e) =>
                    setInputData({ ...inputData, username: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Mật khẩu" className="mb-3">
                <Form.Control
                  type="password"
                  id="inputPassword2"
                  placeholder="Mật khẩu"
                  autoComplete="on"
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                />
              </FloatingLabel>

              <div className="d-flex justify-content-around">
                <Button variant="primary" type="submit">
                  Thêm
                </Button>
                <Button variant="danger" data-bs-dismiss="modal">
                  Huỷ bỏ
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserForm;

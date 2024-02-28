import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function UserFormChange(item) {
  const navigat = useNavigate();
  const [inputData, setInputData] = useState({});
  const [message, setMessage] = useState(["No message"]);
  const [show, setShow] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setInputData(item.item);
  }, [item]);

  useEffect(() => {
    axios.get("http://localhost:8888/bakery/users").then((res) => {
      setUsers(res.data.Users);
    });
  }, []);

  function checkValid() {
    const checkId = document.getElementById("inputUserId");
    const checkUserName = document.getElementById("inputUser");
    const checkPassword = document.getElementById("inputPass");

    const message = [];
    var check = false;
    var isValidId = false;

    for (const x of users) {
      if (Number(x.id) !== Number(checkId.value)) {
        console.log(
          `${x.id} : ${checkId.value} : ${x.username} : ${checkUserName.value}`
        );
        if (x.username === checkUserName.value) {
          isValidId = true;
        }
      }
    }
    console.log(isValidId);
    if (isValidId) {
      message.push("Đã tồn tại user name, vui lòng nhập user name khác!");
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

  // đẩy lên server khi bấm submit
  function handleSubmit(e) {
    console.log(inputData);
    checkValid();
    console.log(checkValid());
    if (!checkValid()) {
      localStorage.setItem("inputData", JSON.stringify(inputData));
      console.log(inputData);
      axios
        .put("http://localhost:8888/bakery/users/" + inputData.id, inputData)
        .then((res) => {
          navigat(0);
        })
        .catch((err) => console.log(err));
    } else {
      e.preventDefault();
    }
  }

  return (
    <div
      className="modal fade"
      id="userFormChange"
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
              <b>Sửa người dùng</b>
            </h2>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="Nhập ID" className="mb-3">
                <Form.Control
                  type="number"
                  id="inputUserId"
                  placeholder="Nhập ID"
                  value={inputData.id}
                  disabled
                />
              </FloatingLabel>
              <FloatingLabel label="Chọn ảnh đại diện" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Chọn ảnh đại diện"
                  id="inputImage"
                  value={inputData.image}
                  onChange={(e) =>
                    setInputData({ ...inputData, image: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Tên đăng nhập" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tên đăng nhập"
                  id="inputUser"
                  value={inputData.username}
                  onChange={(e) =>
                    setInputData({ ...inputData, username: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Mật khẩu" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Mật khẩu"
                  id="inputPass"
                  autoComplete="on"
                  value={inputData.password}
                  onChange={(e) =>
                    setInputData({ ...inputData, password: e.target.value })
                  }
                />
              </FloatingLabel>

              <div className="d-flex justify-content-around">
                <Button variant="primary" type="submit">
                  Sửa
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

export default UserFormChange;

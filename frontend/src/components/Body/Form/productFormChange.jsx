import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ProductForm(item) {
  const navigat = useNavigate();
  const [inputData, setInputData] = useState({});
  const [message, setMessage] = useState(["No message"]);
  const [show, setShow] = useState(false);

  // lấy dữ liệu được truyền rồi gán vào biến
  useEffect(() => {
    setInputData(item.item);
  }, [item]);

  function checkValid() {
    const checkName = document.getElementById("inputName");
    const checkPrice = document.getElementById("inputPrice");
    const checkQuantity = document.getElementById("inputQuantity");
    const message = [];
    var check = false;

    if (checkName.value === "") {
      message.push("Chưa nhập tên");
      setShow(true);
      checkName.focus();
      check = true;
    }
    if (checkPrice.value === "") {
      message.push("Chưa nhập giá");
      setShow(true);
      checkPrice.focus();
      check = true;
    }
    if (checkQuantity.value === "") {
      message.push("Chưa nhập số lượng");
      setShow(true);
      checkQuantity.focus();
      check = true;
    }
    setMessage(message);
    return check;
  }

  // đẩy lên server khi bấm submit
  function handleSubmit(e) {
    e.preventDefault();

    console.log(inputData);
    checkValid();
    if (!checkValid()) {
      axios
        .put("http://localhost:8888/bakery/products/" + inputData.id, inputData)
        .then((res) => {
          navigat(0);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <div
      className="modal fade"
      id="productFormChange"
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
              <b>Sửa sản phẩm</b>
            </h2>
          </div>
          <div className="modal-body">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel label="ID" className="mb-3">
                <Form.Control
                  type="text"
                  id="inputId"
                  placeholder="ID"
                  value={inputData.id}
                  disabled
                />
              </FloatingLabel>
              <FloatingLabel label="Ảnh" className="mb-3">
                <Form.Control
                  type="text"
                  value={inputData.image}
                  placeholder="Ảnh"
                  onChange={(e) =>
                    setInputData({ ...inputData, image: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Tên" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Tên"
                  id="inputName"
                  value={inputData.name}
                  onChange={(e) =>
                    setInputData({ ...inputData, name: e.target.value })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Giá" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Giá"
                  id="inputPrice"
                  value={inputData.price}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      price: e.target.valueAsNumber,
                    })
                  }
                />
              </FloatingLabel>
              <FloatingLabel label="Số lượng" className="mb-3">
                <Form.Control
                  type="number"
                  placeholder="Số lượng"
                  id="inputQuantity"
                  value={inputData.quantity}
                  onChange={(e) =>
                    setInputData({
                      ...inputData,
                      quantity: e.target.valueAsNumber,
                    })
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

export default ProductForm;

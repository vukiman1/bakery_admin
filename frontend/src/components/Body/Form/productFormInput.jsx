import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ProductForm() {
  const [message, setMessage] = useState(["No message"]);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState([]);
  const [inputData, setInputData] = useState({
    id: 0,
    image: "",
    name: "",
    price: 0,
    quantity: 0,
  });

  const navigat = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8888/bakery/products").then((res) => {
      setProduct(res.data.Products);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    // kiểm tra xem có tồn tại id trong db ko

    function checkValid() {
      const checkImage = document.getElementById("inputImage2").value;
      const checkId = document.getElementById("inputID2");
      const checkName = document.getElementById("inputName2");
      const checkPrice = document.getElementById("inputPrice2");
      const checkQuantity = document.getElementById("inputQuantity2");
      console.log(checkName.value);
      const message = [];
      var check = false;
      var isValidId = false;
      for (const x of product) {
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

      if (checkImage.value === "") {
        message.push("Chưa nhập link ảnh");
        setShow(true);
        checkId.focus();
        check = true;
      }

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
    console.log(product);

    //chek=ck empty
    checkValid();
    console.log(message);

    if (!checkValid()) {
      axios
        .post("http://localhost:8888/bakery/products", inputData)
        .then((res) => {
          navigat(0);
        })
        .catch((err) => console.log(err));
    }
  }

  return (
    <>
      <div
        className="modal fade"
        id="productFormInput"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <ToastContainer
          className="p-3"
          position="top-end"
          style={{ zIndex: 1 }}
        >
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
                <b>Thêm sản phẩm</b>
              </h2>
            </div>
            <div className="modal-body">
              <Form onSubmit={handleSubmit}>
                <FloatingLabel label="Nhập ID" className="mb-3">
                  <Form.Control
                    id="inputID2"
                    type="number"
                    placeholder="Nhập ID"
                    onChange={(e) =>
                      setInputData({ ...inputData, id: e.target.valueAsNumber })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel label="Chọn ảnh sản phẩm" className="mb-3">
                  <Form.Control
                    type="text"
                    id="inputImage2"
                    placeholder="Chọn ảnh sản phẩm"
                    onChange={(e) =>
                      setInputData({ ...inputData, image: e.target.value })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel label="Nhập tên sản phẩm" className="mb-3">
                  <Form.Control
                    type="text"
                    id="inputName2"
                    placeholder="Nhập tên sản phẩm"
                    onChange={(e) =>
                      setInputData({ ...inputData, name: e.target.value })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel label="Nhập giá sản phẩm" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Nhập giá sản phẩm"
                    id="inputPrice2"
                    onChange={(e) =>
                      setInputData({
                        ...inputData,
                        price: e.target.valueAsNumber,
                      })
                    }
                  />
                </FloatingLabel>
                <FloatingLabel label="Nhập số lượng sản phẩm" className="mb-3">
                  <Form.Control
                    type="number"
                    placeholder="Nhập số lượng sản phẩm"
                    id="inputQuantity2"
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
    </>
  );
}

export default ProductForm;

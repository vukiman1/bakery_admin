import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { useState } from "react";
function MessageToast(messages, myShow) {
  const [show, setShow] = useState(false);
  setShow(myShow);
  console.log(messages);
  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
      {messages.map((message) => {
        return (
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
            bg="danger"
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
  );
}

export default MessageToast;

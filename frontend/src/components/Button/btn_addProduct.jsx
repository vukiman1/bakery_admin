import { Button } from "react-bootstrap";
function AddProductButton() {
  return (
    <Button
      className="position-absolute rounded-circle bottom-0 end-0 me-5"
      style={{ width: "70px", height: "70px" }}
      data-bs-toggle="modal"
      data-bs-target="#productFormInput"
      data-bs-whatever="@mdo"
    >
      <h1>
        <b>+</b>
      </h1>
    </Button>
  );
}

export default AddProductButton;

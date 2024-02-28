import { Button } from "react-bootstrap";

function AddUserButton() {
  return (
    <Button
      className="position-absolute rounded-circle bottom-0 end-0 me-5"
      style={{ width: "70px", height: "70px" }}
      data-bs-toggle="modal"
      data-bs-target="#userFormInput"
      data-bs-whatever="@mdo"
    >
      <h1>
        <b>+</b>
      </h1>
    </Button>
  );
}

export default AddUserButton;

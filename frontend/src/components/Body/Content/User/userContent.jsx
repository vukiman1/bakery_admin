import axios from "axios";
import "../Content.css";
import { useEffect, useState } from "react";
import UserFormInput from "../../Form/userFormInput";
import UserFormChange from "../../Form/userFormChange";
import AddUserButton from "../../../Button/btn_addUser";

function Content() {
  const [users, setUsers] = useState([]);
  const [itemSelect, setItemSelect] = useState([]);

  // gọi hàm lấy dữ liệu
  useEffect(() => {
    fetchUsers();
  }, []);

  //lấy dữ liệu từ server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8888/bakery/users");
      const sortUsers = response.data.Users.slice().sort((a, b) => a.id - b.id);
      setUsers(sortUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  //lấy dữ liệu của item được click sửa
  const handleEditClick = (item) => {
    setItemSelect(item);
  };

  // hàm bấm nút xoá
  const handleDelete = (id) => {
    const conf = window.confirm("Bán muốn xoá?");
    if (conf) {
      axios.delete("http://localhost:8888/bakery/users/" + id).then((res) => {
        const uploadUsers = users.filter((item) => item.id !== id);
        setUsers(uploadUsers);
      });
    }
  };

  return (
    <>
      <div className="contenContainer position-fixed tableFixHead">
        <table className="product_item table table-borderless table-hover text-center align-middle table-fixed">
          <thead>
            <tr className="table-secondary">
              <th style={{ borderTopLeftRadius: "15px" }}>ID</th>
              <th>Ảnh</th>
              <th>Tên đăng nhập</th>
              <th type="password">Mật khẩu</th>
              <th> </th>
              <th style={{ borderTopRightRadius: "15px" }}> </th>
            </tr>
          </thead>

          {/* render sản phẩm */}
          <tbody>
            {users.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <img
                      className="product_img img-thumbnail"
                      src={item.image}
                      alt="cl bakeyry_img"
                    />
                  </td>
                  <td>{item.username}</td>
                  <td>********</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary "
                      data-bs-toggle="modal"
                      data-bs-target="#userFormChange"
                      data-bs-whatever="@mdo"
                      onClick={() => handleEditClick(item)}
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger "
                      onClick={() => handleDelete(item.id)}
                    >
                      Xoá
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <UserFormChange item={itemSelect} />
      <UserFormInput />
      <AddUserButton />
    </>
  );
}

export default Content;

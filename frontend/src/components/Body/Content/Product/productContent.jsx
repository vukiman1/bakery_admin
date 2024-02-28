import axios from "axios";
import "../Content.css";
import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
import AddProductBTN from "../../../Button/btn_addProduct";
import ProductFormInput from "../../Form/productFormInput";
import ProductFormChange from "../../Form/productFormChange";

function ProductContent() {
  const [product, setProduct] = useState([]);
  const [itemSelect, setItemSelect] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8888/bakery/products").then((res) => {
      const sortProduct = res.data.Products.slice().sort((a, b) => a.id - b.id);
      setProduct(sortProduct);
    });
  }, []);

  // ++

  console.log(product);

  const handleEditClick = (item) => {
    setItemSelect(item);
  };

  const handleDelete = (id) => {
    const conf = window.confirm("Bán muốn xoá?");
    if (conf) {
      axios
        .delete("http://localhost:8888/bakery/products/" + id)
        .then((res) => {
          const uploadProduct = product.filter((item) => item.id !== id);
          setProduct(uploadProduct);
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
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Tồn kho</th>
              <th></th>
              <th style={{ borderTopRightRadius: "15px" }}></th>
            </tr>
          </thead>

          {/* render sản phẩm */}
          <tbody>
            {product.map((item, index) => {
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
                  <td>{item.name}</td>
                  <td>
                    <b>{item.price}</b>
                  </td>
                  <td className={item.quantity === 0 ? "text-danger" : ""}>
                    {item.quantity}
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#productFormChange"
                      data-bs-whatever="@mdo"
                      onClick={() => handleEditClick(item)}
                    >
                      Sửa
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger"
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

      <ProductFormChange item={itemSelect} />
      <ProductFormInput />
      <AddProductBTN />
    </>
  );
}

export default ProductContent;

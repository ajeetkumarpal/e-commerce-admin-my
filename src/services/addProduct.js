import axios from "axios";
import { backendURLProduct } from "../api";

const addProduct = async (productData) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(backendURLProduct + "add", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default addProduct;

import axios from "axios";
import { backendURL } from "../api";

const addProduct = async (productData) => {
  const token = localStorage.getItem("token");    

  try {
    const response = await axios.post(`${backendURL}/api/product/add`, productData, {
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

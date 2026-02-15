import axios from "axios";
import { backendURL } from "../api";

const removeProduct = async (id) => {
  const token = localStorage.getItem("token");

  try {
    
    const response = await axios.delete(`${backendURL}/api/product/remove/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default removeProduct;

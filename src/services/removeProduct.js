import axios from "axios";
import { backendURLProduct } from "../api";

const removeProduct = async (id) => {
  const token = localStorage.getItem("token");

  try {
    console.log(`${backendURLProduct}remove/${id}`);
    const response = await axios.delete(`${backendURLProduct}remove/${id}`, {
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

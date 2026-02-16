import axios from "axios";
import { backendURL } from "../api";

const addProduct = async (productData) => {
  const token = localStorage.getItem("token");  
  console.log(token)  ;

  try {
    console.log("productData",productData,"gs")
    const response = await axios.post(`${backendURL}/api/product/add`, productData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res",response)
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};

export default addProduct;

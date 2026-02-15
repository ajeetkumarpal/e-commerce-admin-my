import axios from "axios";
import { backendURL } from "../api";

const removeOrder = async (id) => {
  try {
    const response = await axios.delete(`${backendURL}/api/order/${id} `, {
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    return response;
  } catch (error) {
    console.log("error in remove order", error.message);
    throw error.response;
  }
};
export default removeOrder;

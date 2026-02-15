import axios from "axios";
import { backendURLOrder } from "../api";

const removeOrder = async (id) => {
  try {
    const response = await axios.delete(`${backendURLOrder}${id} `, {
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

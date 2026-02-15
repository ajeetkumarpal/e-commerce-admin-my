import axios from "axios";
import { backendURL } from "../api";

const updateOrderStatus = async (id, status) => {
  console.log("id in frontend", id);
  try {
    const response = await axios.put(
      `${backendURL}/api/order/update/${id}`,
      { status },
      { headers: { "Content-Type": "application/json" } },
    );

    return response;
  } catch (error) {
    console.log("error in update order status", error.message);
    throw error.response;
  }
};

export default updateOrderStatus;

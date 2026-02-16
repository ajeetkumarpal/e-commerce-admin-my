import axios from "axios";
import { backendURL } from "../api";

const adminLogin = async (data) => {
  try {
    console.log(backendURL);

    const response = await axios.post(`${backendURL}/api/user/admin`, data, {
  
      headers: { "Content-Type": "application/json" },
    });

    return response;
  } catch (error) {
    return error.response;
  }
};
export default adminLogin;

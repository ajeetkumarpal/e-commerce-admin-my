import React, { useState } from "react";
import adminLogin from "../services/adminLogin";
import { toast } from "react-toastify";

const Login = ({setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = async (e) => {
try {
      e.preventDefault();
      console.log("clicked")

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const result = await adminLogin(formData);
    
   
    if (result.data.success) {
      toast.success(result.data.message);
      setToken(result.data.token);

    } else {
      toast.error(result.data.message);
    }
} catch (error) {
  console.log(error.response);
}
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col my-32 mx-auto w-1/4 bg-green-100 border border-gray-400 px-8 py-8 rounded-sm"
    >
      <h1 className="font-bold mb-6 mt-3 text-xl">Admin Panel</h1>

      <label className="font-semibold " htmlFor="myemail">
        Email
      </label>
      <input
        className="px-2 py-2 mb-2 bg-white border border-gray-400 rounded-sm"
        type="email"
        placeholder="your@gmail.com"
        name="email"
        id="myemail"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label className="font-semibold" htmlFor="myPassword">
        Password
      </label>
      <input
        type="password"
        id="myPassword"
        name="password"
        placeholder="enter your password"
        className="px-2 py-2 mb-2 bg-white border border-gray-400 rounded-sm"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        type="submit"
        className="w-full bg-gray-800 text-white h-10 font-semibold text-sm my-4 border rounded-sm"
      >
        Login
      </button>
    </form>
  );
};

export default Login;

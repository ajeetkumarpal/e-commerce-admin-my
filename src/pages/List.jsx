import React, { useEffect, useState } from "react";
import { products } from "../assets/frontend_assets/assets";
import axios from "axios";
import removeProduct from "../services/removeProduct";
import { toast } from "react-toastify";
import { backendURL } from "../api";

const List = () => {
  const [allProduct, setAllProduct] = useState([]);
  
  useEffect(() => {
    const fetchFromBackend = async () => {   
      try {
        const response = await axios.get(`${backendURL}/api/product/list`);
        const backendProducts = response.data.data; 

        if (!Array.isArray(backendProducts)) {
          setAllProduct(products);
          return;
        }


        const merged = [
          ...products,
          ...backendProducts.filter(
            (bp) => !products.some((sp) => sp._id === bp._id)
          ),
        ];

        setAllProduct(merged);
        console.log("Merged products:", merged);
      } catch (error) {
        console.error("Error fetching products, fallback to static:", error.response || error);
        setAllProduct(products);
      }
    };
    
    fetchFromBackend();
  }, []); 

  const submitHandler = async (e) => {
    e.preventDefault();
  };

  const removeHandler = async (id) => {
    try {
      const result = await removeProduct(id);
      setAllProduct(prev => prev.filter(i => i._id !== id));
      console.log("result", result);
      if (result.data.success) {
        toast.success(result.data.message);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex flex-col flex-1 px-16 p-4">
      <p className="font-semibold text-3xl pb-4">All Product List</p>
      <div className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] text-center py-4 bg-gray-500 text-white font-bold border border-gray-400 w-full">
        <p className="text-start pl-2.5">Image</p>
        <p className="text-start">Name</p>
        <p>Category</p>
        <p>Price</p>
        <button>Action</button>
      </div>

      {allProduct.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_2fr_1fr_1fr_1fr] items-center border border-gray-400 border-b-0 w-full"
        >
          <img
            className="h-20 w-20 p-2 hover:scale-125 transform"
            src={item.image[0]}
            alt="not available"
          />
          <p className="hover:scale-125 transform text-center">{item.name}</p>
          <p className="text-center hover:scale-125 transform">{item.category}</p>
          <p className="text-center hover:scale-125 transform">{item.price}</p>
          <button onClick={() => removeHandler(item._id)}>X</button>
        </div>
      ))}
    </form>
  );
};

export default List;


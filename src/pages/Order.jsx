import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

import removeOrder from "../services/removeOrder";
import updateOrderStatus from "../services/updateOrder";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:3000/api/order/list");

      if (res.data.success) {
        
        setOrders(res.data.data);
      } else {
        toast.error("Failed to fetch orders");
      }

    } catch (error) {
      toast.error("Something went wrong",error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);


  const handleRemove = async (id) => {
    try {
      const res = await removeOrder(id);

      if (res.data.success) {
        setOrders(prev => prev.filter(order => order._id !== id));
        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error("Delete failed",error);
    }
  };
console.log("order admin",orders)
  
  const handleStatusChange = async (id, newStatus) => {
    try {

      const res = await updateOrderStatus(id, newStatus);

      if (res.data.success) {

        setOrders(prev =>
          prev.map(order =>
            order._id === id
              ? { ...order, deliveryStatus: newStatus }
              : order
          )
        );

        toast.success(res.data.message);
      }

    } catch (error) {
      toast.error("Status update failed",error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading orders...</p>;
  }

  if (!orders.length) {
    return <p className="text-center text-4xl mb-20 mt-10 text-gray-500">No orders found</p>;
  }

  return (
    <div className="max-w-6xl mx-auto pt-6 pb-18 space-y-8 ">
      <h1 className="text-3xl font-semibold"> Total Order Detail</h1>

      {orders.map((orderItem) => (

        <div
          key={orderItem._id}
          className="border border-gray-200 rounded-xl p-6 bg-white shadow-md"
        >

          <button
            onClick={() => handleRemove(orderItem._id)}
            className="h-8 -mt-10 w-24 float-end border-0 rounded-full text-red-800 bg-red-200 font-semibold text-sm"
          >
            Delete
          </button>

     
          <div className="flex items-start justify-between gap-5 mb-4">

            <div className="flex items-start gap-5 flex-1">

              <img
                src={assets.parcel_icon}
                alt=""
                className="w-20 h-20 object-cover rounded-md border"
              />

              <div>
                <p className="text-lg font-semibold text-gray-800">
                  {orderItem.firstName} {orderItem.lastName}
                </p>

                <div className="text-sm text-gray-600 mt-1 leading-relaxed">
                  <span>{orderItem.street}, </span>
                  <span>{orderItem.city}, </span>
                  <span>{orderItem.state}, </span>
                  <span>{orderItem.country} - </span>
                  <span>{orderItem.zipcode}</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Phone: {orderItem.phone}
                </p>
              </div>
            </div>

            <div className="text-right flex flex-col items-end gap-2">

              <p className="text-sm text-gray-600">
                {new Date(orderItem.createdAt).toLocaleDateString("en-IN")}
              </p>

              <span className="px-4 min-w-20 text-center py-2 text-sm font-bold text-green-700 bg-green-200 border border-green-300 rounded-full">
                {orderItem.paymentMethod} - ₹ {orderItem.payment}
              </span>

            </div>
          </div>

          <div className="space-y-3 mt-4">

            {orderItem.cartItems.map((data) => (

              <div
                key={data._id}
                className="grid grid-cols-[2fr_1fr_1fr_1fr] items-center border border-gray-100 rounded-lg p-4 bg-gray-50"
              >

                <p className="font-medium text-gray-800">
                  {data.name}
                  <span className="text-center font-bold border mx-4 bg-black text-amber-300 px-4 py-2 border-y-amber-300 rounded-full">
                    {data.size}
                  </span>
                </p>

                <p className="text-sm text-gray-600 text-center">
                  Qty: {data.quantity}
                </p>

               
                <select
                  value={orderItem.deliveryStatus || "Pending"}
                  onChange={(e) =>
                    handleStatusChange(orderItem._id, e.target.value)
                  }
                  className="p-2 w-40 bg-gray-700 text-white font-semibold text-sm border rounded-sm border-gray-400"
                >
                  <option value="Pending">Pending</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Refunded">Refunded</option>
                </select>

                <p className="font-bold text-orange-600 text-right">
                  Payment : {orderItem.paymentMethod === "razorpay" ? "success" : "pending"}
                </p>

              </div>

            ))}

          </div>

        </div>

      ))}

    </div>
  );
};

export default Order;




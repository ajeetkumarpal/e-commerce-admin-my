import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import addProduct from "../services/addProduct";
import { toast } from "react-toastify";

const Add = () => {
  const [image1, setImage1] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");

  const [image1File, setImage1File] = useState(null);
  const [image2File, setImage2File] = useState(null);
  const [image3File, setImage3File] = useState(null);
  const [image4File, setImage4File] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Top");
  const [price, setPrice] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const submitHandler = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));

      if (image1File) formData.append("image1", image1File);
      if (image2File) formData.append("image2", image2File);
      if (image3File) formData.append("image3", image3File);
      if (image4File) formData.append("image4", image4File);

      const result = await addProduct(formData);
      

      if (result.data.success) {
        toast.success(result.data.message);
        setName("");
        setDescription("");
        setCategory("men");
        setSubCategory("top");
        setPrice("");
        setBestSeller(false);
        setSizes([]);
        setImage1(""); setImage1File(null);
        setImage2(""); setImage2File(null);
        setImage3(""); setImage3File(null);
        setImage4(""); setImage4File(null);
      } else {
        toast.error(result.data.message);
      }
    } catch (error) {
      console.log(error.response);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form onSubmit={submitHandler} className="px-16 py-2">
      <p className="py-1">Upload Image</p>
      <div className="flex flex-row gap-3">
        <label>
          <img src={image1 || assets.upload_area} alt="not available" className="h-20" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage1File(e.target.files[0]);
                setImage1(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="hidden"
          />
        </label>
        <label>
          <img src={image2 || assets.upload_area} alt="not available" className="h-20" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage2File(e.target.files[0]);
                setImage2(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="hidden"
          />
        </label>
        <label>
          <img src={image3 || assets.upload_area} alt="not available" className="h-20" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage3File(e.target.files[0]);
                setImage3(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="hidden"
          />
        </label>
        <label>
          <img src={image4 || assets.upload_area} alt="not available" className="h-20" />
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files[0]) {
                setImage4File(e.target.files[0]);
                setImage4(URL.createObjectURL(e.target.files[0]));
              }
            }}
            className="hidden"
          />
        </label>
      </div>

      <p className="py-3">Product Name</p>
      <input
        type="text"
        placeholder="Type here"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="py-1.5 px-2 border border-gray-400 w-1/2 rounded-sm"
      />

      <p className="py-3">Product Description</p>
      <textarea
        rows="2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write content here..."
        className="py-2 px-2 border border-gray-400 w-1/2 rounded-sm"
      />

      <div className="flex flex-row py-2 w-5/12 justify-between">
        <div className="flex flex-col justify-center">
          <p className="py-1">Product category</p>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="border border-gray-400 py-1.5 w-36 px-2 rounded-t-sm">
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <p className="py-1">Sub category</p>
          <select value={subCategory} onChange={(e) => setSubCategory(e.target.value)} className="border border-gray-400 px-2 py-1.5 w-36 rounded-t-sm">
            <option value="Top">Topwear</option>
            <option value="Bottom">Bottomwear</option>
            <option value="Winter">Winterwear</option>
          </select>
        </div>
        <div className="flex flex-col justify-center">
          <p className="py-1">Product Price</p>
          <input
            type="number"
            value={price}
            min="50"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="eg.250"
            className="border border-gray-400 py-1.5 w-36 rounded-t-sm px-2"
          />
        </div>
      </div>

      <p className="py-1">Product Sizes</p>
      <div className="flex flex-row text-center gap-2">
        <p onClick={() => setSizes(prev => prev.includes("S") ? prev.filter((len) => len !== "S") : [...prev, "S"])} className={`h-10 min-w-12 border border-gray-400 py-1.5 cursor-pointer ${sizes.includes("S") ? "bg-gray-400" : "bg-gray-100"}`}>
          S
        </p>
        <p onClick={() => setSizes(prev => prev.includes("M") ? prev.filter((len) => len !== "M") : [...prev, "M"])} className={`h-10 min-w-12 border border-gray-400 py-1.5 cursor-pointer ${sizes.includes("M") ? "bg-gray-400" : "bg-gray-100"}`}>
          M
        </p>
        <p onClick={() => setSizes(prev => prev.includes("L") ? prev.filter((len) => len !== "L") : [...prev, "L"])} className={`h-10 min-w-12 border border-gray-400 py-1.5 cursor-pointer ${sizes.includes("L") ? "bg-gray-400" : "bg-gray-100"}`}>
          L
        </p>
        <p onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter((len) => len !== "XL") : [...prev, "XL"])} className={`h-10 min-w-12 border border-gray-400 py-1.5 cursor-pointer ${sizes.includes("XL") ? "bg-gray-400" : "bg-gray-100"}`}>
          XL
        </p>
        <p onClick={() => setSizes(prev => prev.includes("XXL") ? prev.filter((len) => len !== "XXL") : [...prev, "XXL"])} className={`h-10 min-w-12 border border-gray-400 py-1.5 cursor-pointer ${sizes.includes("XXL") ? "bg-gray-400" : "bg-gray-100"}`}>
          XXL
        </p>
      </div>

      <label className="flex items-center py-4">
        <input
          type="checkbox"
          checked={bestSeller}
          onChange={(e) => setBestSeller(e.target.checked)}
          className="mr-2"
        />
        Add to bestseller
      </label>

      <button type="submit" className="h-12 w-32 bg-black text-white">Add</button>
    </form>
  );
};

export default Add;








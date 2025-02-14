



import React, { useState } from "react";

const PoliciesSearch: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>(["All"]);
  
  const products = [
    "RIMI Canuck Voyage Travel Medical",
    "RIMI Canuck Voyage Non-Medical Travel",
    "Secure Study RIMI International Students to Canada",
    "Secure Travel RIMI Visitors to Canada Travel",
  ];

  const handleProductChange = (product: string) => {
    if (product === "All") {
      setSelectedProducts(["All"]);
    } else {
      setSelectedProducts((prev) =>
        prev.includes(product)
          ? prev.filter((p) => p !== product)
          : [...prev.filter((p) => p !== "All"), product]
      );
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">SEARCH POLICIES</h2>
      <p className="text-center text-gray-600 mb-4">Fill in as many of the following criteria as you can to generate a search.</p>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
      <div className=" flex flex-col gap-2"><label htmlFor="">First Name</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="FIRST NAME" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Last Name</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="LAST NAME" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Date of Birth</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="DATE OF BIRTH" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Policy Number</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="POLICY NUMBER" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Phone Number</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="PHONE NUMBER" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Email</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" placeholder="EMAIL" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Sale Date From</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="SALE DATE FROM" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Sale Date To</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="SALE DATE TO" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Effective Date From</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="EFFECTIVE DATE FROM" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Effective Date To</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded" type="date" placeholder="EFFECTIVE DATE TO" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Agent</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2" placeholder="AGENT" /></div>
      <div className=" flex flex-col gap-2"><label htmlFor="">Status</label><select className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2">
          <option>All</option>
          <option>Active</option>
          <option>Sold</option>
          <option>Expired</option>
          <option>Cancelled</option>
        </select></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Application ID</label><input className="p-2 border border-[#3a17c5] focus:outline-[#3a17c5] rounded col-span-2" placeholder="APPLICATION ID" /></div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 mb-2">PRODUCT</p>
        <div className="border p-2 bg-white max-h-36 overflow-y-auto border-[#3a17c5] focus:outline-[#3a17c5] rounded">
          <label className="block">
            <input
              type="checkbox"
              checked={selectedProducts.includes("All")}
              onChange={() => handleProductChange("All")}
            />
            All
          </label>
          {products.map((product) => (
            <label key={product} className="block">
              <input
                type="checkbox"
                checked={selectedProducts.includes(product)}
                onChange={() => handleProductChange(product)}
              />
              {product}
            </label>
          ))}
        </div>
      </div>
      <div className=" flex w-full justify-center items-center">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition">SEARCH</button>
      </div>
    </div>
  );
};

export default PoliciesSearch;

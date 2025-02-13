import React, { useState } from "react";

const QuotesSearch: React.FC = () => {
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
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">SEARCH QUOTES</h2>
      <p className="text-center text-gray-600 mb-4">Fill in as many of the following criteria as you can to generate a search.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className=" flex flex-col gap-2"><label htmlFor="">Quote Number</label> <input className="p-2 border rounded" placeholder="QUOTE NUMBER" /></div>
        <div className=" flex flex-col gap-2"> <label htmlFor="">Quote Date</label> <input className="p-2 border rounded" type="date" placeholder="QUOTE DATE" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">First Name</label> <input className="p-2 border rounded" placeholder="FIRST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Last Name</label><input className="p-2 border rounded" placeholder="LAST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Date of Birth</label><input className="p-2 border rounded" type="date" placeholder="DATE OF BIRTH" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Email</label><input className="p-2 border rounded" placeholder="EMAIL" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Effective Date</label><input className="p-2 border rounded" type="date" placeholder="EFFECTIVE DATE" /> </div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Expiry Date</label><input className="p-2 border rounded" type="date" placeholder="EXPIRY DATE" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Agent</label><input className="p-2 border rounded col-span-2" placeholder="AGENT" /> </div>
      </div>
      <div className="mt-4">
        <p className="text-gray-700 mb-2">PRODUCT</p>
        <div className="border p-2 bg-white max-h-32 overflow-y-auto rounded">
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
      <div className=" w-full flex justify-center items-center">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer">SEARCH</button>
      </div>
    </div>
  );
};

export default QuotesSearch;
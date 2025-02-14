


import React, { useState } from "react";
import {
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline'


const CreateUser: React.FC = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6  rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">CREATE USER</h2>
      <p className="text-center text-gray-600 mb-4">** Changes to User Type will restore User Permissions to default settings **</p>
      
      <div className="grid grid-cols-3 gap-4 text-gray-700">
        <div className="col-span-3 text-[#3a17c5] font-semibold">USER INFORMATION</div>
        <div className=" flex flex-col gap-2"><label htmlFor="">First Name</label><input className="p-2 border rounded" placeholder="FIRST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Last Name</label><input className="p-2 border rounded" placeholder="LAST NAME" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Email</label><input className="p-2 border rounded" type="email" placeholder="EMAIL" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Agent Code</label><input className="p-2 border rounded" placeholder="AGENT CODE" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">Company</label><input className="p-2 border rounded" placeholder="COMPANY" /></div>
        <div className=" flex flex-col gap-2"><label htmlFor="">User Type</label><select className="p-2 border rounded">
          <option>---</option>
          <option>Admin</option>
          <option>Mga</option>
          <option>Agent</option>
          <option>Read Only</option>
        </select>
        </div>
        <div className="col-span-1 space-y-2">
          <label className="block text-gray-700">STATUS</label>
          <div className="flex space-x-4">
            <label><input type="radio" name="status" value="active" /> Active</label>
            <label><input type="radio" name="status" value="inactive" /> Inactive</label>
          </div>
        </div>
        <div className="col-span-2 space-y-4">
          <label className="block text-gray-700">PASSWORD</label>
          <div className="relative">
            <input type={passwordVisible ? "text" : "password"} className="w-full p-2 border rounded" placeholder="New Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>{passwordVisible ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />}</span>
          </div>
          <div className="relative mt-2">
            <input type={confirmPasswordVisible ? "text" : "password"} className="w-full p-2 border rounded" placeholder="Re-enter Password" />
            <span className="absolute right-3 top-3 cursor-pointer" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>{confirmPasswordVisible ? <EyeIcon className="h-4 w-4" aria-hidden="true" /> : <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />}</span>
          </div>
        </div>
      </div>
      <div className=" w-full flex justify-center items-center mt-2">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition flex justify-center items-center cursor-pointer">
        CREATE USER
      </button>
      </div>
    </div>
  );
};

export default CreateUser;

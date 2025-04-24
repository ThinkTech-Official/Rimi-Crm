import React, { useContext, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LangContext } from "../context/LangContext";

const CreateUser: React.FC = () => {
  const { langauge } = useContext(LangContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6  bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-public font-[inter]">
        {langauge === "En" ? "Create Users" : "Creer Un Utilisateur"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Changes to User Type will restore User Permissions to default settings"
          : ` Les modifications apportées au type d'utilisateur restaureront les autorisations utilisateur aux paramètres par défaut `}
      </p>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">

        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">
            {langauge === "En" ? "First Name" : "Prénom"}
          </label>
          <input
            className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">
            {langauge === "En" ? "Last Name" : "Nom de famille"}
          </label>
          <input className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]" 
          placeholder="Enter Last Name" />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">Email</label>
          <input
            className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            type="email"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">
            {langauge === "En" ? "Agent Code" : `Code de l'agent`}
          </label>
          <input
            className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Agent Code"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">
            {langauge === "En" ? "Company" : "Entreprise"}
          </label>
          <input
            className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Company Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className=" font-[inter]">
            {langauge === "En" ? "User Type" : `Type d'utilisateur`}
          </label>
          <select className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]">
            <option>All</option>
            <option>Admin</option>
            <option>Mga</option>
            <option>Agent</option>
            <option>Read Only</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 col-span-1">
          <label className="block text-gray-700 font-[inter]">
            {langauge === "En" ? "Password" : "Mot De Passe"}
          </label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="w-full p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
              placeholder="Enter Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer font-[inter]"
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-1">
          <label className="block text-gray-700 font-[inter]">
            {langauge === "En"
              ? "Re-Enter Password"
              : "ENTREZ À NOUVEAU LE MOT DE PASSE"}
          </label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              className="w-full p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]"
              placeholder="Re-Enter Password"
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              {confirmPasswordVisible ? (
                <EyeIcon className="h-4 w-4" aria-hidden="true" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
              )}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2 col-span-1 ">
          <label className="block text-gray-700 font-[inter]">
            {langauge === "En" ? "Status" : "Statut"}
          </label>
          <select className="p-2 border  border-[#DBDADE] placeholder-[#00000080] font-[inter]">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className=" w-full flex justify-center items-center mt-2">
        <button className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3  hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
          {langauge === "En" ? "Create User" : "Creer Un Utilisateur"}
        </button>
      </div>
    </div>
  );
};

export default CreateUser;

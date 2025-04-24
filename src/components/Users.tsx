import React, { useContext } from "react";
import { LangContext } from "../context/LangContext";

const Users: React.FC = () => {
  const { langauge } = useContext(LangContext);

  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-2 font-[inter]">
        {langauge === "En" ? "Search Users" : "Rechercher Utilisateurs"}
      </h2>
      <p className="text-left font-semibold text-[#6A6A6A] mb-8 font-[inter]">
        {langauge === "En"
          ? "Fill in as many of the following criteria as you can to generate a search."
          : "Remplissez autant de critères suivants que possible pour générer une recherche."}
      </p>

      <div className="grid grid-cols-2 gap-x-36 gap-y-4 text-gray-700">
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "First Name" : "Prénom"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter First Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "Last Name" : "Nom de famille"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Last Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            Email
          </label>
          <input
            type="email"
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Email Address"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "Agent Code" : "Code de l'agent"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Agent Code"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "Created After" : "Créé Après"}
          </label>
          <input
            type="date"
            className="p-2 border border-[#DBDADE] font-[inter]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "Created Before" : "Créé Avant"}
          </label>
          <input
            type="date"
            className="p-2 border border-[#DBDADE] font-[inter]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "Company" : "Entreprise"}
          </label>
          <input
            className="p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]"
            placeholder="Enter Company Name"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="font-[inter]">
            {langauge === "En" ? "User Type" : "Type d'utilisateur"}
          </label>
          <select className="p-2 border border-[#DBDADE] font-[inter]">
            <option>All</option>
            <option>Admin</option>
            <option>Mga</option>
            <option>Agent</option>
            <option>Read Only</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-[inter]">
            {langauge === "En" ? "Status" : "Statut"}
          </label>
          <select className="w-full p-2 border border-[#DBDADE] placeholder-[#00000080] font-[inter]">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-2">
        <button className="w-[250px] mt-6 bg-[#2B00B7] text-white p-3 hover:bg-[#2309A1] transition flex justify-center items-center cursor-pointer font-[inter]">
          {langauge === "En" ? "Search Users" : "Rechercher Utilisateurs"}
        </button>
      </div>
    </div>
  );
};

export default Users;

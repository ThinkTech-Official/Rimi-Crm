import { useContext } from "react";
import { LangContext } from "../context/LangContext";



const Users: React.FC = () => {
  const { langauge } = useContext(LangContext)
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">{ langauge ==='En' ? 'SEARCH USERS' : 'Rechercher Utilisateurs'}</h2>
      <p className="text-center text-gray-600 mb-4">{ langauge ==='En' ? 'Fill in as many of the following criteria as you can to generate a search.' : 'Remplissez autant de critères suivants que possible pour générer une recherche.'}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'FIRST NAME' : 'PRÉNOM'}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="First Name" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'LAST NAME' : 'NOM DE FAMILLE'}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Last Name" />
        </div>
        <div>
          <label className="block text-gray-700">EMAIL</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="email" placeholder="Email" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'AGENT CODE' : `CODE D'AGENT`}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Agent Code" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'CREATED AFTER' : 'CRÉÉ APRÈS'}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="date" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'CREATED BEFORE' : 'CRÉÉ AVANT'}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="date" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'COMPANY' : 'ENTREPRISE'}</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Company" />
        </div>
        <div>
          <label className="block text-gray-700">{ langauge ==='En' ? 'USER TYPE' : `TYPE D'UTILISATEUR`}</label>
          <select className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]">
            <option>All</option>
            <option>Admin</option>
            <option>Mga</option>
            <option>Agent</option>
            <option>Read Only</option>
          </select>
        </div>
        <div className="">
          <label className="block text-gray-700">{ langauge ==='En' ? 'STATUS' : 'STATUT'}</label>
          <select className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]">
            <option>All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
        <div className="">
          
        </div>
      </div>
      <div className=" flex justify-center items-center ">
      <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer">
      { langauge ==='En' ? 'SEARCH' : 'RECHERCHE'}
      </button>
      </div>
    </div>
  );
};

export default Users;
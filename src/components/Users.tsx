


const Users: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">SEARCH USERS</h2>
      <p className="text-center text-gray-600 mb-4">Fill in as many of the following criteria as you can to generate a search.</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700">FIRST NAME</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="First Name" />
        </div>
        <div>
          <label className="block text-gray-700">LAST NAME</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Last Name" />
        </div>
        <div>
          <label className="block text-gray-700">EMAIL</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="email" placeholder="Email" />
        </div>
        <div>
          <label className="block text-gray-700">AGENT CODE</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Agent Code" />
        </div>
        <div>
          <label className="block text-gray-700">CREATED AFTER</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="date" />
        </div>
        <div>
          <label className="block text-gray-700">CREATED BEFORE</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" type="date" />
        </div>
        <div>
          <label className="block text-gray-700">COMPANY</label>
          <input className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]" placeholder="Company" />
        </div>
        <div>
          <label className="block text-gray-700">USER TYPE</label>
          <select className="w-full p-2 border rounded border-[#3a17c5] focus:outline-[#3a17c5]">
            <option>All</option>
            <option>Admin</option>
            <option>Mga</option>
            <option>Agent</option>
            <option>Read Only</option>
          </select>
        </div>
        <div className="">
          <label className="block text-gray-700">STATUS</label>
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
        SEARCH
      </button>
      </div>
    </div>
  );
};

export default Users;
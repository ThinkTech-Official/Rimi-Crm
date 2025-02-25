

export default function BulkUpload() {
  return (
    <div className="flex flex-col items-center justify-center  p-4">
    <h2 className="text-xl font-bold text-[#3a17c5]">BULK UPLOAD</h2>
    <p className="text-[#3a17c5] text-center mt-1 mb-4">
      SECURE STUDY RIMI INTERNATIONAL STUDENTS TO CANADA
    </p>
    <div className=" p-6 rounded-md shadow-2xl w-full max-w-md">
      <label className="block text-gray-600 text-sm font-semibold">CSV FILE</label>

      <input type="file" className="mt-2 mb-4 w-full text-gray-700 " />
      
      <label className="block text-gray-600 text-sm font-semibold mt-2">
        FULFILLMENT OPTIONS
      </label>
      <div className="flex items-center mt-1 mb-4">
        <input type="checkbox" id="separateEmails" className="mr-2" />
        <label htmlFor="separateEmails" className="text-gray-700">Separate Emails</label>
      </div>
      
      <label className="block text-gray-600 text-sm font-semibold">EMAIL</label>
      <input 
        type="email" 
        className="mt-2 mb-4 w-full p-2 border rounded-md" 
        placeholder="Enter your email" 
      />
      
      <button className="w-full bg-[#3a17c5] text-white font-bold py-2 rounded-md mt-2 hover:bg-[#3a17c5] cursor-pointer">
        UPLOAD CSV
      </button>
    </div>
  </div>
  )
}

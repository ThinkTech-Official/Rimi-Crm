import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

export default function BulkUpload() {
  return (
    <div className="max-w-5xl mx-auto mt-4 p-6 bg-[#F9F9F9]">
      <h2 className="text-xl font-bold text-left text-[#1B1B1B] mb-1 font-[inter]">
        Bulk Upload
      </h2>
      <p className="text-[#3a17c5] text-left mb-6 font-[inter]">
      Secure Study RIMI International Students To Canada
      </p>

      <div className="p-6 rounded-md shadow-sm bg-white w-full  font-[inter]">
        <label className="block text-gray-700 text-sm font-medium mb-2">
          CSV FILE
        </label>

        <div className="w-full border-2 border-dashed border-[#DBDADE] rounded-md p-6 flex flex-col items-center justify-center text-center mb-4 cursor-pointer hover:bg-gray-50 transition">
          <ArrowUpTrayIcon className="h-8 w-8 text-[#3a17c5]" />
          <p className="text-sm text-gray-500 mt-2">Upload CSV here</p>
          <input type="file" className="hidden" />
        </div>

        <label className="block text-gray-700 text-sm font-medium mb-2">
        Fulfillment Options
        </label>
        <div className="flex items-center mb-4">
          <input type="checkbox" id="separateEmails" className="mr-2" />
          <label htmlFor="separateEmails" className="text-gray-700 text-sm">
            Separate Emails
          </label>
        </div>

        <label className="block text-gray-700 text-sm font-medium mb-2">
          Email
        </label>
        <input
          type="email"
          className="w-full border border-[#DBDADE] p-2 text-gray-700 mb-4 placeholder-[#00000080]"
          placeholder="Enter your email"
        />

        <button className="w-full bg-[#3a17c5] text-white font-bold py-2 rounded-md mt-2 hover:bg-[#2c12a2] cursor-pointer">
          Upload CSV
        </button>
      </div>
    </div>
  );
}

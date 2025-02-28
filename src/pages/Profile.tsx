import { useState } from "react";


export default function Profile() {


    const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "ThinkTech",
    lastName: ".",
    email: "tech@thethinktech.com",
    agentCode: "TTE101",
    company: "ThinkTech",
    userType: "Admin",
    status: "Active",
    password: "",
    confirmPassword: "",
    permissions: {
      modifyPolicies: true,
      viewPolicies: false,
      readOnly: false,
      manageUsers: true,
      bulkEnrollment: true,
    },
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        permissions: { ...prev.permissions, [name]: checked },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "VIEW USER"}
      </h2>
      <div className="bg-gray-100 text-center text-gray-700 py-2 mb-4">
        ** Changes to User Type will restore User Permissions to default settings **
      </div>
      <div className="flex justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button
              className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              Save Changes
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer"
              onClick={() => setIsEditing(false)}
            >
              Discard Changes
            </button>
          </>
        ) : (
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded cursor-pointer"
            onClick={() => setIsEditing(true)}
          >
            Modify User
          </button>
        )}
      </div>

      {/* User Information */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <input type="text" name="firstName" value={formData.firstName} disabled={!isEditing} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="lastName" value={formData.lastName} disabled={!isEditing} onChange={handleChange} className="border p-2 w-full" />
          <input type="email" name="email" value={formData.email} disabled={!isEditing} onChange={handleChange} className="border p-2 w-full" />
          <input type="text" name="company" value={formData.company} disabled={!isEditing} onChange={handleChange} className="border p-2 w-full" />
          <select name="userType" value={formData.userType} disabled={!isEditing} onChange={handleChange} className="border p-2 w-full">
            <option>Admin</option>
            <option>User</option>
          </select>
          <div>
            <label>
              <input type="radio" name="status" value="Active" checked={formData.status === "Active"} disabled={!isEditing} onChange={handleChange} /> Active
            </label>
            <label>
              <input type="radio" name="status" value="Inactive" checked={formData.status === "Inactive"} disabled={!isEditing} onChange={handleChange} /> Inactive
            </label>
          </div>
          {isEditing && (
            <>
              <input type="password" name="password" placeholder="New Password" onChange={handleChange} className="border p-2 w-full" />
              <input type="password" name="confirmPassword" placeholder="Re-enter Password" onChange={handleChange} className="border p-2 w-full" />
            </>
          )}
        </div>
      </div>

      {/* User Permissions */}
      <div className="border border-gray-300 rounded-lg p-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER PERMISSIONS</h3>
        <div className="text-gray-700 space-y-2">
        {Object.keys(formData.permissions).map((key) => {
  const typedKey = key as keyof typeof formData.permissions;
  return (
    <label key={key} className="block">
      <input
        type="checkbox"
        name={key}
        checked={formData.permissions[typedKey]} // Use typedKey
        disabled={!isEditing}
        onChange={handleChange}
        className="mr-2"
      />
      {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
    </label>
  );
})}
        </div>
      </div>
      {isEditing && (
        <button className="mt-4 px-6 py-2 bg-[#3a17c5] text-white rounded w-full cursor-pointer" onClick={() => setIsEditing(false)}>
          SAVE CHANGES
        </button>
      )}
    </div>
  )
}



import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileForm } from "../utils/types";

// Permission definitions
const adminPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const agentPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const mgaPermission   = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const readOnlyPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };

// Map userType → permissions
const PERMISSIONS_MAP: Record<string, typeof adminPermission> = {
  ADMIN: adminPermission,
  AGENT: agentPermission,
  MGA: mgaPermission,
  READONLY: readOnlyPermission,
};

export default function Profile() {
  const { profile, loading, error } = useProfile();
  const [isEditing, setIsEditing] = useState(false);

  // formData holds everything we need to render (and eventually save)
  const [formData, setFormData] = useState<ProfileForm>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    agentCode: "",
    company: "",
    userType: "",
    status: "",
    docLink1: "",
    docLink2: "",
    docLink3: "",
    validUpto: "",
    mgaId: null,
    agentCodes: [],
    password: "",
    confirmPassword: "",
  });

  // Seed formData when profile arrives
  useEffect(() => {
    if (!profile) return;
    setFormData({
      ...profile,
      password: "",
      confirmPassword: "",
    });
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, type, value } = e.target;
    // only HTMLInputElement has .checked, so we cast:
    const checked = (e.target as HTMLInputElement).checked;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  if (loading) return <p>Loading profile…</p>;
  if (error)   return <p className="text-red-500">Error: {error}</p>;

  // Always derive permissions from the current userType
  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "VIEW USER"}
      </h2>

      <div className="bg-gray-100 text-center text-gray-700 py-2 mb-4">
        ** Changes to User Type will restore User Permissions to default settings **
      </div>

      {/* Edit / Save buttons */}
      <div className="flex justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button
              onClick={() => {
                // TODO: dispatch save action
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => {
                // reset edits
                setFormData((prev) => ({
                  ...prev,
                  ...profile!,
                  password: "",
                  confirmPassword: "",
                }));
                setIsEditing(false);
              }}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
            >
              Discard Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
          >
            Modify User
          </button>
        )}
      </div>

      {/* User Information */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <input
            name="firstName"
            value={formData.firstName}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="lastName"
            value={formData.lastName}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="email"
            type="email"
            value={formData.email}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="company"
            value={formData.company}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          />

          <select
            name="userType"
            value={formData.userType}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="MGA">MGA</option>
            <option value="READONLY">Read Only</option>
          </select>

          <div>
            <label className="mr-4">
              <input
                type="radio"
                name="status"
                value="Active"
                checked={formData.status === "ACTIVE"}
                disabled={!isEditing}
                onChange={handleChange}
                className="mr-1"
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Inactive"
                checked={formData.status === "INACTIVE"}
                disabled={!isEditing}
                onChange={handleChange}
                className="mr-1"
              />
              Inactive
            </label>
          </div>

          {isEditing && (
            <>
              <input
                name="password"
                type="password"
                placeholder="New Password"
                onChange={handleChange}
                className="border p-2 w-full"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Re-enter Password"
                onChange={handleChange}
                className="border p-2 w-full"
              />
            </>
          )}
        </div>
      </div>

      {/* User Permissions (always read‑only) */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER PERMISSIONS</h3>
        <div className="text-gray-700 space-y-2">
          {Object.entries(currentUserPermissions).map(([key, allowed]) => (
            <label key={key} className="block">
              <input
                type="checkbox"
                checked={allowed}
                disabled
                className="mr-2"
              />
              {key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      {/* If MGA, show their agentCodes */}
      {formData.agentCodes?.length! > 0 && (
  <div className="border border-gray-300 rounded-lg p-4 mb-4">
    <h3 className="text-[#3a17c5] font-semibold mb-2">
      ASSIGNED AGENT CODES
    </h3>
    <ul className="list-disc list-inside text-gray-700">
      {formData.agentCodes!.map((code) => (
        <li key={code}>{code}</li>
      ))}
    </ul>
  </div>
)}

      {/* Final Save button if editing */}
      {isEditing && (
        <button
          onClick={() => {
            /* same save logic as above */
            setIsEditing(false);
          }}
          className="mt-4 px-6 py-2 bg-[#3a17c5] text-white rounded w-full"
        >
          SAVE CHANGES
        </button>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileForm } from "../utils/types";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { API_BASE } from "../utils/urls";

// Permission definitions
const adminPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const agentPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const mgaPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const readOnlyPermission = {
  modifyPolicies: true,
  viewPolicies: false,
  readOnly: false,
  manageUsers: true,
  bulkEnrollment: true,
};
const PERMISSIONS_MAP: Record<string, typeof adminPermission> = {
  ADMIN: adminPermission,
  AGENT: agentPermission,
  MGA: mgaPermission,
  READONLY: readOnlyPermission,
};

export default function Profile() {
  const { profile, loading, error, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
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
    createdAt: "",
    updatedAt: "",
    mgaId: null,
    agentCodes: [],
  });
  // Local state for files to upload
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    doc1: null,
    doc2: null,
    doc3: null,
  });
  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!profile) return;
    console.log(
      "inside profile component checking updated data structure",
      profile
    );
    setFormData(profile);
    setPasswords({ password: "", confirmPassword: "" });
    setFiles({ doc1: null, doc2: null, doc3: null });
  }, [profile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: fileList && fileList[0] ? fileList[0] : null,
    }));
  };

  const handlePassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = new FormData();
      // append files if selected
      Object.entries(files).forEach(([key, file]) => {
        if (file) payload.append("documents", file);
      });
      // append password fields
      if (passwords.password) payload.append("password", passwords.password);
      if (passwords.confirmPassword)
        payload.append("confirmPassword", passwords.confirmPassword);

      const updated = await updateProfile(payload);
      // reset local edit state
      setIsEditing(false);
    } catch (err: any) {
      alert(`Error updating profile: ${err.message}`);
    }
  };

  if (loading) return <p>Loading profile…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
  const docs = [formData.docLink1, formData.docLink2, formData.docLink3].filter(
    Boolean
  );

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "VIEW USER"}
      </h2>

      <div className="flex justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
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

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <input
            name="agentCode"
            value={formData.agentCode}
            disabled={!isEditing}
            className="border p-2 w-full bg-gray-100"
          />
          <input
            value={formData.firstName}
            disabled
            className="border p-2 w-full bg-gray-100"
          />
          <input
            value={formData.lastName}
            disabled
            className="border p-2 w-full bg-gray-100"
          />
          <input
            value={formData.email}
            disabled
            type="email"
            className="border p-2 w-full bg-gray-100"
          />
          <input
            value={formData.company}
            disabled
            className="border p-2 w-full bg-gray-100"
          />
          <select
            value={formData.userType}
            disabled
            className="border p-2 w-full bg-gray-100"
          >
            <option>ADMIN</option>
            <option>AGENT</option>
            <option>MGA</option>
            <option>READONLY</option>
          </select>
          <div className="flex items-center space-x-2">
            <span>Status:</span>
            <span className="px-2 py-1 bg-gray-200 rounded">
              {formData.status}
            </span>
          </div>
          <div className="flex flex-col">
            <label>Created At</label>
            <input
              value={new Date(formData.createdAt).toLocaleString()}
              disabled
              className="border p-2 bg-gray-100"
            />
          </div>

          {formData.validUpto && (
            <div className="flex flex-col">
              <label>Valid Upto</label>
              <input
                type="date"
                value={formData.validUpto.slice(0, 10)}
                disabled
                className="border p-2 bg-gray-100"
              />
            </div>
          )}

          {isEditing && (
            <>
              <input
                name="password"
                type="password"
                placeholder="New Password"
                value={passwords.password}
                onChange={handlePassChange}
                className="border p-2 w-full"
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={passwords.confirmPassword}
                onChange={handlePassChange}
                className="border p-2 w-full"
              />
              <input
                name="doc1"
                type="file"
                onChange={handleFileChange}
                className="border p-2 w-full"
              />
              <input
                name="doc2"
                type="file"
                onChange={handleFileChange}
                className="border p-2 w-full"
              />
              <input
                name="doc3"
                type="file"
                onChange={handleFileChange}
                className="border p-2 w-full"
              />
            </>
          )}
        </div>
      </div>

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER PERMISSIONS</h3>
        {Object.entries(currentUserPermissions).map(([key, allowed]) => (
          <label key={key} className="block text-gray-700">
            <input
              type="checkbox"
              checked={allowed}
              disabled
              className="mr-2"
            />
            {key}
          </label>
        ))}
      </div>

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

      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">DOCUMENTS</h3>
        {docs.length > 0 ? (
          <ul className="space-y-2">
            {docs.map((link, idx) => {
              const filename = link.split("/").pop();
              return (
                <li key={idx}>
                  <a
                    href={`${API_BASE}${link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-blue-600 hover:underline"
                  >
                    <DocumentIcon className="h-5 w-5" />
                    {filename}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-gray-500">No documents attached</p>
        )}
      </div>
    </div>
  );
}

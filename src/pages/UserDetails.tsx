import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDetails } from "../hooks/useUserDetails";
import { ProfileForm } from "../utils/types";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { API_BASE } from "../utils/urls";

// Permission definitions and map
const adminPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const agentPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const mgaPermission   = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const readOnlyPermission = { modifyPolicies: true, viewPolicies: false, readOnly: false, manageUsers: true, bulkEnrollment: true };
const PERMISSIONS_MAP: Record<string, typeof adminPermission> = {
  ADMIN: adminPermission,
  AGENT: agentPermission,
  MGA: mgaPermission,
  READONLY: readOnlyPermission,
};

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const currentUserType = useSelector((state: any) => state.auth.user?.userType) as string;
  const { user, loading, error, save, saving, saveError } = useUserDetails(id!);

  // Redirect non-admins
  useEffect(() => {
    
    // if (currentUserType !== 'ADMIN') {
    //   navigate('/');
    // }
  }, [currentUserType, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({ doc1: null, doc2: null, doc3: null });
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
    createdAt: "",
    updatedAt: ""
  });

  useEffect(() => {
    if (user) {
      setFormData({ ...user, password: "", confirmPassword: "" });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    setFiles(prev => ({ ...prev, [name]: fileList && fileList[0] ? fileList[0] : null }));
  };

  const handleSave = async () => {
    try {
      await save(formData, files);
      setIsEditing(false);
      // optionally reset passwords, etc.
    } catch {
      alert(saveError || 'Save failed');
    }
  };

  if (loading) return <p>Loading user…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
  const docs = [formData.docLink1, formData.docLink2, formData.docLink3].filter(Boolean);

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
            <button onClick={handleSave} className="px-4 py-2 bg-green-500 text-white rounded">
              Save Changes
            </button>
            <button onClick={() => { setFormData({ ...user!, password: '', confirmPassword: '' }); setIsEditing(false); }} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
              Discard Changes
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-gray-300 text-gray-700 rounded">
            Modify User
          </button>
        )}
      </div>

      {/* User Information */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER INFORMATION</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
        <input
            name="agentCode"
            value={formData.agentCode}
            disabled={!isEditing}
            onChange={handleChange}
            className="border p-2 w-full"
          />
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
                value="ACTIVE"
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
                value="INACTIVE"
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

      {/* Permissions */}
      <div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">USER PERMISSIONS</h3>
        <div className="text-gray-700 space-y-2">
          {Object.entries(currentUserPermissions).map(([k, v]) => (
            <label key={k} className="block">
              <input type="checkbox" checked={v} disabled className="mr-2" />
              {k.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      {/* MGA agentCodes */}
      {formData.agentCodes?.length! > 0 && (
        <div className="border border-gray-300 rounded-lg p-4 mb-4">
          <h3 className="text-[#3a17c5] font-semibold mb-2">
            ASSIGNED AGENT CODES
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {formData.agentCodes!.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      )}

<div className="border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-[#3a17c5] font-semibold mb-2">DOCUMENTS</h3>
        {docs.length > 0 ? (
          <ul className="space-y-2">
            {docs.map((link, idx) => {
              const filename = link!.split("/").pop();
              return (
                <li key={idx}>
                  <a href={`${API_BASE}${link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-600 hover:underline">
                    <DocumentIcon className="h-5 w-5" />{filename}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : <p className="text-gray-500">No documents attached</p>}
        {isEditing && (
          <div className="flex flex-col gap-3 mt-2">
            <input name="doc1" type="file" onChange={handleFileChange} className="border p-2 w-full" />
            <input name="doc2" type="file" onChange={handleFileChange} className="border p-2 w-full" />
            <input name="doc3" type="file" onChange={handleFileChange} className="border p-2 w-full" />
          </div>
        )}
      </div>
    </div>
  );
}

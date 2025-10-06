import { useEffect, useState } from "react";
import { useProfile } from "../hooks/useProfile";
import { ProfileForm } from "../utils/types";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { API_BASE } from "../utils/urls";
import { MdCancel } from "react-icons/md";

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
  const handleFileSize = (file: File) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB.toFixed(2);
  };

  const handleRemoveFile = (fileName: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: null,
    }));
  };

  if (loading) return <p>Loading profile…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
  const docs = [formData.docLink1, formData.docLink2, formData.docLink3].filter(
    Boolean
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-6 sm:p-6 bg-greyBg">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "USER PROFILE"}
      </h2>

      <div className="flex justify-center sm:justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button onClick={handleSave} className="btn-primary">
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-white border border-inputBorder text-gray-700 hover:border-gray-600 transition cursor-pointer"
            >
              Discard Changes
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-primary">
            Modify User
          </button>
        )}
      </div>

      <div className="border border-inputBorder bg-white p-4 mb-4">
        <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
          User Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm">
              First Name
            </label>
            <input
              value={formData.firstName}
              disabled
              className="input-primary2 bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <input
              value={formData.lastName}
              disabled
              className="input-primary2 bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              value={formData.email}
              disabled
              type="email"
              className="input-primary2 bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="text-sm">
              Company
            </label>
            <input
              value={formData.company}
              disabled
              className="input-primary2 bg-gray-100"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="userType" className="text-sm">
              User Type
            </label>
            <select
              value={formData.userType}
              disabled
              className="input-primary2 bg-gray-100"
            >
              <option>ADMIN</option>
              <option>AGENT</option>
              <option>MGA</option>
              <option>READONLY</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="createdAt" className="text-sm">
              Created At (dd-mm-yyyy)
            </label>
            <input
              value={new Date(formData.createdAt).toLocaleDateString()}
              disabled
              className="input-primary2 bg-gray-100"
            />
          </div>

          {formData.validUpto && (
            <div className="flex flex-col gap-1">
              <label htmlFor="validUpto" className="text-sm">
                Valid Upto (dd-mm-yyyy)
              </label>
              <input
                value={new Date(formData.validUpto).toLocaleDateString()}
                disabled
                className="input-primary2 bg-gray-100"
              />
            </div>
          )}
          <div className="flex items-center space-x-2 mt-5">
            <span>Status:</span>
            <span className="px-2 py-1 bg-gray-100">{formData.status}</span>
          </div>
          {isEditing && (
            <>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="password" className="text-sm">
                  New Password
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="New Password"
                  value={passwords.password}
                  onChange={handlePassChange}
                  className="input-primary"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="confirmPassword" className="text-sm">
                  Confirm Password
                </label>
                <input
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={passwords.confirmPassword}
                  onChange={handlePassChange}
                  className="input-primary"
                />
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border border-inputBorder bg-white p-4 mb-4">
        <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
          User Permissions
        </h3>
        {Object.entries(currentUserPermissions).map(([key, allowed]) => (
          <label key={key} className="block text-gray-700 capitalize">
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
        <div className="border border-inputBorder bg-white p-4 mb-4">
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

      <div className="border border-inputBorder bg-white p-4 mb-4">
        <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
          Documents
        </h3>
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
                    className="flex items-center gap-2 text-text-secondary hover:underline"
                  >
                    <DocumentIcon className="h-5 w-5 text-text-primary" />
                    {filename}
                  </a>
                </li>
              );
            })}
            {isEditing && (
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="doc1" className="text-sm">
                      Document 1
                    </label>
                    <label className="input-primary cursor-pointer">
                      Choose File
                      <input
                        name="doc1"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {files.doc1 && (
                      <div className="flex gap-2">
                        <p className="text-sm">
                          {files.doc1.name} - {handleFileSize(files.doc1)} MB
                        </p>
                        <MdCancel
                          size={18}
                          className="text-text-primary cursor-pointer"
                          onClick={() => handleRemoveFile("doc1")}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Document 1 Valid Upto</label>
                    <input
                      name="doc1"
                      type="date"
                      onChange={handleFileChange}
                      className="input-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="doc2" className="text-sm">
                      Document 2
                    </label>
                    <label className="input-primary cursor-pointer">
                      Choose File
                      <input
                        name="doc2"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {files.doc2 && (
                      <div className="flex gap-2">
                        <p className="text-sm">
                          {files.doc2.name} - {handleFileSize(files.doc2)} MB
                        </p>
                        <MdCancel
                          size={18}
                          className="text-text-primary cursor-pointer"
                          onClick={() => handleRemoveFile("doc2")}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Document 2 Valid Upto</label>
                    <input
                      name="doc2"
                      type="date"
                      onChange={handleFileChange}
                      className="input-primary"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex flex-col gap-1 w-full">
                    <label htmlFor="doc1" className="text-sm">
                      Document 3
                    </label>
                    <label className="input-primary cursor-pointer">
                      Choose File
                      <input
                        name="doc3"
                        type="file"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>

                    {files.doc3 && (
                      <div className="flex gap-2">
                        <p className="text-sm">
                          {files.doc3.name} - {handleFileSize(files.doc3)} MB
                        </p>
                        <MdCancel
                          size={18}
                          className="text-text-primary cursor-pointer"
                          onClick={() => handleRemoveFile("doc3")}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 w-full">
                    <label className="text-sm">Document 3 Valid Upto</label>
                    <input
                      name="doc3"
                      type="date"
                      onChange={handleFileChange}
                      className="input-primary"
                    />
                  </div>
                </div>
              </div>
            )}
          </ul>
        ) : (
          <p className="text-gray-500">No documents attached</p>
        )}
      </div>
    </div>
  );
}

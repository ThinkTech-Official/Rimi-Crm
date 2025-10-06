import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDetails } from "../hooks/useUserDetails";
import { DocumentIcon } from "@heroicons/react/24/outline";
import { API_BASE } from "../utils/urls";
import Spinner from "../components/Spinner";
import { MdCancel } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";

// Interface for the form data
export interface UserFormData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string;
  userType: string;
  status: string;
  allowBulkUpload: boolean;
  docLink1?: string;
  docLink2?: string;
  // docLink3?: string;
  validUpto?: string;
  validUpto2?: string;
  mgaId?: string | null;
  agentCodes?: string[];
  newPwd?: string;
  confirmPwd?: string;
  // doc1ValidUpto?: string;
  // doc2ValidUpto?: string;
  // doc3ValidUpto?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Permission definitions and map
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

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token) as string | null;
  const currentUserType = useSelector(
    (state: any) => state.auth.user?.userType
  ) as string;
  const { user, loading, error, save, saving, saveError } = useUserDetails(id!);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
    watch,
  } = useForm<UserFormData>();

  // Redirect non-admins
  useEffect(() => {
    // if (currentUserType !== 'ADMIN') {
    //   navigate('/');
    // }
  }, [currentUserType, navigate]);

  const [isEditing, setIsEditing] = useState(false);
  const [files, setFiles] = useState<{ [key: string]: File | null }>({
    doc1: null,
    doc2: null,
    // doc3: null,
  });

  useEffect(() => {
    if (user) {
      console.log(user);
      console.log(typeof user.allowBulkUpload);
      reset({
        ...user,
        validUpto: user.validUpto ? user.validUpto.split("T")[0] : "",
        validUpto2: user.validUpto2 ? user.validUpto2.split("T")[0] : "",
        newPwd: "",
        confirmPwd: "",
      });
    }
  }, [user, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    setFiles((prev) => ({
      ...prev,
      [name]: fileList && fileList[0] ? fileList[0] : null,
    }));
  };

  const onSubmit = async (data: UserFormData) => {
    try {
      await save(data as UserFormData, files);
      setIsEditing(false);
    } catch {
      alert(saveError || "Save failed");
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

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center gap-3 fixed top-1/2 left-1/2">
        <Spinner className="w-10 h-10" />
        <p>Loading...</p>
      </div>
    );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const formData = watch();
  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};
  const docs = [formData.docLink1, formData.docLink2].filter(
    Boolean
  );

  return (
    <div className="max-w-5xl mx-auto px-2 py-6 sm:p-6 bg-greyBg">
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? "MODIFY USER" : "VIEW USER"}
      </h2>
      <div className="bg-white text-center text-text-secondary py-2 mb-4">
        ** Changes to User Type will restore User Permissions to default
        settings **
      </div>

      <div className="flex justify-center sm:justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button onClick={handleSubmit(onSubmit)} className="btn-primary">
              Save Changes
            </button>
            <button
              onClick={() => {
                reset({
                  ...user!,
                  newPwd: "",
                  confirmPwd: "",
                });
                setIsEditing(false);
              }}
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

      {/* User Information */}
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
              {...register("firstName", {
                required: "First name is required",
                setValueAs: (value) => value.trim(),
              })}
              disabled={!isEditing}
              className="input-primary"
            />
            {errors.firstName && (
              <span className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="lastName" className="text-sm">
              Last Name
            </label>
            <input
              {...register("lastName", {
                required: "Last name is required",
                setValueAs: (value) => value.trim(),
              })}
              disabled={!isEditing}
              className="input-primary"
            />
            {errors.lastName && (
              <span className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="agentCode" className="text-sm">
              Agent Code
            </label>
            <input
              {...register("agentCode", {
                required: "Agent code is required",
                setValueAs: (value) => value.trim(),
              })}
              disabled={!isEditing}
              className="input-primary"
            />
            {errors.agentCode && (
              <span className="text-red-500 text-xs">
                {errors.agentCode.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm">
              Email
            </label>
            <input
              {...register("email", {
                setValueAs: (value) => value.trim().toLowerCase(),
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              disabled={!isEditing}
              className="input-primary"
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="company" className="text-sm">
              Company
            </label>
            <input
              {...register("company", {
                required: "Company is required",
                setValueAs: (value) => value.trim(),
              })}
              disabled={!isEditing}
              className="input-primary"
            />
            {errors.company && (
              <span className="text-red-500 text-xs">
                {errors.company.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userType" className="text-sm">
              User Type
            </label>
            <select
              {...register("userType", {
                required: "User type is required",
              })}
              disabled={!isEditing}
              className="input-primary"
            >
              <option value="ADMIN">Admin</option>
              <option value="AGENT">Agent</option>
              <option value="MGA">MGA</option>
              <option value="READONLY">Read Only</option>
            </select>
            {errors.userType && (
              <span className="text-red-500 text-xs">
                {errors.userType.message}
              </span>
            )}
          </div>
          {isEditing && (
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="newPwd" className="text-sm">
                Password
              </label>
              <input
                {...register("newPwd", {
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  validate: {
                    hasLetter: (value) =>
                      !value ||
                      /[A-Za-z]/.test(value) ||
                      "Password must contain at least one letter",
                    hasNumber: (value) =>
                      !value ||
                      /\d/.test(value) ||
                      "Password must contain at least one number",
                  },
                })}
                type="password"
                placeholder="New Password"
                className="input-primary"
              />
              {errors.newPwd && (
                <span className="text-red-500 text-xs">
                  {errors.newPwd.message}
                </span>
              )}
            </div>
          )}
          {isEditing && (
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="confirmPwd" className="text-sm">
                Confirm Password
              </label>
              <input
                {...register("confirmPwd", {
                  validate: (value) =>
                    !watch("newPwd") ||
                    value === watch("newPwd") ||
                    "Passwords don't match",
                })}
                type="password"
                placeholder="Re-enter Password"
                className="input-primary"
              />
              {errors.confirmPwd && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPwd.message}
                </span>
              )}
            </div>
          )}
          <div className="flex flex-col gap-1">
            <label htmlFor="allowBulkUpload" className="text-sm">
              Allow Bulk Upload
            </label>
            <div>
              <Controller
                name="allowBulkUpload"
                control={control}
                render={({ field }) => (
                  <>
                    <label className="mr-4">
                      <input
                        type="radio"
                        checked={field.value === true}
                        disabled={!isEditing}
                        onChange={() => field.onChange(true)}
                        className="mr-1"
                      />
                      Yes
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={field.value === false}
                        disabled={!isEditing}
                        onChange={() => field.onChange(false)}
                        className="mr-1"
                      />
                      No
                    </label>
                  </>
                )}
              />
              {errors.allowBulkUpload && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.allowBulkUpload.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="status" className="text-sm">
              Status
            </label>
            <div>
              <Controller
                name="status"
                control={control}
                rules={{ required: "Status is required" }}
                render={({ field }) => (
                  <>
                    <label className="mr-4">
                      <input
                        type="radio"
                        value="ACTIVE"
                        checked={field.value === "ACTIVE"}
                        disabled={!isEditing}
                        onChange={() => field.onChange("ACTIVE")}
                        className="mr-1"
                      />
                      Active
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="INACTIVE"
                        checked={field.value === "INACTIVE"}
                        disabled={!isEditing}
                        onChange={() => field.onChange("INACTIVE")}
                        className="mr-1"
                      />
                      Inactive
                    </label>
                  </>
                )}
              />
              {errors.status && (
                <span className="text-red-500 text-xs block mt-1">
                  {errors.status.message}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Permissions */}
      <div className="border border-inputBorder bg-white p-4 mb-4">
        <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
          User Permissions
        </h3>
        <div className="text-gray-700 space-y-2">
          {Object.entries(currentUserPermissions).map(([k, v]) => (
            <label key={k} className="block">
              <input type="checkbox" checked={v} disabled className="mr-2" />
              {k
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase())}
            </label>
          ))}
        </div>
      </div>

      {/* MGA agentCodes */}
      {formData.agentCodes?.length! > 0 && (
        <div className="border border-inputBorder bg-white p-4 mb-4">
          <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
            ASSIGNED AGENT CODES
          </h3>
          <ul className="list-disc list-inside text-gray-700">
            {formData.agentCodes!.map((c) => (
              <li key={c}>{c}</li>
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
              const filename = link!.split("/").pop();
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
          </ul>
        ) : (
          <p className="text-gray-500">No documents attached</p>
        )}
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
                  {...register("validUpto")}
                  type="date"
                  className="input-primary"
                  disabled={!isEditing}
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
                  {...register("validUpto2")}
                  type="date"
                  className="input-primary"
                  disabled={!isEditing}
                />
              </div>
            </div>
            {/* <div className="flex gap-4">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="doc3" className="text-sm">
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
                  {...register("doc3ValidUpto")}
                  type="date"
                  className="input-primary"
                  disabled={!isEditing}
                />
              </div>
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
}



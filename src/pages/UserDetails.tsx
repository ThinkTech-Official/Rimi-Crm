import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useUserDetails } from "../hooks/useUserDetails";
import { DocumentIcon } from "@heroicons/react/24/outline";
import Spinner from "../components/Spinner";
import { MdCancel } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { useLanguage } from "../context/LanguageContext";
import { getApplicantTypeBadge } from "../utils/getApplicantTypeBadge";
import useNotification from "../hooks/useNotification";

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
  docLink3?: string;
  docLink4?: string;
  docType1?: string;
  docType2?: string;
  docType3?: string;
  docType4?: string;
  phoneNumber?: string;
  mgaId?: string | null;
  agentCodes?: string[];
  newPwd?: string;
  confirmPwd?: string;
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
  const { t } = useLanguage();
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
  const { triggerNotification, NotificationComponent } = useNotification();

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
    doc3: null,
    doc4: null,
  });

  useEffect(() => {
    if (user) {
      console.log("User", user);
      reset({
        ...user,
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
      triggerNotification({
        type: "success",
        message: t("User details updated successfully"),
      });
      setIsEditing(false);
    } catch {
      triggerNotification({
        type: "error",
        message: saveError || t("Save failed"),
      });
    }
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
        <p>{t("Loading...")}</p>
      </div>
    );
  if (error) return <p className="text-red-500">{t("Error")}: {error}</p>;

  const formData = watch();

  const formatDocType = (type: string | undefined, defaultLabel: string) => {
    if (!type) return defaultLabel;
    return type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const currentUserPermissions = PERMISSIONS_MAP[formData.userType] || {};

  const documentFields = [
    {
      key: "doc1",
      link: formData.docLink1,
      typeKey: "docType1" as const,
      label: formatDocType(formData.docType1, "Insurance License"),
    },
    {
      key: "doc2",
      link: formData.docLink2,
      typeKey: "docType2" as const,
      label: formatDocType(formData.docType2, "E&O Insurance"),
    },
    {
      key: "doc3",
      link: formData.docLink3,
      typeKey: "docType3" as const,
      label: formatDocType(formData.docType3, "Bank Details"),
    },
    {
      key: "doc4",
      link: formData.docLink4,
      typeKey: "docType4" as const,
      label: formatDocType(formData.docType4, "Agency Agreement"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-2 py-6 sm:p-6 bg-greyBg">
      {NotificationComponent}
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {isEditing ? t("MODIFY USER") : t("VIEW USER")}
      </h2>
      <div className="bg-white text-center text-text-secondary py-2 mb-4">
        {t("** Changes to User Type will restore User Permissions to default settings **")}
      </div>

      <div className="flex justify-center sm:justify-end space-x-2 mb-4">
        {isEditing ? (
          <>
            <button onClick={handleSubmit(onSubmit)} className="btn-primary">
              {t("Save Changes")}
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
              {t("Discard Changes")}
            </button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="btn-primary">
            {t("Modify User")}
          </button>
        )}
      </div>

      {/* User Information */}
      <div className="border border-inputBorder bg-white p-4 mb-4 relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
            {formData.userType}
          </span>
            {getApplicantTypeBadge(formData)}
        </div>
        <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
          {t("User Information")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          <div className="flex flex-col gap-1">
            <label htmlFor="firstName" className="text-sm">
              {t("First Name")}
            </label>
            <input
              {...register("firstName", {
                required: t("First name is required"),
                setValueAs: (value) => value?.trim() || "",
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
              {t("Last Name")}
            </label>
            <input
              {...register("lastName", {
                required: t("Last name is required"),
                setValueAs: (value) => value?.trim() || "",
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
              {t("Agent Code")}
            </label>
            <input
              {...register("agentCode", {
                required: t("Agent code is required"),
                setValueAs: (value) => value?.trim() || "",
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
              {t("Email")}
            </label>
            <input
              {...register("email", {
                setValueAs: (value) => value?.trim()?.toLowerCase() || "",
                required: t("Email is required"),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t("Invalid email address"),
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
              {t("Company")}
            </label>
            <input
              {...register("company", {
                required: t("Company name is required"),
                setValueAs: (value) => value?.trim() || "",
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
            <label htmlFor="phoneNumber" className="text-sm">
              {t("Phone Number")}
            </label>
            <input
              {...register("phoneNumber", {
                setValueAs: (value) => value?.trim() || "",
              })}
              disabled={!isEditing}
              className="input-primary"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="userType" className="text-sm">
              {t("User Type")}
            </label>
            <select
              {...register("userType", {
                required: t("User type is required"),
              })}
              disabled={!isEditing}
              className="input-primary"
            >
              <option value="ADMIN">{t("Admin")}</option>
              <option value="AGENT">{t("Agent")}</option>
              <option value="MGA">{t("MGA")}</option>
              <option value="READONLY">{t("Read Only")}</option>
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
                {t("Password")}
              </label>
              <input
                {...register("newPwd", {
                  setValueAs: (value) => value?.trim() || "",
                  minLength: {
                    value: 6,
                    message: t("Minimum length is 6"),
                  },
                  validate: {
                    hasLetter: (value) =>
                      !value ||
                      /[A-Za-z]/.test(value) ||
                      t("Password must contain at least one letter"),
                    hasNumber: (value) =>
                      !value ||
                      /\d/.test(value) ||
                      t("Password must contain at least one number"),
                  },
                })}
                type="password"
                placeholder={t("New Password")}
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
                {t("Confirm Password")}
              </label>
              <input
                {...register("confirmPwd", {
                  setValueAs: (value) => value?.trim() || "",
                  validate: (value) =>
                    !watch("newPwd") ||
                    value === watch("newPwd") ||
                    t("Passwords don't match"),
                })}
                type="password"
                placeholder={t("Re-enter Password")}
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
              {t("Allow Bulk Upload")}
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
                      {t("Yes")}
                    </label>
                    <label>
                      <input
                        type="radio"
                        checked={field.value === false}
                        disabled={!isEditing}
                        onChange={() => field.onChange(false)}
                        className="mr-1"
                      />
                      {t("No")}
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
              {t("Status")}
            </label>
            <div>
              <Controller
                name="status"
                control={control}
                rules={{ required: t("Status is required") }}
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
                      {t("Active")}
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
                      {t("Inactive")}
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
          {t("User Permissions")}
        </h3>
        <div className="text-gray-700 space-y-2">
          {Object.entries(currentUserPermissions).map(([k, v]) => (
            <label key={k} className="block">
              <input type="checkbox" checked={v} disabled className="mr-2" />
              {t(k
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (s) => s.toUpperCase()))}
            </label>
          ))}
        </div>
      </div>

      {/* MGA agentCodes */}
      {formData.agentCodes?.length! > 0 && (
        <div className="border border-inputBorder bg-white p-4 mb-4">
          <h3 className="text-primary font-semibold mb-2 capitalize text-lg">
            {t("ASSIGNED AGENT CODES")}
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
          {t("Documents")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 gap-y-1">
          {documentFields.map((doc) => (
            <div key={doc.key} className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <DocumentIcon className="h-4 w-4 text-text-primary" />
                    <a href={doc.link} target="_blank" rel="noopener noreferrer" className="font-medium text-gray-700 hover:text-primary hover:underline">
                    {t(doc.label)}
                  </a>
                  </div>
                  {/* {doc.link ? (
                <div className="flex items-center gap-2">
                  <DocumentIcon className="h-8 w-8 text-text-primary" />
                  <a
                    href={`${doc.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-secondary hover:underline text-sm line-clamp-1"
                  >
                    {doc.link.split("/").pop()}
                  </a>
                </div>
              ) : (
                <p className="text-gray-400 text-sm">{t("No document attached")}</p>
              )} */}

              {isEditing && (
                <div className="mt-2 text-center">
                  <label className="input-primary cursor-pointer text-sm border-dashed border-2 hover:bg-gray-50 flex items-center justify-center py-4">
                    {files[doc.key] ? (
                      <div className="flex items-center gap-2 text-indigo-600">
                        <span>{files[doc.key]!.name} (Ready)</span>
                        <MdCancel
                          size={18}
                          className="text-red-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveFile(doc.key);
                          }}
                        />
                      </div>
                    ) : (
                      t("Update Document")
                    )}
                    <input
                      name={doc.key}
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



import React, { useContext, useState, FormEvent, ChangeEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { LangContext } from "../context/LangContext";
import { useAgentCodes } from "../hooks/useAgentCodes";
import { useCreateUser } from "../hooks/useCreateUser";
import { useForm } from "react-hook-form";

type userType = "ADMIN" | "AGENT" | "READONLY" | "MGA" | "";

export interface newUser {
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string;
  userType: userType;
  status: "ACTIVE" | "INACTIVE";
  password: string;
  confirmPassword: string;
  validUpto: string;
  validUpto2: string;
  docFile1: File | null;
  docFile2: File | null;
}

const CreateUser: React.FC = () => {
  const { langauge } = useContext(LangContext);

  // ─── form fields ─────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  // const [agentCode, setAgentCode] = useState("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [userType, setUserType] = useState<userType>("ADMIN");

  // MGA-only agent selection
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  // password visibility toggles
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // ─── availability & create-user hook ────────────────────────────────────────
  const {
    checkAvailability,
    availability,
    availabilityError,
    createUser,
    loading: createLoading,
    error: createError,
    success,
  } = useCreateUser();

  // track which code we last checked
  const [lastCheckedCode, setLastCheckedCode] = useState("");

  // Validation Error State
  //  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<newUser>();
  const agentCode = watch("agentCode");
  const docFile1 = watch("docFile1");
  const docFile2 = watch("docFile2");

  // ─── auxiliary handlers ──────────────────────────────────────────────────────
  // const handleFileChange =
  //   (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
  //   (e: ChangeEvent<HTMLInputElement>) =>
  //     setter(e.target.files?.[0] ?? null);

  const generateAgentCode = () => {
    const firstName = watch("firstName");
    // if (!firstName) return;
    const prefix = firstName.trim().slice(0, 4).toUpperCase();
    const uuidPart = uuidv4().split("-")[0].toUpperCase();
    setValue("agentCode", `${prefix}${uuidPart}`);
    setLastCheckedCode(""); // force re-check
  };

  const handleCheckClick = async () => {
    const ok = await checkAvailability(agentCode);
    setLastCheckedCode(agentCode);
  };

  const onSubmit = async (newUser: newUser) => {
    if (availability !== "available" || lastCheckedCode !== agentCode) {
      return; // must confirm availability first
    }

    await createUser(newUser);
  };

  // ─── fetch MGA agents ────────────────────────────────────────────────────────
  const {
    agents,
    loading: agentsLoading,
    error: agentsError,
  } = useAgentCodes(agentSearch);

  const handleDocsChange = (
    e: ChangeEvent<HTMLInputElement>,
    docType: "docFile1" | "docFile2"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue(docType, file);
    }
  };
  const handleFileSize = (file: File) => {
    const fileSizeInMB = file.size / (1024 * 1024);
    return fileSizeInMB.toFixed(2);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-5xl mx-auto mt-4 px-2 py-4 sm:p-6 bg-[#F9F9F9]"
      noValidate
    >
      <h2 className="text-lg font-bold text-left text-[#1B1B1B] mb-2">
        {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
      </h2>
      <p className="text-left font-medium text-[#6A6A6A] mb-8">
        {langauge === "En"
          ? "** Changes to User Type will restore User Permissions to default settings **"
          : "** Les modifications apportées au type d'utilisateur restaureront les autorisations aux paramètres par défaut **"}
      </p>

      <div className="grid grid-col-3 gap-4 text-text-secondary">
        {/* First Name */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">First Name</label>
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            // value={firstName}
            // onChange={(e) => setFirstName(e.target.value)}
            className={`input-primary`}
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            // value={lastName}
            // onChange={(e) => setLastName(e.target.value)}
            className={`input-primary`}
            placeholder="Last Name"
            // required
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
            className={`input-primary ${
              errors.email ? "border-red-500" : "border-black"
            }`}
            placeholder="Email"
            // required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Agent Code + Generate / Check */}
        <div className="">
          <div className=" flex flex-col col-span-3 sm:col-span-1">
            <label className="text-sm">Agent Code</label>
            <input
              {...register("agentCode", { required: "Agent code is required" })}
              value={agentCode}
              onChange={() => {
                // setAgentCode(e.target.value);
                setLastCheckedCode("");
              }}
              className={`input-primary`}
              placeholder="Agent Code"
              // required
            />
            {errors.agentCode && (
              <p className="text-red-500 text-sm">{errors.agentCode.message}</p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="button"
              onClick={generateAgentCode}
              className="h-10 px-3 bg-gray-200 rounded hover:bg-gray-300 transition cursor-pointer"
            >
              Generate
            </button>
            <button
              type="button"
              onClick={handleCheckClick}
              disabled={!agentCode || availability === "checking"}
              className={`h-10 px-3 rounded transition ${
                lastCheckedCode === agentCode && availability === "available"
                  ? "bg-green-200 hover:bg-green-300"
                  : lastCheckedCode === agentCode && availability === "taken"
                  ? "bg-red-200 hover:bg-red-300"
                  : "bg-blue-200 hover:bg-blue-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              }`}
            >
              {availability === "checking"
                ? "Checking…"
                : lastCheckedCode === agentCode && availability === "available"
                ? "Available"
                : lastCheckedCode === agentCode && availability === "taken"
                ? "Taken"
                : "Check"}
            </button>
          </div>
        </div>
        {availabilityError && (
          <p className="text-red-500 text-sm mt-1">{availabilityError}</p>
        )}

        {/* Company */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Company</label>
          <input
            {...register("company", { required: "Company name is required" })}
            // value={company}
            // onChange={(e) => setCompany(e.target.value)}
            className="input-primary"
            placeholder="Company"
            required
          />
          {errors.company && (
            <p className="text-red-500 text-sm">{errors.company.message}</p>
          )}
        </div>

        {/* User Type */}
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <label className="text-sm">User Type</label>
          <select
            {...register("userType", { required: "User type is required" })}
            // value={userType}
            onChange={(e) => setUserType(e.target.value as any)}
            className={`input-primary`}
            // required
          >
            <option value="">-- select --</option>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="READONLY">Read Only</option>
            <option value="MGA">MGA</option>
          </select>
          {errors.userType && (
            <p className="text-red-500 text-sm">{errors.userType.message}</p>
          )}
        </div>
        {/* MGA-only: Agent Codes */}
        {userType === "MGA" && (
          <div className="col-span-3 space-y-2">
            <label className="font-semibold">Agent Codes</label>
            <input
              type="text"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full input-primary"
              placeholder="Search agent codes..."
            />
            {agentsLoading && <p>Loading agents…</p>}
            {agentsError && <p className="text-red-500">{agentsError}</p>}
            {agentSearch.length > 0 &&
              (agents.length > 0 ? (
                <div className="max-h-40 overflow-y-auto border border-inputBorder rounded p-2 space-y-1 text-sm">
                  {agents.map((code) => (
                    <label key={code} className="flex items-center 1">
                      <input
                        type="checkbox"
                        checked={selectedAgents.includes(code)}
                        onChange={(e) =>
                          setSelectedAgents((prev) =>
                            e.target.checked
                              ? [...prev, code]
                              : prev.filter((c) => c !== code)
                          )
                        }
                        className="checked:accent-primary cursor-pointer"
                      />
                      <span className="pl-1">{code}</span>
                    </label>
                  ))}
                </div>
              ) : (
                !agentsLoading && (
                  <div className="max-h-40 overflow-y-auto border border-inputBorder rounded p-2 space-y-1 text-sm">
                    <p>No agents found with code "{agentSearch}"</p>
                  </div>
                )
              ))}
            {selectedAgents.length > 0 && (
              <>
                <p className="font-medium mt-2">Selected Agents:</p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {selectedAgents.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {/* Status */}
        <div className="col-span-3 flex space-x-6 items-center">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="ACTIVE"
              checked={status === "ACTIVE"}
              onChange={() => setStatus("ACTIVE")}
              className="accent-primary cursor-pointer"
            />{" "}
            Active
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="status"
              value="INACTIVE"
              checked={status === "INACTIVE"}
              onChange={() => setStatus("INACTIVE")}
              className="accent-primary cursor-pointer"
            />{" "}
            Inactive
          </label>
        </div>

        {/* Password */}
        <div className="col-span-3 space-y-2">
          <label className="text-sm">Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Minimum length is 6" },
              })}
              className={`w-full input-primary`}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setPasswordVisible((v) => !v)}
            >
              {passwordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.password?.message}</p>
          )}

          <label className="text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full input-primary`}
              placeholder="Confirm Password"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setConfirmPasswordVisible((v) => !v)}
            >
              {confirmPasswordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Uploads */}
        <div className="flex justify-between col-span-3 gap-4">
          <div className="flex flex-col w-full">
            <label className="text-sm">Upload Document 1</label>
           <div className="flex flex-col items-start space-y-2">
              <label className="input-primary cursor-pointer">
                Choose File <span className="text-xs">(Max 5MB)</span>
                <input
                  type="file"
                  onChange={(e) => handleDocsChange(e, "docFile1")}
                  className="hidden"
                />
              </label>
              {docFile1 && (
                <p className="text-sm">
                  {docFile1.name} - {handleFileSize(docFile1)} MB
                </p>
              )}
            </div>
          </div>
          {/* Valid Upto: 1 */}
          <div className="flex flex-col w-full">
            <label className="text-sm">Valid Upto</label>
            <input
              type="date"
              {...register("validUpto", {
                required: "Valid upto date is required",
              })}
              // value={validUpto}
              // onChange={(e) => setValidUpto(e.target.value)}
              className="input-primary"
            />
            {errors.validUpto && (
              <p className="text-red-500 text-sm">{errors.validUpto.message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-between col-span-3 gap-4">
          <div className="flex flex-col w-full">
            <label className="text-sm">Upload Document 2</label>
            <div className="flex flex-col items-start space-y-2">
              <label className="input-primary cursor-pointer">
                Choose File <span className="text-xs">(Max 5MB)</span>
                <input
                  type="file"
                  onChange={(e) => handleDocsChange(e, "docFile2")}
                  className="hidden"
                />
              </label>
              {docFile2 && (
                <p className="text-sm">
                  {docFile2.name} - {handleFileSize(docFile2)} MB
                </p>
              )}
            </div>
          </div>
          {/* Valid Upto: 2 */}
          <div className="flex flex-col w-full">
            <label className="text-sm">Valid Upto</label>
            <input
              type="date"
              // {...register("validUpto2", {
              //   required: "Valid upto date is required",
              // })}
              // value={validUpto}
              // onChange={(e) => setValidUpto(e.target.value)}
              className="input-primary"
            />
            {errors.validUpto2 && (
              <p className="text-red-500 text-sm">{errors.validUpto2.message}</p>
            )}
          </div>
        </div>
        {/* <div className="col-span-3 flex flex-col 1">
          <label className="text-sm">Upload Document 3</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("docFile3")}
            // onChange={handleFileChange(setDocFile3)}
            className="input-primary"
          />
        </div> */}
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col items-center">
        <button
          type="submit"
          disabled={
            createLoading ||
            !(lastCheckedCode === agentCode && availability === "available")
          }
          className="btn-primary"
        >
          {createLoading
            ? langauge === "En"
              ? "CREATING…"
              : "CRÉATION…"
            : langauge === "En"
            ? "CREATE USER"
            : "CRÉER UN UTILISATEUR"}
        </button>
        {createError && <p className="mt-2 text-red-500">{createError}</p>}
        {success && (
          <p className="mt-2 text-green-700">
            {langauge === "En"
              ? "User created successfully!"
              : "Utilisateur créé avec succès !"}
          </p>
        )}
      </div>
    </form>
  );
};

export default CreateUser;

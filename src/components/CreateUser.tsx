


import React, {
  useContext,
  useState,
  FormEvent,
  ChangeEvent,
} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { v4 as uuidv4 } from "uuid";
import { LangContext } from "../context/LangContext";
import { useAgentCodes } from "../hooks/useAgentCodes";
import { useCreateUser } from "../hooks/useCreateUser";

const CreateUser: React.FC = () => {
  const { langauge } = useContext(LangContext);

  // ─── form fields ─────────────────────────────────────────────────────────────
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [agentCode, setAgentCode] = useState("");
  const [company, setCompany] = useState("");
  const [userType, setUserType] = useState<
    "ADMIN" | "AGENT" | "READONLY" | "MGA" | ""
  >("");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">("ACTIVE");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validUpto, setValidUpto] = useState("");

  // file uploads
  const [docFile1, setDocFile1] = useState<File | null>(null);
  const [docFile2, setDocFile2] = useState<File | null>(null);
  const [docFile3, setDocFile3] = useState<File | null>(null);

  // MGA-only agent selection
  const [agentSearch, setAgentSearch] = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);

  // password visibility toggles
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState(false);

   

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
   const [errors, setErrors] = useState<{ [key: string]: string }>({});

   
   // ─── Validation Function ──────────────────────────────────────────────────────
   const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
  
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email address";
    }
  
    if (!userType) newErrors.userType = "User type is required";
    if (!agentCode.trim()) newErrors.agentCode = "Agent code is required";
  
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
    }
  
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //



  // ─── auxiliary handlers ──────────────────────────────────────────────────────
  const handleFileChange =
    (setter: React.Dispatch<React.SetStateAction<File | null>>) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.files?.[0] ?? null);

  const generateAgentCode = () => {
    const prefix = firstName.trim().slice(0, 4).toUpperCase();
    const uuidPart = uuidv4().split("-")[0].toUpperCase();
    setAgentCode(`${prefix}${uuidPart}`);
    setLastCheckedCode(""); // force re-check
  };

  const handleCheckClick = async () => {
    const ok = await checkAvailability(agentCode);
    setLastCheckedCode(agentCode);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (availability !== "available" || lastCheckedCode !== agentCode) {
      return; // must confirm availability first
    }
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("agentCode", agentCode);
    formData.append("company", company);
    formData.append("userType", userType);
    formData.append("status", status);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("validUpto", validUpto);

    if (docFile1) formData.append("documents", docFile1);
    if (docFile2) formData.append("documents", docFile2);
    if (docFile3) formData.append("documents", docFile3);

    if (userType === "MGA") {
      selectedAgents.forEach((code) =>
        formData.append("agentCodes[]", code)
      );
    }

    await createUser(formData);
  };

  // ─── fetch MGA agents ────────────────────────────────────────────────────────
  const {
    agents,
    loading: agentsLoading,
    error: agentsError,
  } = useAgentCodes(agentSearch);

  return (
    <form
      onSubmit={handleSubmit}
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
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={`input-primary ${errors.firstName ? 'border-red-500' : 'border-black'}`}
            placeholder="First Name"
            
          />
          {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={`input-primary ${errors.lastName ? 'border-red-500' : 'border-black'}`}
            placeholder="Last Name"
            // required
          />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
        </div>

        {/* Email */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input-primary ${errors.email ? 'border-red-500' : 'border-black'}`}
            placeholder="Email"
            // required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Agent Code + Generate / Check */}
        <div className="">
          <div className=" flex flex-col col-span-3 sm:col-span-1">
            <label className="text-sm">Agent Code</label>
            <input
              value={agentCode}
              onChange={(e) => {
                setAgentCode(e.target.value);
                setLastCheckedCode("");
              }}
              className={`input-primary ${errors.agentCode ? 'border-red-500' : 'border-black'}`}
              placeholder="Agent Code"
              // required
            />
            {errors.agentCode && <p className="text-red-500 text-sm">{errors.agentCode}</p>}
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
              lastCheckedCode === agentCode &&
              availability === "available"
                ? "bg-green-200 hover:bg-green-300"
                : lastCheckedCode === agentCode &&
                  availability === "taken"
                ? "bg-red-200 hover:bg-red-300"
                : "bg-blue-200 hover:bg-blue-300 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
            }`}
          >
            {availability === "checking"
              ? "Checking…"
              : lastCheckedCode === agentCode &&
                availability === "available"
              ? "Available"
              : lastCheckedCode === agentCode &&
                availability === "taken"
              ? "Taken"
              : "Check"}
          </button>
          </div>
        </div>
        {availabilityError && (
          <p className="text-red-500 text-sm mt-1">
            {availabilityError}
          </p>
        )}

        {/* Company */}
        <div className="flex flex-col col-span-3 sm:col-span-1">
          <label className="text-sm">Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="input-primary"
            placeholder="Company"
            required
          />
        </div>

        {/* User Type */}
        <div className="flex flex-col col-span-2 sm:col-span-1">
          <label className="text-sm">User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as any)}
            className={`input-primary ${errors.userType ? 'border-red-500' : 'border-black'}`}
            // required
          >
            <option value="">-- select --</option>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="READONLY">Read Only</option>
            <option value="MGA">MGA</option>
          </select>
          {errors.userType && <p className="text-red-500 text-sm">{errors.userType}</p>}
        </div>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full input-primary ${errors.password ? 'border-red-500' : 'border-black'}`}
              placeholder="New Password"
              required
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
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.password}</p>}

          <label className="text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={
                confirmPasswordVisible ? "text" : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className={`w-full input-primary ${errors.confirmPassword ? 'border-red-500' : 'border-black'}`}
              placeholder="Confirm Password"
              required
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() =>
                setConfirmPasswordVisible((v) => !v)
              }
            >
              {confirmPasswordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </span>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        {/* Valid Upto */}
        <div className="col-span-3 flex flex-col 1">
          <label className="text-sm">Valid Upto</label>
          <input
            type="date"
            value={validUpto}
            onChange={(e) => setValidUpto(e.target.value)}
            className="input-primary"
            required
          />
        </div>

        {/* Uploads */}
        <div className="col-span-3 flex flex-col 1">
          <label className="text-sm">Upload Document 1</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile1)}
            className="input-primary"
          />
        </div>
        <div className="col-span-3 flex flex-col 1">
          <label className="text-sm">Upload Document 2</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile2)}
            className="input-primary"
          />
        </div>
        <div className="col-span-3 flex flex-col 1">
          <label className="text-sm">Upload Document 3</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile3)}
            className="input-primary"
          />
        </div>

        {/* MGA-only: Agent Codes */}
        {userType === "MGA" && (
          <div className="col-span-3 border-t pt-4 space-y-2">
            <label className="font-semibold">Agent Codes</label>
            <input
              type="text"
              value={agentSearch}
              onChange={(e) =>
                setAgentSearch(e.target.value)
              }
              className="w-full input-primary"
              placeholder="Search agent codes..."
            />
            {agentsLoading && <p>Loading agents…</p>}
            {agentsError && (
              <p className="text-red-500">{agentsError}</p>
            )}
            <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1 text-sm">
              {agents.map((code) => (
                <label
                  key={code}
                  className="flex items-center 1"
                >
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
                  />
                  {code}
                </label>
              ))}
            </div>
            {selectedAgents.length > 0 && (
              <>
                <p className="font-medium mt-2">
                  Selected Agents:
                </p>
                <ul className="list-disc ml-6 text-sm text-gray-600">
                  {selectedAgents.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="mt-6 flex flex-col items-center">
        <button
          type="submit"
          disabled={
            createLoading ||
            !(
              lastCheckedCode === agentCode &&
              availability === "available"
            )
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
        {createError && (
          <p className="mt-2 text-red-500">{createError}</p>
        )}
        {success && (
          <p className="mt-2 text-green-600">
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

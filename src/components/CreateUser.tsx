


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
      className="max-w-3xl mx-auto mt-10 p-6 rounded-lg shadow-2xl bg-white"
    >
      <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-4">
        {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
      </h2>
      <p className="text-center text-gray-600 mb-6">
        {langauge === "En"
          ? "** Changes to User Type will restore User Permissions to default settings **"
          : "** Les modifications apportées au type d'utilisateur restaureront les autorisations aux paramètres par défaut **"}
      </p>

      <div className="grid grid-cols-3 gap-4 text-gray-700">
        {/* First Name */}
        <div className="flex flex-col">
          <label>First Name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-2 border rounded"
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label>Last Name</label>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-2 border rounded"
            placeholder="Last Name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            placeholder="Email"
            required
          />
        </div>

        {/* Agent Code + Generate / Check */}
        <div className="">
          <div className=" flex flex-col">
            <label>Agent Code</label>
            <input
              value={agentCode}
              onChange={(e) => {
                setAgentCode(e.target.value);
                setLastCheckedCode("");
              }}
              className="p-2 border rounded"
              placeholder="Agent Code"
              required
            />
          </div>
          <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={generateAgentCode}
            className="h-10 px-3 bg-gray-200 rounded hover:bg-gray-300 transition"
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
                : "bg-blue-200 hover:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="flex flex-col">
          <label>Company</label>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="p-2 border rounded"
            placeholder="Company"
            required
          />
        </div>

        {/* User Type */}
        <div className="flex flex-col">
          <label>User Type</label>
          <select
            value={userType}
            onChange={(e) => setUserType(e.target.value as any)}
            className="p-2 border rounded"
            required
          >
            <option value="">-- select --</option>
            <option value="ADMIN">Admin</option>
            <option value="AGENT">Agent</option>
            <option value="READONLY">Read Only</option>
            <option value="MGA">MGA</option>
          </select>
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
            />{" "}
            Inactive
          </label>
        </div>

        {/* Password */}
        <div className="col-span-3 space-y-2">
          <label>Password</label>
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="New Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setPasswordVisible((v) => !v)}
            >
              {passwordVisible ? (
                <EyeIcon className="h-5 w-5" />
              ) : (
                <EyeSlashIcon className="h-5 w-5" />
              )}
            </span>
          </div>

          <label>Confirm Password</label>
          <div className="relative">
            <input
              type={
                confirmPasswordVisible ? "text" : "password"
              }
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              className="w-full p-2 border rounded"
              placeholder="Confirm Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
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
        </div>

        {/* Valid Upto */}
        <div className="col-span-3 flex flex-col gap-2">
          <label>Valid Upto</label>
          <input
            type="date"
            value={validUpto}
            onChange={(e) => setValidUpto(e.target.value)}
            className="p-2 border rounded"
            required
          />
        </div>

        {/* Uploads */}
        <div className="col-span-3 flex flex-col gap-2">
          <label>Upload Document 1</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile1)}
            className="p-2 border rounded"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <label>Upload Document 2</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile2)}
            className="p-2 border rounded"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <label>Upload Document 3</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange(setDocFile3)}
            className="p-2 border rounded"
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
              className="w-full p-2 border rounded"
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
                  className="flex items-center gap-2"
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
          className="w-60 bg-[#3a17c5] text-white py-2 rounded hover:bg-[#3a17c5e8] transition disabled:opacity-50 disabled:cursor-not-allowed"
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

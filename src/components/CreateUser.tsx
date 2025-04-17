// import React, { useContext, useState } from "react";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
// import { LangContext } from "../context/LangContext";
// import { useAgentCodes } from "../hooks/useAgentCodes";

// const CreateUser: React.FC = () => {
//   const { langauge } = useContext(LangContext);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//   const [userType, setUserType] = useState("");
//   const [agentSearch, setAgentSearch] = useState("");
//   const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
//   const [isEditing, setIsEditing] = useState<boolean>(false);

//   const { agents, loading: agentsLoading, error: agentsError } =
//     useAgentCodes(agentSearch);



//   return (
//     <div className="max-w-3xl mx-auto mt-10 p-6  rounded-lg shadow-2xl">
//       <h2 className="text-xl font-semibold text-center text-[#3a17c5] mb-2">
//         {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
//       </h2>
//       <p className="text-center text-gray-600 mb-4">
//         {langauge === "En"
//           ? "** Changes to User Type will restore User Permissions to default settings **"
//           : `** Les modifications apportées au type d'utilisateur restaureront les autorisations utilisateur aux paramètres par défaut **`}
//       </p>

//       <div className="grid grid-cols-3 gap-4 text-gray-700">
//         <div className="col-span-3 text-[#3a17c5] font-semibold">
//           {langauge === "En" ? "USER INFORMATION" : "INFORMATIONS UTILISATEUR"}
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">
//             {langauge === "En" ? "First Name" : "Prénom"}
//           </label>
//           <input className="p-2 border rounded" placeholder="FIRST NAME" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">
//             {langauge === "En" ? "Last Name" : "Nom de famille"}
//           </label>
//           <input className="p-2 border rounded" placeholder="LAST NAME" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">Email</label>
//           <input
//             className="p-2 border rounded"
//             type="email"
//             placeholder="EMAIL"
//           />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">
//             {langauge === "En" ? "Agent Code" : `Code de l'agent`}
//           </label>
//           <input className="p-2 border rounded" placeholder="AGENT CODE" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">
//             {langauge === "En" ? "Company" : "Entreprise"}
//           </label>
//           <input className="p-2 border rounded" placeholder="COMPANY" />
//         </div>
//         <div className=" flex flex-col gap-2">
//           <label htmlFor="">
//             {langauge === "En" ? "User Type" : `Type d'utilisateur`}
//           </label>
//           <select
//             className="p-2 border rounded"
//             onChange={(e) => setUserType(e.target.value)}
//           >
//             <option value="">---</option>
//             <option value="Admin">Admin</option>
//             <option value="MGA">Mga</option>
//             <option value="Agent">Agent</option>
//             <option value="Read Only">Read Only</option>
//           </select>
//         </div>
//         <div className="col-span-1 space-y-2">
//           <label className="block text-gray-700">
//             {langauge === "En" ? "STATUS" : "STATUT"}
//           </label>
//           <div className="flex space-x-4">
//             <label>
//               <input type="radio" name="status" value="active" /> Active
//             </label>
//             <label>
//               <input type="radio" name="status" value="inactive" /> Inactive
//             </label>
//           </div>
//         </div>
//         <div className="col-span-2 space-y-4">
//           <label className="block text-gray-700">
//             {langauge === "En" ? "PASSWORD" : "MOT DE PASSE"}
//           </label>
//           <div className="relative">
//             <input
//               type={passwordVisible ? "text" : "password"}
//               className="w-full p-2 border rounded"
//               placeholder="New Password"
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer"
//               onClick={() => setPasswordVisible(!passwordVisible)}
//             >
//               {passwordVisible ? (
//                 <EyeIcon className="h-4 w-4" aria-hidden="true" />
//               ) : (
//                 <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
//               )}
//             </span>
//           </div>
//           <label className="block text-gray-700">
//             {langauge === "En"
//               ? "RE-ENTER PASSWORD"
//               : "ENTREZ À NOUVEAU LE MOT DE PASSE"}
//           </label>
//           <div className="relative mt-2">
//             <input
//               type={confirmPasswordVisible ? "text" : "password"}
//               className="w-full p-2 border rounded"
//               placeholder="Re-enter Password"
//             />
//             <span
//               className="absolute right-3 top-3 cursor-pointer"
//               onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//             >
//               {confirmPasswordVisible ? (
//                 <EyeIcon className="h-4 w-4" aria-hidden="true" />
//               ) : (
//                 <EyeSlashIcon className="h-4 w-4" aria-hidden="true" />
//               )}
//             </span>
//           </div>

//           {userType === "MGA" && (
//   <div className="mt-6 col-span-3 border-t pt-4">
//     <label className="block mb-2 text-sm font-semibold text-gray-700">
//       {langauge === "En" ? "Agent Codes" : "Codes des agents"}
//     </label>

//     <input
//       type="text"
//       value={agentSearch}
//       onChange={(e) => setAgentSearch(e.target.value)}
//       placeholder="Search agent codes..."
//       className="w-full p-2 border rounded mb-2"
//     />

//     <p className="text-sm mb-2">Agent List:</p>
//     <div className="max-h-40 overflow-y-scroll border rounded p-2 space-y-1 text-sm">
//         {agentsLoading && <p>Loading agents…</p>}
//         {agentsError && <p className="text-red-500">{agentsError}</p>}
//         {!agentsLoading &&
//           agents.map((agent) => (
//             <div key={agent}>
//               <label className="flex items-center gap-2">
//                 <input
//                   type="checkbox"
//                   checked={selectedAgents.includes(agent)}
//                   disabled={!isEditing}
//                   onChange={(e) => {
//                     if (e.target.checked) {
//                       setSelectedAgents((prev) => [...prev, agent]);
//                     } else {
//                       setSelectedAgents((prev) =>
//                         prev.filter((a) => a !== agent)
//                       );
//                     }
//                   }}
//                 />
//                 {agent}
//               </label>
//             </div>
//           ))}
//       </div>

//     <p className="text-sm mt-4 font-medium">Selected Agents:</p>
//     <ul className="list-disc ml-6 text-sm text-gray-600">
//       {selectedAgents.map((agent) => (
//         <li key={agent}>{agent}</li>
//       ))}
//     </ul>
//   </div>
// )}

//         </div>
//       </div>
//       <div className=" w-full flex justify-center items-center mt-2">
//         <button className="w-[250px] mt-4 bg-[#3a17c5] text-white p-2 rounded hover:bg-[#3a17c5e8] transition flex justify-center items-center cursor-pointer">
//           {langauge === "En" ? "CREATE USER" : "CRÉER UN UTILISATEUR"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CreateUser;

// ======================================================

// src/components/CreateUser.tsx
import React, { useContext, useState, FormEvent } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { LangContext } from "../context/LangContext";
import { useAgentCodes } from "../hooks/useAgentCodes";
import { useCreateUser } from "../hooks/useCreateUser";
import { ProfileForm } from "../utils/types";

const CreateUser: React.FC = () => {
  const { langauge } = useContext(LangContext);

  // ─── form state ─────────────────────────────────────────────────────────────
  const [firstName, setFirstName]     = useState("");
  const [lastName,  setLastName]      = useState("");
  const [email,     setEmail]         = useState("");
  const [agentCode, setAgentCode]     = useState("");
  const [company,   setCompany]       = useState("");
  const [userType,  setUserType]      = useState<ProfileForm["userType"]>("");
  const [status,    setStatus]        = useState<ProfileForm["status"]>("ACTIVE");
  const [password,  setPassword]      = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validUpto, setValidUpto]     = useState("");
  const [docLink1,  setDocLink1]      = useState("");
  const [docLink2,  setDocLink2]      = useState("");
  const [docLink3,  setDocLink3]      = useState("");
  const [agentSearch,    setAgentSearch]    = useState("");
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [passwordVisible, setPasswordVisible]        = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  // ─── data & hooks ───────────────────────────────────────────────────────────
  const { agents, loading: agentsLoading, error: agentsError } =
    useAgentCodes(agentSearch);
  const {
    createUser,
    loading: createLoading,
    error: createError,
    success,
  } = useCreateUser();

  // ─── submit handler ─────────────────────────────────────────────────────────
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData: ProfileForm = {
      id:             "",
      firstName,
      lastName,
      email,
      agentCode,
      company,
      userType,
      status,
      password,
      confirmPassword,
      docLink1,
      docLink2,
      docLink3,
      validUpto,
      mgaId:        null,
      agentCodes:   selectedAgents,
    };

   await createUser(formData);
    
  };

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
        {/* First / Last */}
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

        {/* Agent Code / Company */}
        <div className="flex flex-col">
          <label>Agent Code</label>
          <input
            value={agentCode}
            onChange={(e) => setAgentCode(e.target.value)}
            className="p-2 border rounded"
            placeholder="Agent Code"
          />
        </div>
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
          <label>Re-enter Password</label>
          <div className="relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Confirm Password"
              required
            />
            <span
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => setConfirmPasswordVisible((v) => !v)}
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

        {/* Doc Links */}
        <div className="col-span-3 flex flex-col gap-2">
          <label>Document Link 1</label>
          <input
            value={docLink1}
            onChange={(e) => setDocLink1(e.target.value)}
            className="p-2 border rounded"
            placeholder="Doc Link 1"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <label>Document Link 2</label>
          <input
            value={docLink2}
            onChange={(e) => setDocLink2(e.target.value)}
            className="p-2 border rounded"
            placeholder="Doc Link 2"
          />
        </div>
        <div className="col-span-3 flex flex-col gap-2">
          <label>Document Link 3</label>
          <input
            value={docLink3}
            onChange={(e) => setDocLink3(e.target.value)}
            className="p-2 border rounded"
            placeholder="Doc Link 3"
          />
        </div>

        {/* MGA-only: search & select agent codes */}
        {userType === "MGA" && (
          <div className="col-span-3 border-t pt-4 space-y-2">
            <label className="font-semibold">Agent Codes</label>
            <input
              type="text"
              value={agentSearch}
              onChange={(e) => setAgentSearch(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Search agent codes..."
            />
            {agentsLoading && <p>Loading agents…</p>}
            {agentsError  && <p className="text-red-500">{agentsError}</p>}
            <div className="max-h-40 overflow-y-auto border rounded p-2 space-y-1 text-sm">
              {agents.map((code) => (
                <label key={code} className="flex items-center gap-2">
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
      </div>

      {/* submit button + feedback */}
      <div className="mt-6 flex flex-col items-center">
        <button
          type="submit"
          disabled={createLoading}
          className="w-60 bg-[#3a17c5] text-white py-2 rounded hover:bg-[#3a17c5e8] transition cursor-pointer"
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
              : "Utilisateur créé avec succès !"}
          </p>
        )}
      </div>
    </form>
  );
};

export default CreateUser;

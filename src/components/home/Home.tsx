import { useEffect, useState } from "react";
import AdminHome from "./AdminHome";
import { getUserTypeFromToken } from "../../utils/getUserType";
import AgentHome from "./AgentHome";
import MGAHome from "./MGAHome";

export default function Home() {
  const [userType, setUserType] = useState<string | null>(null);
  useEffect(() => {
    const type = getUserTypeFromToken();
    setUserType(type.userType);
    console.log(type);
  }, []);

  if (!userType) return null;

  return (
    <>
      {userType === "ADMIN" && <AdminHome />}
      {userType === "AGENT" && <AgentHome />}
      {userType === "MGA" && <MGAHome />}
    </>
  );
}

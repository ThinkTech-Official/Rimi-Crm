// utils/getUserType.ts
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userType: string;
  [key: string]: any; // any other fields
}

export const getUserTypeFromToken = (): string | null => {
  const token = Cookies.get("token");
  console.log('from getUser type component',token)
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    console.log('from getUser type component usetType ',decoded.userType)
    return decoded.userType;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

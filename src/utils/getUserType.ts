
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  userType: string;
  fullname: string;
  [key: string]: any; // any other fields
}

export const getUserTypeFromToken = (): any | null => {
  const token = Cookies.get("token");
  // console.log('from getUser type component',token)
  if (!token) return null;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    // console.log('from getUser type component usetType decoded value',decoded)
    return {userType: decoded.userType, fullName: decoded.fullName};
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

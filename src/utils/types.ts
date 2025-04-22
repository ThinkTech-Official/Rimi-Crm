// types.ts
export interface ProfileData {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    agentCode: string;
    company: string;
    userType: "MGA" | "AGENT" | "ADMIN" | string;
    status: string;
    docLink1: string;
    docLink2: string;
    docLink3: string;
    validUpto: string;
    createdAt: string;
    updatedAt: string;
    mgaId: string | null;
    agentCodes?: string[];       // present on MGA
  }
  
  // export interface ProfileForm extends Omit<ProfileData, "createdAt" | "updatedAt"> {
  export interface ProfileForm extends ProfileData {
    password: string;
    confirmPassword: string;
  }
  
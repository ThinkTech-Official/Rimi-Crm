
// export interface ProfileData {
//   id: string
//   firstName: string
//   lastName: string
//   email: string
//   agentCode: string
//   company: string
//   userType: "MGA" | "AGENT" | "ADMIN" | string
//   status: string
//   docLink1: string
//   docLink2: string
//   docLink3: string
//   validUpto: string
//   createdAt: string
//   updatedAt: string
//   mgaId: string | null
//   agentCodes?: string[]       // present on MGA
// }

// // Now make the two new fields optional
// export interface ProfileForm extends ProfileData {
//   password?: string
//   confirmPassword?: string
// }



export interface ProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string;
  userType: string;
  status: string;
  docLink1?: string | null;
  docLink2?: string | null;
  docLink3?: string | null;
  validUpto?: string | null;
  validUpto2?: string | null;
  createdAt: string;
  updatedAt: string;
  mgaId?: string | null;
  agentCodes?: string[];
  allowBulkUpload?: boolean;
  commissionPercent?: number | null;
  phoneNumber?: string | null;
  
  // ADD THESE NEW FIELDS FOR VERIFICATION
  verificationStatus?: string | null;          // 'DRAFT', 'PENDING', 'VERIFIED', 'REJECTED', 'EXPIRED'
  documentsUploadedAt?: string | null;         // ISO timestamp
  verificationRequestedAt?: string | null;     // ISO timestamp (NEW!)
  verifiedAt?: string | null;                  // ISO timestamp
  verifiedBy?: string | null;                  // Admin email
  verificationValidTill?: string | null;       // ISO date
  isImportedAgent?: boolean;
}

export interface ProfileForm {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  agentCode: string;
  company: string;
  userType: string;
  status: string;
  phoneNumber?: string | null;
  
  // ✅ Change these from 'string' to 'string | null'
  docLink1?: string | null;  // was: string | undefined
  docLink2?: string | null;  // was: string | undefined
  docLink3?: string | null;  // was: string | undefined
  docLink4?: string | null;
  validUpto?: string | null;
  validUpto2?: string | null;
  
docType1?: string | null;
docType2?: string | null;
docType3?: string | null;
docType4?: string | null;
  
  createdAt: string;
  updatedAt: string;
  mgaId?: string | null;
  agentCodes?: string[];
  allowBulkUpload?: boolean;
  commissionPercent?: number | null;
  
  // Verification fields
  verificationStatus?: string | null;
  documentsUploadedAt?: string | null;
  verificationRequestedAt?: string | null;
  verifiedAt?: string | null;
  verifiedBy?: string | null;
  verificationValidTill?: string | null;
  isImportedAgent?: boolean;
}



// ============================== Agent Dashboard Data Types ===================================


export type MonthlyPremium = { ym: string; total: number };

export type AgentSummary = {
  totalPolicies: number;
  totalQuotes: number;
  commissionPercent: number;
  monthlyPremiums: MonthlyPremium[];
  totalCommissions: number;
  currentMonthCommissions: number;
};

export type PolicyRow = {
  id: string;
  policyNumber: string | null;
  policyType: string | null;
  firstName: string;
  lastName: string;
  premium: number | null;
  status: string | null;
  dateIssued: string | null;
  effectiveDate: string | null;
  expiryDate: string | null;
  product: string | null;
};

export type QuoteRow = {
  id: string;
  quoteNumber: string | null;
  firstName: string;
  lastName: string;
  premium: number | null;
  policyType: string | null;
  product: string | null;
  status: string | null;
  createdAt: string;
};

export type Page<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type PolicyTypeSlice = { policyType: string; count: number };



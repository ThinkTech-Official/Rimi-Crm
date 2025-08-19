
export interface ProfileData {
  id: string
  firstName: string
  lastName: string
  email: string
  agentCode: string
  company: string
  userType: "MGA" | "AGENT" | "ADMIN" | string
  status: string
  docLink1: string
  docLink2: string
  docLink3: string
  validUpto: string
  createdAt: string
  updatedAt: string
  mgaId: string | null
  agentCodes?: string[]       // present on MGA
}

// Now make the two new fields optional
export interface ProfileForm extends ProfileData {
  password?: string
  confirmPassword?: string
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



export interface MgaSummary {
  totalPolicies: number;
  totalQuotes: number;
  commissionPercent: number;
  monthlyPremiums: Array<{ ym: string; total: number }>;
  totalCommissions: number;
  currentMonthCommissions: number;
  totalAgents: number;
}

export interface PolicyTypeDistribution {
  policyType: string;
  count: number;
}

export interface MgaAgent {
  id: string;
  agentCode: string;
  name: string;
  email: string;
  joinedDate: string;
  validity: string;
  status: 'ACTIVE' | 'INACTIVE';
  commissionPercent: number;
  totalQuotes: number;
  totalPolicies: number;
}

export interface MgaAgentsResponse {
  items: MgaAgent[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MgaAgentDetails {
  id: string;
  agentCode: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  status: 'ACTIVE' | 'INACTIVE';
  joinedDate: string;
  validity: string;
  commissionPercent: number;
  totalQuotes: number;
  totalPolicies: number;
  totalCommissions: number;
  currentMonthCommissions: number;
}

export interface UpdateStatusResponse {
  message: string;
  agent: {
    agentCode: string;
    firstName: string;
    lastName: string;
    status: string;
  };
}

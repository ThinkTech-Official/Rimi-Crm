// hooks/admin/index.ts
import { useQuery, keepPreviousData, useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/axiosInstance";

// Types
interface AdminStats {
  totalPolicies: number;
  totalQuotes: number;
  totalAgents: number;
  totalMGAs: number;
  totalCommissions: number;
  currentMonthCommissions: number;
  monthlyPremiums: number;
  activeAgents: number;
  commissionPercent: number;
  computedAt?: string; 
}

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    yAxisID?: string;
  }>;
  summary?: any;
   // For Quotes Analysis
  quotesByProduct?: Array<{
    product: string;
    count: number;
  }>;
  topAgentsThisMonth?: Array<{
    rank: number;
    agentCode: string;
    name: string;
    quoteCount: number;
  }>;

  // For Policy Analysis
  policiesByProduct?: Array<{
    product: string;
    count: number;
  }>;
  topAgentsByPolicies?: Array<{
    rank: number;
    agentCode: string;
    name: string;
    policyCount: number;
  }>;
  statusDistribution?: Record<string, number>;
  averageConversionRate?: number;
}

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface Agent {
  id: string;
  agentCode: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  joinedDate: string;
  validity: string;
  quotesCount: number;
  policiesCount: number;
  commissionPercent?: number;
}

interface Policy {
  id: string;
  policyNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  policyType: string;
  premium: number;
  status: string;
  dateIssued: string;
  effectiveDate: string;
  expiryDate: string;
  product: string;
}

interface Quote {
  id: string;
  quoteNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  policyType: string;
  premium: number;
  status: string;
  product: string;
  createdAt: string;
  effectiveDate: string;
  expiryDate: string;
}

// Hook for Admin Stats
// export const useAdminStats = () => {
//   return useQuery<AdminStats>({
//     queryKey: ["admin-stats"],
//     queryFn: async () => {
//       const response = await axiosInstance.get("/admin/stats");
//       return response.data;
//     },
//     refetchInterval: 60000, // Refetch every minute
//   });
// };

export const useAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/stats");
      return response.data;
    },
  });
};

// Hook for Quotes Analysis
export const useQuotesAnalysis = (startDate?: string, endDate?: string) => {
  return useQuery<ChartData>({
    queryKey: ["quotes-analysis", startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axiosInstance.get(
        `/admin/quotes-analysis?${params}`
      );
      return response.data;
    },
  });
};

// Hook for Policy Analysis
export const usePolicyAnalysis = (startDate?: string, endDate?: string) => {
  return useQuery<ChartData>({
    queryKey: ["policy-analysis", startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axiosInstance.get(
        `/admin/policy-analysis?${params}`
      );
      return response.data;
    },
  });
};

// Hook for Quotes vs Policy Conversion
export const useQuotesPolicyConversion = (
  startDate?: string,
  endDate?: string
) => {
  return useQuery<ChartData>({
    queryKey: ["quotes-policy-conversion", startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const response = await axiosInstance.get(
        `/admin/quotes-policy-conversion?${params}`
      );
      return response.data;
    },
  });
};

// Hook for Agent Types Monthly
export const useAgentTypesMonthly = (months: number = 12) => {
  return useQuery<ChartData>({
    queryKey: ["agent-types-monthly", months],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/agent-types-monthly?months=${months}`
      );
      return response.data;
    },
  });
};

// Hook for Policy Sales
export const usePolicySales = (
  period: "daily" | "weekly" | "monthly" = "daily"
) => {
  return useQuery<ChartData>({
    queryKey: ["policy-sales", period],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/policy-sales?period=${period}`
      );
      return response.data;
    },
  });
};

// Hook for Agents Table
export const useAgents = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
) => {
  return useQuery<PaginatedResponse<Agent>>({
    queryKey: ["agents", page, limit, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await axiosInstance.get(`/admin/agents?${params}`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

// Hook for Policies Table
export const usePolicies = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
) => {
  return useQuery<PaginatedResponse<Policy>>({
    queryKey: ["policies", page, limit, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await axiosInstance.get(`/admin/policies?${params}`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

// Hook for Quotes Table
export const useQuotes = (
  page: number = 1,
  limit: number = 10,
  search?: string,
  status?: string
) => {
  return useQuery<PaginatedResponse<Quote>>({
    queryKey: ["quotes", page, limit, search, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (search) params.append("search", search);
      if (status) params.append("status", status);

      const response = await axiosInstance.get(`/admin/quotes?${params}`);
      return response.data;
    },
    placeholderData: keepPreviousData,
  });
};

// Hook for Agent Details
export const useAgentDetails = (agentCode: string) => {
  return useQuery({
    queryKey: ["agent-details", agentCode],
    queryFn: async () => {
      const response = await axiosInstance.get(`/admin/agents/${agentCode}`);
      console.log('commission data', response.data)
      return response.data;
    },
    enabled: !!agentCode,
  });
};


export const useAgentPolicies = (agentCode: string, page: number, limit = 10) => {
  return useQuery({
    queryKey: ['agent-policies', agentCode, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/agents/${agentCode}/policies?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    enabled: !!agentCode,
    placeholderData: keepPreviousData,
  });
};

export const useAgentQuotes = (agentCode: string, page: number, limit = 10) => {
  return useQuery({
    queryKey: ['agent-quotes', agentCode, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/agents/${agentCode}/quotes?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    enabled: !!agentCode,
    placeholderData: keepPreviousData,
  });
};

export const useAgentCommissions = (agentCode: string, page: number, limit = 10) => {
  return useQuery({
    queryKey: ['agent-commissions', agentCode, page],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/admin/agents/${agentCode}/commissions?page=${page}&limit=${limit}`
      );
      return response.data;
    },
    enabled: !!agentCode,
    placeholderData: keepPreviousData,
  });
};

export const useRefreshDashboard = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/admin/refresh-dashboard");
      return response.data;
    },
  });
};

// Export types for use in components
export type { AdminStats, ChartData, PaginatedResponse, Agent, Policy, Quote };

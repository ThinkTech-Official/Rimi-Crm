import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


// import { API_BASE } from '../../utils/urls';
import { getUserTypeFromToken } from "../../utils/getUserType";
import { axiosInstance } from "../../utils/axiosInstance";

interface UpdateCommissionStatusParams {
  commissionId: string;
  newStatus: string;
  note?: string;
}

interface BulkUpdateStatusParams {
  commissionIds: string[];
  newStatus: string;
  note?: string;
}

interface MarkAsPaidParams {
  commissionIds: string[];
  paymentDate?: Date;
  paymentReference?: string;
}

// Helper to get current user identifier
const getPerformedBy = (): string => {
  const userInfo = getUserTypeFromToken();
  return userInfo?.fullName || userInfo?.agentCode || "admin";
};

/**
 * Hook to update a single commission status
 */
export const useUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commissionId,
      newStatus,
      note,
    }: UpdateCommissionStatusParams) => {
      const { data } = await axiosInstance.put(
        `/admin/commissions/${commissionId}/status`,
        {
          status: newStatus,
          performedBy: getPerformedBy(),
          note: note || `Status changed to ${newStatus}`,
        },
      );
      return data;
    },
    onSuccess: (_, variables) => {
     

      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["agentDetails"] });
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to update commission status";
      
      console.error("Update commission status error:", error);
    },
  });
};

/**
 * Hook to bulk update commission statuses
 */
export const useBulkUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commissionIds,
      newStatus,
      note,
    }: BulkUpdateStatusParams) => {
      const { data } = await axiosInstance.put(
        `/admin/commissions/bulk/status`,
        {
          commissionIds,
          status: newStatus,
          performedBy: getPerformedBy(),
          note,
        },
      );
      return data;
    },
    onSuccess: (data, variables) => {
      const statusLabel = variables.newStatus.replace(/_/g, " ");

      if (data.success > 0) {
       
      }

      if (data.failed > 0) {
        
      }

      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["agentDetails"] });
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to bulk update commissions";
      
      console.error("Bulk update commission status error:", error);
    },
  });
};

/**
 * Hook to mark commissions as paid
 */
export const useMarkCommissionsAsPaid = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      commissionIds,
      paymentDate,
      paymentReference,
    }: MarkAsPaidParams) => {
      const { data } = await axiosInstance.put(
        `/admin/commissions/bulk/mark-paid`,
        {
          commissionIds,
          performedBy: getPerformedBy(),
          paymentDate: paymentDate || new Date(),
          paymentReference,
        },
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.success > 0) {
        const total = data.totalAmount?.toFixed(2) || "0.00";
        
      }

      if (data.failed > 0) {
       
      }

      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ["agentDetails"] });
      queryClient.invalidateQueries({ queryKey: ["commissions"] });
      queryClient.invalidateQueries({ queryKey: ["agents"] });
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Failed to mark commissions as paid";
      
      console.error("Mark commissions as paid error:", error);
    },
  });
};

/**
 * Hook to get all commissions with filters (for future use)
 */
// export const useCommissions = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async (filters?: {
//       status?: string;
//       agentCode?: string;
//       dateFrom?: string;
//       dateTo?: string;
//       page?: number;
//       limit?: number;
//     }) => {
//       const params = new URLSearchParams();

//       if (filters?.status) params.append("status", filters.status);
//       if (filters?.agentCode) params.append("agentCode", filters.agentCode);
//       if (filters?.dateFrom) params.append("dateFrom", filters.dateFrom);
//       if (filters?.dateTo) params.append("dateTo", filters.dateTo);
//       if (filters?.page) params.append("page", filters.page.toString());
//       if (filters?.limit) params.append("limit", filters.limit.toString());

//       const { data } = await axiosInstance.get(
//         `/admin/commissions?${params.toString()}`,
//       );
//       console.log("commission data ", data);
//       return data;
//     },
//     onError: (error: any) => {
//       const errorMessage =
//         error.response?.data?.message ||
//         error.response?.data?.error ||
//         "Failed to fetch commissions";
      
//       console.error("Fetch commissions error:", error);
//     },
//   });
// };

export const useCommissions = (filters: {
  status?: string;
  agentCode?: string;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ["commissions", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (filters.status) params.append("status", filters.status);
      if (filters.agentCode) params.append("agentCode", filters.agentCode);
      if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
      if (filters.dateTo) params.append("dateTo", filters.dateTo);
      if (filters.page) params.append("page", filters.page.toString());
      if (filters.limit) params.append("limit", filters.limit.toString());

      const { data } = await axiosInstance.get(`/admin/commissions?${params.toString()}`);
      return data;
    },
    placeholderData: keepPreviousData, 
  });
};



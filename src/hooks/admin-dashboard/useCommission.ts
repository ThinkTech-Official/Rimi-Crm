// src/hooks/useCommission.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

import { API_BASE } from '../../utils/urls';
import { getUserTypeFromToken } from '../../utils/getUserType';
import { axiosInstance } from '../../utils/axiosInstance';
import axios from 'axios';

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
  return userInfo?.fullName || userInfo?.agentCode || 'admin';
};

/**
 * Hook to update a single commission status
 */
export const useUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commissionId, newStatus, note }: UpdateCommissionStatusParams) => {
      const { data } = await axiosInstance.put(
        `${API_BASE}/admin/commissions/${commissionId}/status`,
        {
          status: newStatus,
          performedBy: getPerformedBy(),
          note: note || `Status changed to ${newStatus}`,
        }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      toast.success(`Commission status updated to ${variables.newStatus.replace(/_/g, ' ')}`);
      
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to update commission status';
      toast.error(errorMessage);
      console.error('Update commission status error:', error);
    },
  });
};

/**
 * Hook to bulk update commission statuses
 */
export const useBulkUpdateCommissionStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commissionIds, newStatus, note }: BulkUpdateStatusParams) => {
      const { data } = await axiosInstance.put(
        '${API_BASE}/admin/commissions/bulk/status',
        {
          commissionIds,
          status: newStatus,
          performedBy: getPerformedBy(),
          note,
        }
      );
      return data;
    },
    onSuccess: (data, variables) => {
      const statusLabel = variables.newStatus.replace(/_/g, ' ');
      
      if (data.success > 0) {
        toast.success(
          `${data.success} commission${data.success > 1 ? 's' : ''} updated to ${statusLabel}`
        );
      }
      
      if (data.failed > 0) {
        toast.error(
          `${data.failed} commission${data.failed > 1 ? 's' : ''} failed to update`
        );
      }
      
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to bulk update commissions';
      toast.error(errorMessage);
      console.error('Bulk update commission status error:', error);
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
      paymentReference 
    }: MarkAsPaidParams) => {
      const { data } = await axiosInstance.put(
        '${API_BASE}/admin/commissions/bulk/mark-paid',
        {
          commissionIds,
          performedBy: getPerformedBy(),
          paymentDate: paymentDate || new Date(),
          paymentReference,
        }
      );
      return data;
    },
    onSuccess: (data) => {
      if (data.success > 0) {
        const total = data.totalAmount?.toFixed(2) || '0.00';
        toast.success(
          `${data.success} commission${data.success > 1 ? 's' : ''} marked as paid. Total: $${total}`
        );
      }
      
      if (data.failed > 0) {
        toast.error(
          `${data.failed} commission${data.failed > 1 ? 's' : ''} failed to mark as paid`
        );
      }
      
      // Invalidate all relevant queries
      queryClient.invalidateQueries({ queryKey: ['agentDetails'] });
      queryClient.invalidateQueries({ queryKey: ['commissions'] });
      queryClient.invalidateQueries({ queryKey: ['agents'] });
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to mark commissions as paid';
      toast.error(errorMessage);
      console.error('Mark commissions as paid error:', error);
    },
  });
};

/**
 * Hook to get all commissions with filters (for future use)
 */
export const useCommissions = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (filters?: {
      status?: string;
      agentCode?: string;
      dateFrom?: string;
      dateTo?: string;
      page?: number;
      limit?: number;
    }) => {
      const params = new URLSearchParams();
      
      if (filters?.status) params.append('status', filters.status);
      if (filters?.agentCode) params.append('agentCode', filters.agentCode);
      if (filters?.dateFrom) params.append('dateFrom', filters.dateFrom);
      if (filters?.dateTo) params.append('dateTo', filters.dateTo);
      if (filters?.page) params.append('page', filters.page.toString());
      if (filters?.limit) params.append('limit', filters.limit.toString());
      
      const { data } = await axiosInstance.get(
        `${API_BASE}/admin/commissions?${params.toString()}`
      );
      return data;
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Failed to fetch commissions';
      toast.error(errorMessage);
      console.error('Fetch commissions error:', error);
    },
  });
};
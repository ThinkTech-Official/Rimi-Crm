import { useState, useEffect, useCallback } from 'react';
import { axiosInstance } from '../utils/axiosInstance';

// Activity types
export type ActivityType = 
  | 'note_added'
  | 'attachment_added'
  | 'policy_modified'
  | 'policy_cancelled'
  | 'refund_processed'
  | 'email_sent'
  | 'policy_split'
  | 'renewal_notice_sent'
  | 'payment_method_updated';

// Activity interface
export interface PolicyActivity {
  id: string;
  policyId: string;
  activityType: ActivityType;
  description: string;
  performedBy: string;
  performedByName?: string;
  metadata?: Record<string, any>;
  createdAt: string;
}





export function usePolicyActivity(policyId: string | null) {
  const [activities, setActivities] = useState<PolicyActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch all activities for a policy
   */
  const fetchActivities = useCallback(async () => {
    if (!policyId) {
      console.log('Skipping fetch: no policyId');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching activities for policy: ${policyId}`);
      
      const response = await axiosInstance.get(
        `/policies/${policyId}/activities`
      );

      setActivities(response.data);
      console.log('Activities fetched ', response.data)
      console.log(`Fetched ${response.data.length} activities`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to load activity history';
      console.error('Error fetching activities:', errorMessage);
      setError(errorMessage);
      setActivities([]); 
    } finally {
      setLoading(false);
    }
  }, [policyId]);

  
  const addActivity = useCallback(
    async (
      activityType: ActivityType,
      description: string,
      metadata?: Record<string, any>
    ) => {
      if (!policyId) {
        console.warn('Cannot add activity: no policyId');
        return;
      }

      try {
        console.log(`Adding activity: ${activityType} for policy ${policyId}`);

        const response = await axiosInstance.post(
          `/policies/${policyId}/activities`,
          {
            activityType,
            description,
            metadata,
          }
        );

        console.log('Activity added:', response.data.id);

       
        await fetchActivities();

        return response.data;
      } catch (err: any) {
        const errorMessage = err.response?.data?.message || 'Failed to add activity';
        console.error('Error adding activity:', errorMessage);
        throw new Error(errorMessage);
      }
    },
    [policyId, fetchActivities]
  );

  /**
   * Refresh activities
   */
  const refresh = useCallback(() => {
    console.log('Manually refreshing activities');
    fetchActivities();
  }, [fetchActivities]);

  
  useEffect(() => {
    if (policyId) {
      fetchActivities();
    } else {
     
      setActivities([]);
      setError(null);
    }
  }, [policyId, fetchActivities]);

  return {
    activities,
    loading,
    error,
    fetchActivities,
    addActivity,
    refresh, 
  };
}
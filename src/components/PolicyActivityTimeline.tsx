import React from 'react';
import { ActivityType, PolicyActivity } from '../hooks/usePolicyActivity';

interface ActivityTimelineProps {
  activities: PolicyActivity[];
  loading: boolean;
  error: string | null;
}

export const PolicyActivityTimeline: React.FC<ActivityTimelineProps> = ({
  activities,
  loading,
  error,
}) => {
  /**
   * Get icon for activity type
   */
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case 'note_added':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case 'attachment_added':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
        );
    //   case 'policy_created':
    //     return (
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    //           d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    //       </svg>
    //     );
      case 'policy_modified':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        );
      case 'policy_cancelled':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'refund_processed':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
        );
    //   case 'payment_received':
    //     return (
    //       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
    //           d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    //       </svg>
    //     );
      case 'email_sent':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
    }
  };

  /**
   * Get color for activity type
   */
  const getActivityColor = (type: ActivityType) => {
    switch (type) {
      case 'note_added':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'attachment_added':
        return 'bg-purple-100 text-purple-600 border-purple-200';
    //   case 'policy_created':
    //     return 'bg-green-100 text-green-600 border-green-200';
      case 'policy_modified':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'policy_cancelled':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'refund_processed':
        return 'bg-orange-100 text-orange-600 border-orange-200';
    //   case 'payment_received':
    //     return 'bg-emerald-100 text-emerald-600 border-emerald-200';
      case 'email_sent':
        return 'bg-indigo-100 text-indigo-600 border-indigo-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  /**
   * Format activity type for display
   */
  const formatActivityType = (type: ActivityType) => {
    return type.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-CA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded p-4 text-red-600">
        {error}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No activity history yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

        {/* Activity items */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div key={activity.id} className="relative flex items-start space-x-4">
              {/* Icon */}
              <div className={`flex-shrink-0 w-12 h-12 rounded-full border-2 flex items-center justify-center z-10 bg-white ${getActivityColor(activity.activityType)}`}>
                {getActivityIcon(activity.activityType)}
              </div>

              {/* Content */}
              <div className="flex-1 bg-white border rounded-lg p-4 shadow-sm">
                {/* Header */}
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {formatActivityType(activity.activityType)}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      {activity.description}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 whitespace-nowrap ml-4">
                    {formatDate(activity.createdAt)}
                  </span>
                </div>

                {/* Metadata */}
                {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(activity.metadata).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <span className="font-medium text-gray-500">
                            {key.charAt(0).toUpperCase() + key.slice(1)}:
                          </span>
                          <span className="text-gray-700">
                            {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performed by */}
                <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
                  Performed by: <span className="font-medium text-gray-700">
                    {activity.performedByName || activity.performedBy}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
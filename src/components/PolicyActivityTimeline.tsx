import React from "react";
import { ActivityType, PolicyActivity } from "../hooks/usePolicyActivity";
import {
  MdNoteAdd,
  MdAttachFile,
  MdEdit,
  MdCancel,
  MdRefresh,
  MdEmail,
  MdInfo,
  MdPerson,
  MdCallSplit,
  MdAutorenew,
  MdCreditCard,
} from "react-icons/md";

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
   * Get icon and color for activity type
   */
  const getActivityStyle = (type: ActivityType) => {
    switch (type) {
      case "note_added":
        return {
          icon: <MdNoteAdd className="text-xl" />,
          color: "bg-blue-100 text-blue-600 border-blue-200",
          dotColor: "bg-blue-500",
        };
      case "attachment_added":
        return {
          icon: <MdAttachFile className="text-xl" />,
          color: "bg-purple-100 text-purple-600 border-purple-200",
          dotColor: "bg-purple-500",
        };
      case "policy_modified":
        return {
          icon: <MdEdit className="text-xl" />,
          color: "bg-amber-100 text-amber-600 border-amber-200",
          dotColor: "bg-amber-500",
        };
      case "policy_cancelled":
        return {
          icon: <MdCancel className="text-xl" />,
          color: "bg-red-100 text-red-600 border-red-200",
          dotColor: "bg-red-500",
        };
      case "refund_processed":
        return {
          icon: <MdRefresh className="text-xl text-orange-600" />,
          color: "bg-orange-100 text-orange-600 border-orange-200",
          dotColor: "bg-orange-500",
        };
      case "email_sent":
        return {
          icon: <MdEmail className="text-xl" />,
          color: "bg-indigo-100 text-indigo-600 border-indigo-200",
          dotColor: "bg-indigo-500",
        };
        case "policy_split":
  return {
    icon: <MdCallSplit className="text-xl" />,
    color: "bg-teal-100 text-teal-600 border-teal-200",
    dotColor: "bg-teal-500",
  };
case "renewal_notice_sent":
  return {
    icon: <MdAutorenew className="text-xl" />,
    color: "bg-green-100 text-green-600 border-green-200",
    dotColor: "bg-green-500",
  };
case "payment_method_updated":
  return {
    icon: <MdCreditCard className="text-xl" />,
    color: "bg-sky-100 text-sky-600 border-sky-200",
    dotColor: "bg-sky-500",
  };
      default:
        return {
          icon: <MdInfo className="text-xl" />,
          color: "bg-gray-100 text-gray-600 border-gray-200",
          dotColor: "bg-gray-400",
        };
    }
  };

  /**
   * Format activity type for display
   */
  const formatActivityType = (type: ActivityType) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  /**
   * Format date for display
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-CA", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-medium text-text-secondary">
          Loading history...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 p-6 flex flex-col items-center text-center">
        <MdCancel className="text-4xl text-red-500 mb-2" />
        <h4 className="font-semibold text-red-900 mb-1">
          Error Loading History
        </h4>
        <p className="text-sm text-red-700">{error}</p>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50/50 border border-dashed border-gray-300">
        <MdInfo className="text-4xl text-gray-300 mx-auto mb-2" />
        <p className="text-gray-500 font-medium">
          No activity history recorded for this policy.
        </p>
      </div>
    );
  }

  return (
    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-100">
      {activities.map((activity) => {
        const style = getActivityStyle(activity.activityType);
        return (
          <div key={activity.id} className="relative group">
            {/* Timeline Connector Dot */}
            <div
              className={`absolute -left-[30px] top-1.5 w-5 h-5 rounded-full border-4 border-white ${style.dotColor} z-10 shadow-sm transition-transform group-hover:scale-110`}
            />

            <div className="bg-white border border-gray-100 shadow-sm overflow-hidden transition-all hover:shadow-md hover:border-gray-200">
              {/* Header Bar */}
              <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg border flex items-center justify-center ${style.color}`}
                  >
                    {style.icon}
                  </div>
                  <h4 className="font-bold text-gray-900">
                    {formatActivityType(activity.activityType)}
                  </h4>
                </div>
                <time className="text-xs font-medium text-gray-400">
                  {formatDate(activity.createdAt)}
                </time>
              </div>

              {/* Body */}
              <div className="p-4 space-y-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {activity.description}
                </p>

                {/* Metadata Grid */}
                {activity.metadata &&
                  Object.keys(activity.metadata).length > 0 && (
                    <div className="bg-gray-50/50 rounded-lg p-3 border border-gray-100 space-y-3">
                      {Object.entries(activity.metadata).map(([key, value]) => {
                        // Special handling for changedFields
                        if (key === "changedFields" && typeof value === "object" && value !== null) {
                          const filteredChanges = Object.entries(value as Record<string, any>)
                            .filter(([_, fieldValue]) => {
                              const oldValue = fieldValue?.old;
                              const newValue = fieldValue?.new;
                              if(!newValue) return false;
                              if(oldValue === newValue) return false;

                              // Filter out if both are effectively empty
                              const isEmpty = (v: any) => v === null || v === undefined || v === "";
                              if (isEmpty(newValue)) return false;

                              return true;
                            });

                          if (filteredChanges.length === 0) return null;

                          return (
                            <div key={key} className="space-y-2">
                              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                                Changed Fields
                              </span>
                              <div className="bg-white rounded border border-gray-200 overflow-hidden">
                                <table className="w-full text-sm">
                                  <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">Field</th>
                                      <th className="px-3 py-2 text-left text-xs font-semibold text-gray-600">New Value</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-gray-100">
                                    {filteredChanges.map(([fieldName, fieldValue]) => { 
                                      const newValue = fieldValue?.new;

                                      // Format date values
                                      const formatValue = (val: any) => {
                                        if (val === null || val === undefined) return "-";
                                        if (val === "") return "(empty)";
                                        // Check if it's a date string
                                        if (typeof val === "string" && val.match(/^\d{4}-\d{2}-\d{2}T/)) {
                                          return new Date(val).toLocaleDateString("en-CA", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                          });
                                        }
                                        return String(val);
                                      };

                                      return (
                                        <tr key={fieldName} className="hover:bg-gray-50">
                                          <td className="px-3 py-2 font-medium text-gray-700 capitalize">
                                            {fieldName.replace(/([A-Z])/g, " $1").trim()}
                                          </td>
                                          <td className="px-3 py-2 text-gray-900 font-medium">
                                            {formatValue(newValue)}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        }

                        // Regular metadata display
                        return (
                          <div key={key} className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <div className="text-sm text-gray-800 font-medium break-all">
                              {typeof value === "object" ? (
                                <pre className="overflow-x-auto">
                                  {Array.isArray(value) ? value.join(", ") : JSON.stringify(value, null, 2)}
                                </pre>
                              ) : (
                                String(value)
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                {/* Performed By Footer */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-50">
                  <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <MdPerson className="text-xs" />
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    Performed by:{" "}
                    <span className="text-gray-900 font-bold">
                      {activity.performedByName || activity.performedBy}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

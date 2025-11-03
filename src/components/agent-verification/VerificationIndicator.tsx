import React from 'react';
import { useSelector } from 'react-redux';
import { selectVerificationStatus } from '../../features/verificationSlice';
import { 
  CheckBadgeIcon, 
  ClockIcon, 
  ExclamationTriangleIcon,
  XCircleIcon 
} from '@heroicons/react/24/solid';
import { getUserTypeFromToken } from '../../utils/getUserType';

export default function VerificationIndicator() {
  const verificationStatus = useSelector(selectVerificationStatus);
  const userType = getUserTypeFromToken()?.userType;

  // Only show for AGENT and MGA users
  if (!userType || !['AGENT', 'MGA'].includes(userType)) {
    return null;
  }

  if (!verificationStatus) {
    return null;
  }

  const getIndicator = () => {
    // Check if verification is expired
    if (verificationStatus.verificationValidTill && 
        new Date(verificationStatus.verificationValidTill) <= new Date()) {
      return {
        icon: ExclamationTriangleIcon,
        color: 'text-orange-500',
        bgColor: 'bg-orange-100',
        title: 'Verification Expired'
      };
    }

    switch (verificationStatus.verificationStatus) {
      case 'VERIFIED':
        return {
          icon: CheckBadgeIcon,
          color: 'text-green-500',
          bgColor: 'bg-green-100',
          title: 'Verified'
        };
      case 'PENDING':
        return {
          icon: ClockIcon,
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-100',
          title: 'Verification Pending'
        };
      case 'REJECTED':
        return {
          icon: XCircleIcon,
          color: 'text-red-500',
          bgColor: 'bg-red-100',
          title: 'Verification Rejected'
        };
      case 'EXPIRED':
        return {
          icon: ExclamationTriangleIcon,
          color: 'text-orange-500',
          bgColor: 'bg-orange-100',
          title: 'Verification Expired'
        };
      case 'NOT_UPLOADED':
        return {
          icon: ExclamationTriangleIcon,
          color: 'text-gray-500',
          bgColor: 'bg-gray-100',
          title: 'Documents Required'
        };
      default:
        return null;
    }
  };

  const indicator = getIndicator();
  if (!indicator) return null;

  const Icon = indicator.icon;

  return (
    <div className="flex items-center space-x-2">
      <div className={`${indicator.bgColor} rounded-full p-1.5`} title={indicator.title}>
        <Icon className={`h-5 w-5 ${indicator.color}`} />
      </div>
      <span className="text-sm font-medium text-gray-700 hidden sm:inline">
        {indicator.title}
      </span>
    </div>
  );
}
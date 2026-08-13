// import { Navigate } from 'react-router-dom';
// import { ReactNode } from 'react';
// import Cookies from 'js-cookie';

// interface ProtectedRouteProps {
//   children: ReactNode;
// }

// const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//   const token = Cookies.get('token');

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;



// =============================



// import { Navigate, useLocation } from 'react-router-dom';
// import { ReactNode, useEffect, useState } from 'react';
// import Cookies from 'js-cookie';
// import { useDispatch, useSelector } from 'react-redux';
// import { getUserTypeFromToken } from '../../utils/getUserType';
// import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
// import { setVerificationStatus, selectIsVerified } from '../../features/verificationSlice';
// import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   requiresVerification?: boolean;
// }

// const ProtectedRoute = ({ children, requiresVerification = false }: ProtectedRouteProps) => {
//   const token = Cookies.get('token');
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isVerified = useSelector(selectIsVerified);
//   const [loading, setLoading] = useState(false);
//   const [verificationChecked, setVerificationChecked] = useState(false);
//   const { fetchStatus } = useGetVerificationStatus();
  
//   const userInfo = getUserTypeFromToken();
//   const userType = userInfo?.userType;

//   // Check if current route requires verification
//   const needsVerificationCheck = requiresVerification || 
//     location.pathname.startsWith('/product/'); // Product detail pages

//   useEffect(() => {
//     const checkVerification = async () => {
//       // Only check verification for AGENT and MGA users on protected routes
//       if (token && needsVerificationCheck && ['AGENT', 'MGA'].includes(userType)) {
//         setLoading(true);
//         try {
//           const status = await fetchStatus();
//           if (status) {
//             dispatch(setVerificationStatus(status));
//           }
//         } catch (error) {
//           console.error('Failed to fetch verification status:', error);
//         } finally {
//           setLoading(false);
//           setVerificationChecked(true);
//         }
//       } else {
//         setVerificationChecked(true);
//       }
//     };

//     if (token) {
//       checkVerification();
//     }
//   }, [token, userType, needsVerificationCheck, fetchStatus, dispatch]);

//   // Check authentication
//   if (!token) {
//     return <Navigate to="/login" />;
//   }

//   // Show loading while checking verification
//   if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType) && !verificationChecked) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a17c5]"></div>
//       </div>
//     );
//   }

//   // Check verification requirement for AGENT and MGA users
//   if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType) && !isVerified) {
//     return (
//       <div className="max-w-2xl mx-auto mt-16 px-4">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
//           <ShieldExclamationIcon className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Verification Required
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You need to verify your account to access this feature. 
//             Please upload your verification documents to continue.
//           </p>
          
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => window.location.href = '/profile'}
//               className="bg-[#3a17c5] text-white px-6 py-2 rounded-md hover:bg-[#2B00B7] transition-colors"
//             >
//               Go to Profile
//             </button>
//             <button
//               onClick={() => window.location.href = '/'}
//               className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


// ===================================




// import { Navigate, useLocation } from 'react-router-dom';
// import { ReactNode, useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useAppSelector } from '../../hooks/useReduxHooks';
// import { getUserTypeFromToken } from '../../utils/getUserType';
// import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
// import { setVerificationStatus, selectIsVerified } from '../../features/verificationSlice';
// import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

// interface ProtectedRouteProps {
//   children: ReactNode;
//   requiresVerification?: boolean;
// }

// const ProtectedRoute = ({ children, requiresVerification = false }: ProtectedRouteProps) => {
 
//   const { token, userType, initialized } = useAppSelector((state) => state.auth);
//   const location = useLocation();
//   const dispatch = useDispatch();
//   const isVerified = useSelector(selectIsVerified);
//   const [loading, setLoading] = useState(false);
//   const [verificationChecked, setVerificationChecked] = useState(false);
//   const { fetchStatus } = useGetVerificationStatus();

//   // Check if current route requires verification
//   const needsVerificationCheck = requiresVerification || 
//     location.pathname.startsWith('/product/'); // Product detail pages

//   useEffect(() => {
//     const checkVerification = async () => {
//       // Only check verification for AGENT and MGA users on protected routes
//       if (token && needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '')) {
//         setLoading(true);
//         try {
//           const status = await fetchStatus();
//           if (status) {
//             dispatch(setVerificationStatus(status));
//           }
//         } catch (error) {
//           console.error('Failed to fetch verification status:', error);
//         } finally {
//           setLoading(false);
//           setVerificationChecked(true);
//         }
//       } else {
//         setVerificationChecked(true);
//       }
//     };

//     if (token && initialized) {
//       checkVerification();
//     } else if (initialized) {
//       setVerificationChecked(true);
//     }
//   }, [token, userType, needsVerificationCheck, fetchStatus, dispatch, initialized]);

 
//   if (!initialized) {
//     return (
//       <div className="flex justify-center items-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a17c5]"></div>
//       </div>
//     );
//   }

//   // Check authentication
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

  
//   if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '') && !verificationChecked) {
//     return (
//       <div className="flex justify-center items-center min-h-[400px]">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a17c5]"></div>
//       </div>
//     );
//   }

  
//   if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '') && !isVerified) {
//     return (
//       <div className="max-w-2xl mx-auto mt-16 px-4">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
//           <ShieldExclamationIcon className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Verification Required
//           </h2>
//           <p className="text-gray-600 mb-6">
//             You need to verify your account to access this feature. 
//             Please upload your verification documents to continue.
//           </p>
          
//           <div className="flex justify-center space-x-4">
//             <button
//               onClick={() => window.location.href = '/profile'}
//               className="bg-[#3a17c5] text-white px-6 py-2 rounded-md hover:bg-[#2B00B7] transition-colors"
//             >
//               Go to Profile
//             </button>
//             <button
//               onClick={() => window.location.href = '/'}
//               className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute;


// =====================================================



import { Navigate, useLocation } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { useGetVerificationStatus } from '../../hooks/agent-verification/useGetVerificationStatus';
import { setVerificationStatus, selectIsVerified } from '../../features/verificationSlice';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface ProtectedRouteProps {
  children: ReactNode;
  requiresVerification?: boolean;
  /** User types allowed here. Omit to allow any authenticated user. */
  allowedRoles?: string[];
}

const ProtectedRoute = ({ children, requiresVerification = false, allowedRoles }: ProtectedRouteProps) => {
  const { token, userType, initialized } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const dispatch = useDispatch();
  const isVerified = useSelector(selectIsVerified);
  const [loading, setLoading] = useState(false);
  const [verificationChecked, setVerificationChecked] = useState(false);
  const { fetchStatus } = useGetVerificationStatus();

 
  const needsVerificationCheck = requiresVerification || 
    location.pathname.startsWith('/product/');

  useEffect(() => {
    const checkVerification = async () => {
      
      if (token && needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '')) {
        setLoading(true);
        try {
          const status = await fetchStatus(); // Uses cache internally
          if (status) {
            dispatch(setVerificationStatus(status));
          }
        } catch (error) {
          console.error('Failed to fetch verification status:', error);
        } finally {
          setLoading(false);
          setVerificationChecked(true);
        }
      } else {
        setVerificationChecked(true);
      }
    };

    if (token && initialized) {
      checkVerification();
    } else if (initialized) {
      setVerificationChecked(true);
    }
  }, [token, userType, needsVerificationCheck, fetchStatus, dispatch, initialized]);


  if (!initialized) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a17c5]"></div>
      </div>
    );
  }

 
  if (!token) {
    const returnUrl = location.pathname + location.search;
    return <Navigate to={`/login?returnUrl=${encodeURIComponent(returnUrl)}`} replace />;
  }

  // Role check — the sidebar hides links a user may not use, but the route
  // itself has to refuse anyone who reaches it by typing the URL.
  if (allowedRoles && !allowedRoles.includes(userType || '')) {
    return <Navigate to="/" replace />;
  }


  if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '') && !verificationChecked) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3a17c5]"></div>
      </div>
    );
  }

 
  if (needsVerificationCheck && ['AGENT', 'MGA'].includes(userType || '') && !isVerified) {
    return (
      <div className="max-w-2xl mx-auto mt-16 px-4">
        <div className="bg-yellow-50/30 border border-yellow-200 p-4 sm:p-8 text-center">
          <ShieldExclamationIcon className="h-16 w-16 text-yellow-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Required
          </h2>
          <p className="text-gray-600 mb-6">
            You need to verify your account to access this feature. 
            Please upload your verification documents to continue.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => window.location.href = '/profile'}
              className="btn-primary"
            >
              Go to Profile
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-2 py-3 bg-white border border-inputBorder hover:border-gray-700 cursor-pointer transition-all delay-100"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
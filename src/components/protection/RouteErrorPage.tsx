import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router-dom";

const RouteErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred. Please try again.";
  let statusCode: number | null = null;

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you're looking for doesn't exist or has been moved.";
    } else if (error.status === 401) {
      title = "Unauthorized";
      message = "You don't have permission to view this page.";
    } else if (error.status === 403) {
      title = "Access denied";
      message = "You don't have the required role to access this resource.";
    } else {
      message = error.data?.message || error.statusText || message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 max-w-md w-full text-center">

        {/* Status badge */}
        {statusCode && (
          <div className="inline-block bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold tracking-widest uppercase font-mono px-3 py-1 rounded-md mb-5">
            {statusCode}
          </div>
        )}

        {/* Icon */}
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5">
          <svg
            className="w-8 h-8 text-amber-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-primary tracking-tight mb-2">
          {title}
        </h1>
        <p className="text-sm text-slate-500 leading-relaxed mb-7">
          {message}
        </p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go to Dashboard
          </button>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-primary text-sm font-semibold px-4 py-2.5 rounded-lg border border-slate-200 transition-colors cursor-pointer"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RouteErrorPage;
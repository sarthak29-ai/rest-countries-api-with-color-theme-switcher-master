import { useNavigate, useRouteError } from 'react-router-dom';

const HomeError = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-in fade-in duration-500">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold text-very-dark-blue-light dark:text-white">
          Data Fetching Failed
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          We couldn't reach the world database. Please check your internet connection or try refreshing.
        </p>
        
        {/* Technical details hidden for users, but helpful for you in dev */}
        <p className="text-xs font-mono text-gray-400 dark:text-gray-500">
          Error: {error.statusText || error.message}
        </p>

        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-10 py-3 bg-white dark:bg-dark-blue shadow-lg rounded-md text-very-dark-blue-light dark:text-white hover:scale-105 transition-transform active:scale-95"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default HomeError;

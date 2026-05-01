import { useNavigate } from 'react-router-dom';
import { HiArrowNarrowLeft } from "react-icons/hi";

const DetailsError = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-12 md:py-20 animate-in fade-in slide-in-from-top-4">
      {/* Back Button to get user out of the error state */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 px-8 py-2 bg-white dark:bg-dark-blue shadow-md rounded-sm text-very-dark-blue-light dark:text-white mb-16 hover:opacity-80 transition-opacity"
      >
        <HiArrowNarrowLeft size={20} />
        Back to Home
      </button>

      <div className="flex flex-col items-center text-center py-10">
        <h2 className="text-3xl font-extrabold text-very-dark-blue-light dark:text-white mb-4">
          Country Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-sm">
          The country code in the URL appears to be incorrect or the data is no longer available.
        </p>
      </div>
    </div>
  );
};

export default DetailsError;

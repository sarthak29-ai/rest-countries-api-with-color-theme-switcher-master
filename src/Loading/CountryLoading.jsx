// components/skeletons/CountryCardSkeleton.jsx
const CountryCardSkeleton = () => {
  return (
    <div className="bg-white dark:bg-dark-blue rounded-md shadow-md overflow-hidden animate-pulse">
      {/* Flag Area */}
      <div className="w-full h-40 bg-gray-300 dark:bg-very-dark-blue-dark" />
      
      <div className="p-6 pb-10 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-300 dark:bg-very-dark-blue-dark rounded w-3/4" />
        
        {/* Stats */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-very-dark-blue-dark rounded w-full" />
          <div className="h-4 bg-gray-300 dark:bg-very-dark-blue-dark rounded w-5/6" />
          <div className="h-4 bg-gray-300 dark:bg-very-dark-blue-dark rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default CountryCardSkeleton;

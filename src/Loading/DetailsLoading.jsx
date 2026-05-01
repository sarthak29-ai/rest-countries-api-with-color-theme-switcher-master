import React, { useEffect } from 'react';
const DetailsLoading = () => {
  let ab = 0
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [ab]);
  return (
    <div className="px-6 md:px-16 py-12 md:py-20 max-w-[1440px] mx-auto animate-pulse">
      {/* Back Button Skeleton */}
      <div className="w-32 h-10 bg-white dark:bg-dark-blue shadow-md rounded-sm mb-16" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center">
        {/* Large Flag Skeleton */}
        <div className="w-full aspect-[4/3] bg-gray-300 dark:bg-dark-blue shadow-md rounded-sm" />

        <div className="space-y-8">
          {/* Title Skeleton */}
          <div className="h-10 bg-gray-300 dark:bg-dark-blue rounded w-1/2" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-dark-blue rounded w-full" />
              ))}
            </div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-gray-300 dark:bg-dark-blue rounded w-full" />
              ))}
            </div>
          </div>

          {/* Border Section Skeleton */}
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center mt-8">
            <div className="h-4 bg-gray-300 dark:bg-dark-blue rounded w-32" />
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-24 h-8 bg-gray-300 dark:bg-dark-blue rounded shadow-sm" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsLoading;

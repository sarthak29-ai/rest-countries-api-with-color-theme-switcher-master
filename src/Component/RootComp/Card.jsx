import React, { memo } from 'react';

function normalizeData(isApi, country) {
  if (!country) {
    return null;
  }
  
  return {
    name : isApi? country.name.common: country.name,
    flags : country.flags,
    population : country.population,
    capital : isApi? country.capital?.[0]: country.capital,
    region : country.region
  };
};


const CountryCard = ({ isApi, country }) => {
  const { name, flags, population, region, capital } = normalizeData(isApi, country);
  
  return (
    <article 
      className="bg-white dark:bg-dark-blue dark:text-very-light-gray rounded-md shadow-md overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-200 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-dark-blue"
      aria-labelledby={`country-name-${name}`}
      
    >
     
      <img 
        src={flags.svg} 
        alt={`Flag of ${name}`} 
        className="w-full h-40 object-cover"
      />
      <div className="p-6 pb-10">
        <h2 
          id={`country-name-${name}`}
          className="font-extrabold text-lg mb-4 text-dark-gray-light dark:text-white"
        >
          {name}
        </h2>
        <div className="space-y-1 text-sm text-dark-blue dark:text-very-light-gray">
          <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Population:</span> {population.toLocaleString()}</p>
          <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Region:</span> {region}</p>
          <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Capital:</span> {capital || 'N/A'}</p>
        </div>
      </div>
    </article>
  );
};

export default memo(CountryCard);

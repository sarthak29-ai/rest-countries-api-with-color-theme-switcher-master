import { useToggle } from '../../hooks/toggleHook';
import { useSearchParams, useSubmit } from 'react-router-dom';
import { HiChevronDown } from 'react-icons/hi';

const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const RegionFilter = () => {
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const activeRegion = searchParams.get("region") || "";
  
  const {isOpen, safeProps, containerProps} = useToggle("region-filter")

  const handleRegionClick = (region) => {
    // Create a new URLSearchParams object based on current params
    const params = new URLSearchParams(searchParams);
    
    if (region === "") {
      params.delete("region");
    } else {
      params.set("region", region);
    }

    // Submit the change to the URL, which triggers the loader
    submit(params);
    
  };

  return (
    <details className="group relative w-52 list-none" open={isOpen}>
      <summary 
        className="flex items-center justify-between p-4 bg-white dark:bg-dark-blue text-dark-gray-light dark:text-very-light-gray rounded-md shadow-sm cursor-pointer font-semibold text-sm list-none"
        role="button"
        aria-haspopup="listbox"
        {...containerProps}>
        <span>{activeRegion || 'Filter by Region'}</span>
        <HiChevronDown className="transition-transform group-open:rotate-180" size={18} />
      </summary>

      <ul className="absolute top-full left-0 mt-1 w-full bg-white dark:bg-dark-blue text-very-dark-blue-dark dark:text-very-light-gray rounded-md shadow-lg py-2 z-10" role="listbox">
        {regions.map((region) => (
          <li 
            key={region}
            role="option"
            aria-selected={activeRegion === region}
            onClick={() => handleRegionClick(region)}
            className="px-6 py-2 hover:bg-very-light-gray dark:hover:bg-very-dark-blue-dark cursor-pointer text-sm"
          >
            {region}
          </li>
        ))}
        {activeRegion && (
          <li 
            role="option"
            onClick={() => handleRegionClick("")}
            className="px-6 py-2 text-red-500 border-t border-gray-100 dark:border-gray-700 cursor-pointer text-sm italic"
          >
            Clear Filter
          </li>
        )}
      </ul>
    </details>
  );
};

export default RegionFilter;

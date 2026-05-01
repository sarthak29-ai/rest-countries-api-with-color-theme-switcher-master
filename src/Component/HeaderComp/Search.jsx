import { UseDebounce } from '../../hooks/debounce.jsx';
import { HiSearch } from 'react-icons/hi';
import { useSearchParams, useSubmit } from 'react-router-dom';

const Search = ({ searchQuery, setSearchQuery }) => {
  
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search") || "";
  const submitQuery = (value) => {
    const params = new URLSearchParams(searchParams);
    if (!value) params.delete("search");
    else params.set("search", value);
    
    submit(params, { replace: true });
  };
  
  const debouncedSubmit = UseDebounce(submitQuery, 300);
  
  
  
  return (
    <div className="relative w-full md:max-w-md shadow-sm rounded-md overflow-hidden">
      <label htmlFor="country-search" className="sr-only">
        Search for a country
      </label>
      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-light-gray dark:text-very-light-gray pointer-events-none">
        <HiSearch size={20} aria-hidden="true" />
      </div>
      <input
        type="search"
        name="search"
        defaultValue={query}
        placeholder="Search for a country..."
        onChange={(e) => debouncedSubmit(e.target.value)}
        className="w-full py-4 pl-16 pr-4 bg-white text-very-dark-blue-dark dark:bg-dark-blue dark:text-very-light-gray outline-none transition-colors text-sm md:text-base"
        aria-label="Search for a country"
      />
      {/* Announces updates to screen readers when filtering happens */}
      <span className="sr-only" aria-live="polite">
        {searchQuery ? `Searching for ${searchQuery}` : "Showing all countries"}
      </span>
    </div>
  );
};

export default Search;




// components/CountryHero.jsx
import { Link } from 'react-router-dom';
import { HiArrowNarrowLeft } from "react-icons/hi";


const CountryHero = ({ country, onBackClick }) => {
  const { 
    name, flags, population, region, subregion, 
    capital, tld, currencies, languages, borders, nativeName 
  } = country;
  


  const currencyList = Array.isArray(currencies)? currencies.map(c => c.name).join(', ') : 'N/A';
  
  const languageList = Array.isArray(languages)? languages.join(', '): 'N/A';
  
  

  return (
    <section className="px-6 md:px-16 py-12 md:py-20 max-w-[1440px] mx-auto transition-colors">

      <button 
        onClick={onBackClick}
        className="flex items-center gap-2 px-6 py-2 bg-white dark:bg-dark-blue shadow-[0_0_7px_0_rgba(0,0,0,0.1)] dark:shadow-none rounded-sm mb-16 dark:text-very-light-gray hover:opacity-75 transition-all active:scale-95"
        aria-label="Go back to the previous page"
      >
      <HiArrowNarrowLeft size={20}/>
      Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center">
        
        <div className="w-full">
          <img 
            src={flags.svg} 
            alt={`Flag of ${name}`} 
            className="w-full h-auto shadow-md rounded-sm object-cover max-h-[400px]"
          />
        </div>

        
        <div className="dark:text-white">
          <h1 className="text-2xl md:text-4xl font-extrabold mb-8">{name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12  text-dark-blue dark:text-very-light-gray">
            
            <div className="space-y-3 text-sm md:text-base">
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Native Name:</span> {nativeName}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Population:</span> {population.toLocaleString()}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Region:</span> {region}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Sub Region:</span> {subregion || 'N/A'}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Capital:</span> {capital || 'N/A'}</p>
            </div>
            
            
            <div className="space-y-3 text-sm md:text-base text-dark-blue dark:text-very-light-gray">
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Top Level Domain:</span> {tld || 'N/A'}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Currencies:</span> {currencyList}</p>
              <p><span className="font-semibold text-very-dark-blue-dark dark:text-white">Languages:</span> {languageList}</p>
            </div>
          </div>
        

        
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center mt-8">
            <h3 className="font-semibold text-very-dark-blue-dark dark:text-white text-base whitespace-nowrap">Border Countries:</h3>
            <div className="flex flex-wrap gap-2">
              {borders?.length > 0 ? (
                borders.map(border => (
                  <Link 
                    key={border} 
                    to={`/country/${border}`}
                    className="min-w-[96px] text-center px-4 py-1 text-dark-blue dark:text-very-light-gray bg-white dark:bg-dark-blue shadow-[0_0_5px_0_rgba(0,0,0,0.1)] dark:shadow-none rounded-[3px] text-sm hover:opacity-70 transition-opacity dark:border-none"
                  >
                    {border}
                  </Link>
                ))
              ) : (
                <span className="text-sm opacity-60 italic">No neighboring countries</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CountryHero;

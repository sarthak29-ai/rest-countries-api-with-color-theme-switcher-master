import { countryCache } from '../cache/CountryCache';

const helper = async ( request) => {
  
  
  
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("search")?.toLowerCase();
  
  const region = url.searchParams.get("region");
  const cache = countryCache.getCountries(region, searchTerm)
  console.log(cache);
  
  if(cache && cache.fromCache){
    console.log("from cache");
    return {
      isApi: cache.isApi, 
      countries : cache.countries,
      isPrev: cache.isPrev
    }
  }
  
  const resStr = region? `region/${region}?`: "all?";
  let dataFromApi = true
  let countries;
  let backUpcountries;
  
  if(!cache){
    let response = await fetch(`https://restcountries.com/v3.1/${resStr}fields=name,capital,flags,population,region,cca3,alpha3Code`);
    
    if (!response.ok){
      response = await fetch("./data.json")
      dataFromApi = false
    };
    countries = await response.json();
    backUpcountries = countries;
  }else{
   dataFromApi = cache.isApi;
   countries = cache.countries;
   backUpcountries = cache.countries;
  }
  
  
  
  // Filter logic based on URL params
  if (searchTerm && dataFromApi) {
    countries = countries.filter(c => 
      c.name.common.toLowerCase().includes(searchTerm)
    );
  }else if(searchTerm) {
    countries = countries.filter(c => 
      c.name.toLowerCase().includes(searchTerm))
  }

  if (region && !dataFromApi) {
    countries = countries.filter(c => c.region === region);
  }
  
  countryCache.setCountries(backUpcountries, countries ,dataFromApi, region, searchTerm)
  

  return {isApi: dataFromApi, countries :countries, isPrev: cache? cache.isPrev: false};
};


export function CountriesLoader({request}) {
  return {data: helper(request)}
}
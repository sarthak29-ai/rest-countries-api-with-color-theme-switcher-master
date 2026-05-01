
function normalizeData(isApi, country) {
  if (!country) {
    return null;
  }
  let native = country.nativeName;
  let curr = country.currencies;
  let lang = country.languages;
  
  
  if(isApi){
    native = country.name?.nativeName ? Object.values(country.name.nativeName)[0].common : country?.name?.common
    lang = lang && Object.values(lang);
    curr = curr && Object.values(curr);
  }else{
    curr = curr && curr.map(el => {
      if(el?.name){
        return el.name;
      }
    })
    lang = lang && lang.map(el => {
      if(el?.name){
        return el.name;
      }
    })
  }
  
  
  
  return {
    name : isApi? country.name.common: country.name,
    flags : country.flags,
    population : country.population,
    capital : isApi? country.capital?.[0]: country.capital,
    region : country.region,
    subregion: country.subregion, 
    tld: isApi? country.tld?.[0]: country.topLevelDomain, 
    currencies: curr, 
    languages: lang, 
    borders: country.borders,
    nativeName: native
  };
};



const helper = async ({ params }) => {
  const { id } = params;
  let response = {}
  try {
    response = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
    
  } catch (err) {
    console.error("api error",err);
  }
  
  
  let dataFromApi = true
  try {
    if (!response.ok){
      response = await fetch("../../data.json")
      dataFromApi = false
    };
  } catch (err) {
    console.error("local data error",err);
  }
  
  
  let data
  try {
    data = await response.json();
  } catch (err) {
    console.error(err);
  }
  
  
  
  if(!dataFromApi){
    data = data.find(c => c.alpha3Code === id);
  }
  
  
  return normalizeData(dataFromApi, (data[0] || data)); // Returns the single country object
};


export function DetailsLoader({params}) {
  return {detailsData: helper({params})}
}
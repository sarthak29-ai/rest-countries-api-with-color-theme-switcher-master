// utils/countryCache.js

class CountryCache {
  constructor() {
    this.cache = {
      all: null,
      byFilter: new Map(),
      timestamp: null,
      isApi: null,
      Prev: null
    };
    this.cacheDuration = 10 * 60 * 1000; // 10 minutes
  }

  isCacheValid() {
    if (!this.cache.all) return false;
    const now = Date.now();
    return now - this.cache.timestamp < this.cacheDuration;
  }

  setCountries(countries, filCountries ,isApi, region = null, search = null) {
    this.cache.all = countries;
    this.cache.isApi = isApi;
    this.cache.timestamp = Date.now();
    const filterKey = `${region}-${search}`
    this.cache.prev = [region, search];
    this.cache.byFilter.set(filterKey , filCountries)
  }

  getCountries(region = null, search = null) {
    if (!this.isCacheValid()) {
      return null;
    }
    
    const filterKey = `${region}-${search}`
    const ref = [region, search];
    const isPrevious = this.cache.prev.every((item, id) => item === ref[id]);
    this.cache.prev = ref;
    
    
    const fromFilter = this.cache.byFilter.get(filterKey);
    
    if (fromFilter) {
      
      return {
        countries: fromFilter,
        isApi: this.cache.isApi,
        fromCache: true,
        isPrev: isPrevious
      };
    }

    if (this.cache.all) {
      
      return {
        countries: this.cache.all,
        isApi: this.cache.isApi,
        fromCache: false ,
        isPrev: isPrevious
      };
    }

    return null;
  }

  clearCache() {
    this.cache = {
      all: null,
      byFilter: new Map(),
      timestamp: null,
      isApi: null
    };
  }
}

export const countryCache = new CountryCache();
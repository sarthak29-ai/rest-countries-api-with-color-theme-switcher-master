import { homeCache } from '../cache/HomeCache';
import { useToggle } from '../hooks/toggleHook';
import HomeLoading from '../Loading/HomeLoading';
import React, { Profiler, Suspense, memo, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import CountryCard from '../Component/RootComp/Card';
import Search from '../Component/HeaderComp/Search';
import RegionFilter from '../Component/HeaderComp/RegionFilter';
import { Await, Link, useLoaderData, useLocation } from 'react-router-dom';



const MemoizedCountryCard = memo(({ country, isApi, to }) => (
  <Link to={to}>
    <CountryCard country={country} isApi={isApi} />
  </Link>
));


const Home = () => {
  
  const location = useLocation();
  const {data} = useLoaderData();
  const onRender = (id, phase, actualDuration, baseDuration) => {

  //console.log(`${id} (${phase}) took ${actualDuration}ms`);
};
  const { disableProps} = useToggle("region-filter", false)
  
  const cache = homeCache.getCount()
  const observerTarget = useRef(null);
  const currentPathRef = useRef(false);
  


  
  
  return (
    <>
      <Profiler id="country-card" onRender={onRender}>
  

      {/* Wrap controls in a Form to sync with React Router's loader automatically */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-10 px-4 md:px-16 py-10">
        <Search />
        <RegionFilter />
      </div>
      <Suspense fallback={<HomeLoading />}>
        <Await resolve={data}>
          {({isApi, countries, isPrev}) => {
            
            
            const [displayCount, setDisplayCount] = useState(cache)
            
          
            // Logic for the tiered sequence: 10 -> +40 -> +30 -> +30...
            const loadMore = () => {
              setDisplayCount((prevCount) => {
                return prevCount + 30; // 50 + 30 and so on
              });
            };
        
            useEffect(() => {
              const observer = new IntersectionObserver(
                (entries) => {
                  if (entries[0].isIntersecting && displayCount < countries.length) {
                    loadMore();
                    
                  }
                },
                { threshold: 0.6 }
              );
          
              if (observerTarget.current) {
                observer.observe(observerTarget.current);
              }
          
              return () => observer.disconnect();
            }, [displayCount, countries.length]);
            
            

            useLayoutEffect(() => {
              return () => {

                if (currentPathRef.current) {
                  const scrollPos = window.scrollY;
                  homeCache.setScroll(scrollPos);
                }
              };
            }, [currentPathRef.current]);
              
            
            
            
        
            useEffect(() => {
              if (countries.length > 0 && displayCount === 10) {
                
                requestAnimationFrame(() => {

                  setTimeout(() => {
                    
                    setDisplayCount(50);
                    
                    // Perform your immediate task here
                  }, 0);
                });
              }
            }, [countries, displayCount]);
            
            
            
            useLayoutEffect(() => {
              if(!isPrev && countries){
                setDisplayCount(10)
              }
          
              requestAnimationFrame(()=>{
                setTimeout(() => {
                    if (isPrev) {
                      
                      const beh = displayCount > 110? 'instant': 'smooth';
                      
                      window.scrollTo({
                        top: homeCache.getScroll(),
                        behavior: beh 
                      })
                    }
                      currentPathRef.current = true;
                    
                  }, 0);
              })
            }, [countries.length, isPrev]);
            
            useEffect(() => {
              if(displayCount > 10){
                homeCache.setCount(displayCount);
                
              }

            }, [displayCount]);
          
            const visibleCountries = useMemo(() => {
                return countries.slice(0, displayCount);
              }, [countries, displayCount]);


            return (
              <>
                <section 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4 md:px-16 pb-10 [content-visibility:auto] [contain-intrinsic-size:300px_400px]"
                  aria-label="Country list"
                  
                  {...disableProps}
                >
                  {visibleCountries.map((country) => (
                    <MemoizedCountryCard
                        key={isApi ? country.cca3 : country.alpha3Code}
                        country={country}
                        isApi={isApi}
                        to={`/country/${isApi ? country.cca3 : country.alpha3Code}`}
                      />                    
                  ))}
                </section>
                {displayCount < countries.length && (
                  <div 
                    ref={observerTarget} 
                    className="h-20 flex items-center justify-center dark:text-white"
                  >
                    <p className="animate-pulse italic opacity-50">Loading more countries...</p>
                  </div>
                )}
              </>
              )
          }}
        </Await>
      </Suspense>

      </Profiler>
    </>
  );
};

export default Home;

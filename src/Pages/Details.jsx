import DetailsLoading from '../Loading/DetailsLoading';
import React, { Suspense, useEffect } from 'react';
import CountryHero from '../Component/RootComp/HeroCard';
import { Await, useLoaderData, useNavigate } from 'react-router-dom';


const Details = () => {
  
  const { detailsData} = useLoaderData();
  const navigate = useNavigate();

  


  return (
    <Suspense fallback={<DetailsLoading />}>
      <Await resolve={detailsData}>
        {(country) =>{
          useEffect(() => {
            if(country){
              window.scrollTo(0, 0);
            }
          }, [country]);
          
          return (
          <div className="animate-in fade-in duration-500">
            <CountryHero country={country} 
              onBackClick={() => navigate(-1)} ></CountryHero>
          </div>
          )
        }}
      </Await>
    </Suspense>
  );
};

export default Details;

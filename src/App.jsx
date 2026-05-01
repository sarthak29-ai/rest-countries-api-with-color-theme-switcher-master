import React, { useEffect } from 'react';
import DetailsLoading from './Loading/DetailsLoading';
import HomeLoading from './Loading/HomeLoading';
import { DetailsLoader } from './Loader/detailsLoader.jsx';
import { CountriesLoader } from './Loader/CountriesLoader.jsx';
import RootLayout from './layouts/RootLayout';
import Home from './Pages/Home';
import Details from './Pages/Details';
import { RouterProvider, createHashRouter } from 'react-router-dom';


const router = createHashRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: countriesLoader,
        element: <Home />,
        HydrateFallback: HomeLoading, // Your custom grid skeleton
        errorElement: <ErrorFallback type="home" />,
      },
      {
        path: "country/:id",
        loader: detailsLoader,
        element: <Details />,
        HydrateFallback: DetailsLoading, // Your custom hero skeleton
        errorElement: <ErrorFallback type="details" />,
      },
    ],
  },
  {
    basename: "/rest-countries-api-with-color-theme-switcher-master", 
  },
]);


export default function App() {
  
  // Optional: Add this to your main App.js or Router
useEffect(() => {
  // Auto: Browser handles scroll (some cases)
  // Manual: You handle scroll (our case - better control)
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }
}, []);
  return <RouterProvider router={router} />;
}

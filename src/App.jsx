import React, { useEffect } from 'react';
import DetailsLoading from './Loading/DetailsLoading';
import HomeLoading from './Loading/HomeLoading';
import { DetailsLoader } from './Loader/detailsLoader.jsx';
import { CountriesLoader } from './Loader/CountriesLoader.jsx';
import RootLayout from './layouts/RootLayout';
import Home from './Pages/Home';
import Details from './Pages/Details';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        loader: CountriesLoader,
        element: <Home />,
        HydrateFallback: HomeLoading,
        errorElement: <div className="p-16 dark:text-white">Country not found.</div>
      },
      {
        path: "country/:id",
        loader: DetailsLoader,
        element: <Details />,
        HydrateFallback: DetailsLoading,
        errorElement: <div className="p-16 dark:text-white">Country not found.</div>
      },
    ],
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

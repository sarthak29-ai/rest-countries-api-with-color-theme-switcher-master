import Header from '../Component/HeaderComp/Header';
import { Outlet } from 'react-router-dom';


const RootLayout = () => {
  
  return (
    <div className="min-h-screen bg-very-light-gray dark:bg-very-dark-blue-dark transition-colors">
      <Header />
      <main>
        {/* This is where the Home or Details page will appear */}
        <Outlet />
      </main>
      
    </div>
  );
};

export default RootLayout;

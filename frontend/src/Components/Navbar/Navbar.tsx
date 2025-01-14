import React, { useState } from 'react';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface propsType {
    isLoggedIn:boolean,
    setIsLoggedIn: (arg0: boolean) => void
}

const Navbar:React.FC<propsType> = ({isLoggedIn, setIsLoggedIn}) => {
  const [userName, setUserName] = useState('John Doe');

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

//   const handleLogin = () => {
//     setIsLoggedIn(true);
//   };


  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Hospital Name */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-blue-600">
              City General Hospital
            </h1>
          </div>

          {/* Center items */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Departments
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              Contact
            </a>
          </div>

          {/* Right side - Auth section */}
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <div className="flex items-center space-x-3">
                  {/* Custom Avatar */}
                  <div className="relative w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    {userName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {userName}
                  </span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to={'/auth'}
                // onClick={handleLogin}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
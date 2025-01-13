import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate('/main'); 
  };

  return (
    <>
      <nav className="bg-blue-600 fixed top-0 left-0 w-full z-50 shadow-md py-2 mb-2">
        <div className="flex items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold text-white underline decoration-2">Matrimony💘</span>

          <div className="flex items-center space-x-6">
            <ul className="flex items-center space-x-6">
              <Link to="/dashboard">
              <li><a href="#" className="text-black hover:underline">Home</a></li>
              </Link>
              <li><a href="#" className="text-black hover:underline">About</a></li>
            </ul>
            <div className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full"src="https://images.pexels.com/photos/1488318/pexels-photo-1488318.jpeg"/>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                  <Link to="/user">
                  <div className="px-4 py-3">
                    <span className="block text-sm font-medium text-black hover:bg-gray-300">Profile</span>
                  </div>
                  </Link>
                  <ul>
                    <Link to="/editUser">
                    <li><a className="block px-4 py-2 text-sm text-black hover:bg-gray-300">Settings</a></li>
                    </Link>
                    <Link to="/main" >
                    <li onClick={handleLogout}><a className="block px-4 py-2 text-sm text-black hover:bg-red-200">Sign out</a></li>
                    </Link>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

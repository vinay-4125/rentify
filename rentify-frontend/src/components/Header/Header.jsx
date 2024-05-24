import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../../public/logo.png"
import { ModeToggle } from '../ModeToggle';
import { Toaster , toast} from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserLocalStorage } from '../redux/slice/userSlice';
import axios from 'axios';
import { server } from '@/main';
import { Cookie } from 'lucide-react';


const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const dispatch = useDispatch();
  // const { userId } = useSelector((state) => state.userId);  
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();
  
  const checkAuthentication = () => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token);
  };

  useEffect(() => {
    console.log(localStorage.getItem('token'))
    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${server}/api/logout`);
      if (res.data.success) {
        dispatch(deleteUserLocalStorage());
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error("Logout Failed")
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="bg-background top-0 fixed z-50 shadow-[0_17px_17px_-25px_rgba(0,0,0,0.3)] dark:shadow-[0_17px_17px_-25px_rgba(255,255,255,0.4)] w-screen text-white pl-8 pr-8 pb-1 flex justify-between items-center">
      <div className="text-lg font-bold">
        <Link to="/"><img
                    className="block h-20 w-48"
                    src={logo}
                    alt="Logo"
                  /></Link>
      </div>
      <nav className="flex space-x-4">
        {!isLoggedIn && (
          <>
            <Link 
              to="/register" 
              className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </Link>
            <Link 
              to="/login" 
              className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            >
              Login
            </Link>
            <button 
            className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
          </>
        )}
        {isLoggedIn && (
          <button 
            className="bg-primary hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
        <ModeToggle />
      </nav>
      <Toaster richColors position="bottom-left" />
    </header>
  );
};

export default Header;

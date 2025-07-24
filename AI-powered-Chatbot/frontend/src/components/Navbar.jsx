import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { Menu } from 'lucide-react'; // Icon from lucide-react

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const auth = localStorage.getItem('user')
  const navigate = useNavigate()

  useEffect(()=>{
    if(auth){
      setToggle(true)
    }
    else{
      setToggle(false)
    }
  })

  // const toggleSidebar = () => {
  //   setToggle(!toggle);
  // };

  const logout = ()=>{
    localStorage.clear()
    window.dispatchEvent(new Event("authChanged")); // used for navbar rendering logic
    navigate('/login')
  }

  return (
    <>
      {/* Hamburger Button 
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4  bg-white border border-gray-300 p-2 rounded-lg shadow hover:bg-pink-50 transition"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>

      /* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 shadow-md z-40 transform transition-transform duration-300 ease-in-out ${
          toggle ? 'translate-x-0 w-64' : '-translate-x-full'
        }`}
      >
        {/* Close Button (Hamburger Again) */}
        {/* <button
          onClick={toggleSidebar}
          className="absolute top-4 left-56 p-1 text-gray-700 hover:text-pink-600 "
        >
          <Menu className="w-6 h-6" />
        </button> */}

        {/* Sidebar Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-pink-600 mb-6">MMC-AI</h2>
          <ul className="space-y-4 text-lg font-medium text-gray-800">
             {auth? 
              <> 
                <li>
                  <Link to="/"  className="hover:text-pink-600 transition">Home</Link>
                </li>
                <li>
                  <Link to="/chatbots"  className="hover:text-pink-600 transition">Chatbots</Link>
                </li>
                <li>
                  <Link to="/tti"  className="hover:text-pink-600 transition">Text-to-Image</Link>
                </li>
                
                <li>
                  <Link to="/tts" className="hover:text-pink-600 transition">Text-to-Speech</Link>
                </li>
                <li>
                  <Link to="/itt" className="hover:text-pink-600 transition">Image-to-text(OCR)</Link>
                </li>
                 {/* <li>
                  <Link to="/profile" className="hover:text-pink-600 transition">Profile</Link>
                </li> */}
                
                {/* <li>
                  <Link to="/vtt" className="hover:text-pink-600 transition">Voice-to-text</Link>
                </li> */}
              </>:<></>}
                {auth?
                  <li>
                    <Link onClick={logout} to="/signup" className="hover:text-pink-600 transition">Logout</Link>
                  </li>
                :
                  <>
                    
                  </>
                }
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
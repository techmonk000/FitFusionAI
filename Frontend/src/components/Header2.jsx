import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/brain.jpg";
import { useAuth } from "../context/AuthContext";

export default function Header2() {
  const [headerScale, setHeaderScale] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scaleMultiplier = 0.004;

      const newScale = Math.max(1 - scrollPosition * scaleMultiplier, 0);
      setHeaderScale(newScale);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 768 });

  const headerStyle = {
    transform: `scale(${headerScale})`,
  };

  const outerDivStyle = {
    display: headerScale === 0 ? "none" : "block",
  };

  const toggleMenu = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const toggleMenu1 = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogoutClick = () => {
    logout()
    navigate("/");
  };
  const handleAboutUsClick = () => {
    navigate("/aboutus");
  };

  return (
    <div className="px-8 py-8 fixed z-10 w-full" style={outerDivStyle}>
      <div
        className="font-bold text-black h-10 p-5 rounded-full flex justify-between items-center bg-white"
        style={headerStyle}
      >
        <div>
          <p className="text-2xl cursor-pointer">FitFusionAI</p>
        </div>
        <div className="flex items-center">
        {isMobile ? (
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={toggleMenu1}
                name={menuOpen ? "close" : "menu"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </div>
          ) : (
          <ul className="flex md:flex-row flex-col md:items-center gap-16">
            <li>
              <Link className="hover:text-gray-500" to="posedetector">
                Pose Detector
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="food">
                Diet Recommender
              </Link>
            </li>
            <li>
              <Link className="hover:text-gray-500" to="therapy">
                Therapy
              </Link>
            </li>
            
          </ul>
          )}
        </div>
        <div className="flex items-center gap-5">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded={dropdownOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open user menu</span>
            <img className="w-8 h-8 rounded-full" src={Logo} alt="user photo" />
          </button>
          <div
            className={`z-50 ${
              dropdownOpen ? "block" : "hidden"
            } my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
            style={{
              position: "absolute",
              top: "calc(50% + 8px)", // Adjust the value based on your design
              right: 20,
            }}
          >
            <div className="px-4 py-3">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
              <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
                name@flowbite.com
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <Link
                  to="userdetails"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  User-Details
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogoutClick}
                  className="block px-4 py-2 w-full text-start text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

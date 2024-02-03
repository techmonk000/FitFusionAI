import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header2 from "./Header2";

export default function Header() {
  const [headerScale, setHeaderScale] = useState(1);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

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
    setMenuOpen(!menuOpen);
  };

  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleSignupClick = () => {
    navigate("/signup");
  };
  const handleAboutUsClick = () => {
    navigate("/aboutus");
  };

  return (
    !isLoggedIn ? <div className="px-8 py-8 fixed z-10 w-full" style={outerDivStyle}>
      <div
        className="font-bold text-black h-10 p-5 rounded-full flex justify-between items-center bg-white"
        style={headerStyle}
      >
        <div>
          <p className="text-2xl cursor-pointer">FitFusionAI</p>
        </div>
        <div className="flex items-center">
          {isMobile ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={3}
                stroke="currentColor"
                className="w-6 h-6"
                onClick={toggleMenu}
                name={menuOpen ? "close" : "menu"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </>
          ) : (
            <ul className="flex md:flex-row flex-col md:items-center gap-8">
              <li>
                <a className="hover:text-gray-500" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Team
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Contact Us
                </a>
              </li>
            </ul>
          )}
        </div>
        {isMobile && menuOpen && (
          <div className="md:hidden absolute right-0 top-20 bg-white p-4 shadow-md">
            <ul className="flex flex-col gap-4">
              <li>
                <a className="hover:text-gray-500" href="#">
                  Features
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  About Us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Team
                </a>
              </li>
              <li>
                <a className="hover:text-gray-500" href="#">
                  Contact Us
                </a>
              </li>
              <li>
                <button onClick={handleLoginClick} className="bg-[#1be95c] text-black px-5 py-1.5 rounded-full hover:bg-[#0a7e29]">
                  Sign in
                </button>
              </li>
              <li>
                <button onClick={handleSignupClick} className="bg-[#1be95c] text-black px-5 py-1.5 rounded-full hover:bg-[#0ca234]">
                  Sign up
                </button>
              </li>
            </ul>
          </div>
        )}
        {!isMobile && (
          <div className="flex items-center gap-5">
            <button onClick={handleLoginClick} className="bg-[#1be95c] text-black px-5 py-0.5 rounded-full hover:bg-[#6cd81e]">
              Login
            </button>
            <button onClick={handleSignupClick} className="bg-[#1be95c] text-black px-5 py-0.5 rounded-full hover:bg-[#6cd81e]">
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>: <Header2 />
  );
}

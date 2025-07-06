import { useEffect, useState } from "react";
import { FaFacebookF, FaTwitter, FaPhone } from "react-icons/fa6";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="flex flex-col space-y-8 max-w-[90rem] mx-auto px-8 py-4 text-white">
        {/* Social Links & Number */}
        <div className="flex justify-between items-center">
          {/* Social Links */}
          <div>
            <ul className="flex space-x-16">
              <li className="text-2xl text-black cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                <FaFacebookF />
              </li>
              <li className=" text-2xl text-black cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                <FaTwitter />
              </li>
              <li className=" text-2xl text-black cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                <FaInstagram />
              </li>
              <li className=" text-2xl text-black cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                <FaLinkedin />
              </li>
            </ul>
          </div>

          {/* Contact Number */}
          <div className="flex items-center space-x-2">
            <div className="text-[#0957CB]">
              <FaPhone />
            </div>
            <h1 className="text-lg text-[#]">+14 312-423-523</h1>
          </div>
        </div>

        {/* Logo, navigation, buttons */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            {/* D */}
            <div className="text-[#0957CB] text-5xl">D</div>
            {/* Anke Schon */}
            <div className="leading-tight">
              <p>anke</p>
              <p>schon</p>
            </div>
          </Link>

          {/* Navigations */}
          <div>
            <ul className="flex space-x-16">
              <li className="cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                Home
              </li>
              <li className="cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                About
              </li>
              <li className="cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                Contact
              </li>
              <li className="cursor-pointer hover:text-[#0957CB] transition-colors duration-200">
                Agents
              </li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            {/* List a Place button */}
            <div>
              <button className="bg-transparent border-2 border-[#0957CB] py-1 px-3 rounded-full cursor-pointer hover:bg-[#0957CB] hover:text-white transition-colors duration-200">
                List a place
              </button>
            </div>

            {/* Properties button */}
            <div>
              <button className="bg-[#0957CB] text-white shadow-lg py-1 px-3 rounded-full cursor-pointer hover:shadow-[#095cd9] hover:bg-[#0c6af7] transition-shadow duration-200 ">
                Properties
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;

import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="logo.svg"
              alt="Memphis Ingénierie & Technologies"
              className="h-12 w-auto"
            />
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection("accueil")}
              className="nav-link text-slate-700 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              Accueil
            </button>
            <button
              onClick={() => scrollToSection("services")}
              className="nav-link text-slate-700 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection("parcours")}
              className="nav-link text-slate-700 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              Parcours
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="nav-link text-slate-700 hover:text-blue-900 font-medium transition-colors duration-200"
            >
              Contact
            </button>
          </nav>

          {/* Menu Mobile */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-700 hover:text-blue-900 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Menu Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg border-t border-slate-200">
            <div className="px-4 py-3 space-y-3">
              <button
                onClick={() => scrollToSection("accueil")}
                className="block w-full text-left text-slate-700 hover:text-blue-900 font-medium py-2 transition-colors duration-200"
              >
                Accueil
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="block w-full text-left text-slate-700 hover:text-blue-900 font-medium py-2 transition-colors duration-200"
              >
                Services
              </button>
              <button
                onClick={() => scrollToSection("parcours")}
                className="block w-full text-left text-slate-700 hover:text-blue-900 font-medium py-2 transition-colors duration-200"
              >
                Parcours
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="block w-full text-left text-slate-700 hover:text-blue-900 font-medium py-2 transition-colors duration-200"
              >
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

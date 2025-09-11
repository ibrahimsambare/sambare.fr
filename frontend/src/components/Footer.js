import React from "react";
import { MapPin, Phone, Mail, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et description */}
           <div className="flex items-center space-x-3">
              <img
                src="logo.svg"
                alt="Sambare Conseil"
                className="h-12 w-auto"
              />
            </div>
            <p className="text-slate-300 max-w-md leading-relaxed">
              SAMBARE Conseil, votre partenaire de confiance pour 
              l'accompagnement dans vos projets stratégiques et technologiques en 
              Afrique et à l'international.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-slate-800 hover:bg-blue-900 p-3 rounded-full transition-colors duration-300"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">
                  Conseil stratégique
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">
                  Gestion de projets
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">
                  Audit des SI
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">
                  Formation
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors duration-200">
                  Transformation digitale
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-4 text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <div>
                  <p>Niamey, Niger</p>
                  <p>Quartier Plateau</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone size={18} className="flex-shrink-0" />
                <p>+227 90 72 20 30 <br />
                +225 07 57 85 64 76 </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail size={18} className="flex-shrink-0" />
                <p>contact@sambare.fr</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-center md:text-left">
              © 2025 SAMBARE Conseil. Tous droits réservés.
            </p>
            
            <div className="flex space-x-6 text-slate-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Conditions Générales d'Utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

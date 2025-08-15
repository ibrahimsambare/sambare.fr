import React from "react";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="accueil" className="pt-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu textuel */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                SAMBARE
                <span className="text-blue-900 block">
                  Consulting
                </span>
              </h1>
              
              <div className="w-24 h-1 bg-blue-900 rounded"></div>
              
              <p className="text-xl md:text-2xl text-blue-900 font-semibold">
                Des solutions sur mesure pour vos projets stratégiques et technologiques
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                SAMBARE Consulting accompagne les entreprises, institutions financières, 
                administrations et organisations internationales dans leurs projets de transformation 
                digitale et d'optimisation technologique en Afrique et à l'international.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToContact}
                className="group bg-blue-900 hover:bg-blue-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <span>Nous contacter</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <button
                onClick={() => document.getElementById("services").scrollIntoView({ behavior: "smooth" })}
                className="border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Découvrir nos services
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img
                src="https://customer-assets.emergentagent.com/job_consulting-experts/artifacts/3rcgrk5d_Photo%20Adamou%20Amadou%20SAMBARE.JPG"
                alt="Adamou Amadou SAMBARE - Directeur Général"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent"></div>
            </div>
            
            {/* Badge flottant */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-900">30+</p>
                <p className="text-sm text-slate-600 font-medium">Années d'expérience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

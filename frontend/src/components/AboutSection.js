import React from "react";
import { GraduationCap, Globe, Award, Building } from "lucide-react";

const AboutSection = () => {
  const achievements = [
    "Mise en place de systèmes RTGS (Real Time Gross Settlement)",
    "Déploiement de datacenters haute disponibilité",
    "Création de bureaux d'information sur le crédit",
    "Solutions de paiement mobile innovantes",
    "Projets de transformation digitale bancaire",
    "Systèmes de télécommunications d'envergure"
  ];

  const experiences = [
    { organization: "BCEAO", role: "Projets bancaires et financiers" },
    { organization: "Orange", role: "Télécommunications et services" },
    { organization: "CreditInfo West Africa", role: "Systèmes d'information crédit" },
    { organization: "Banque Mondiale", role: "Projets de développement technologique" }
  ];

  return (
    <section id="parcours" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Parcours & Références
          </h2>
          <div className="w-24 h-1 bg-blue-900 rounded mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Une expertise forgée par plus de 30 ans d'expérience internationale
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Profile du DG */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center space-x-6 mb-8">
              <img
                src="https://customer-assets.emergentagent.com/job_consulting-experts/artifacts/3rcgrk5d_Photo%20Adamou%20Amadou%20SAMBARE.JPG"
                alt="Adamou Amadou SAMBARE"
                className="w-24 h-24 rounded-full object-cover border-4 border-blue-900"
              />
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Adamou Amadou SAMBARE</h3>
                <p className="text-blue-900 font-semibold text-lg">Directeur Général</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <GraduationCap className="text-blue-900 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Formation</h4>
                  <p className="text-slate-600">Ingénieur diplômé des Mines de Paris et des Mines d'Alès</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Globe className="text-blue-900 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Langues</h4>
                  <p className="text-slate-600">Français, Anglais, Haoussa</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <Award className="text-blue-900 mt-1" size={24} />
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Expertise</h4>
                  <p className="text-slate-600">
                    30+ années dans les télécommunications, la finance, la banque, 
                    la gestion de projets IT et la transformation digitale
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expériences principales */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
              <Building className="text-blue-900 mr-3" size={28} />
              Expériences Clés
            </h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-4 border-blue-900 pl-6">
                  <h4 className="font-bold text-slate-900 text-lg">{exp.organization}</h4>
                  <p className="text-slate-600">{exp.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Projets notables */}
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Projets & Réalisations Notables
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-lg p-6 border-l-4 border-blue-900 hover:shadow-md transition-shadow duration-300"
              >
                <p className="text-slate-700 font-medium">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">30+</div>
            <div className="text-slate-600">Années d'expérience</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">100+</div>
            <div className="text-slate-600">Projets réalisés</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">15+</div>
            <div className="text-slate-600">Pays d'intervention</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-900 mb-2">50+</div>
            <div className="text-slate-600">Clients satisfaits</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
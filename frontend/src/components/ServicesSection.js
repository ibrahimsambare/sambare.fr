import React from "react";
import { 
  Settings, 
  Target, 
  Shield, 
  Users, 
  Code, 
  TrendingUp 
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Target,
      title: "Conseil stratégique et gouvernance IT",
      description: "Accompagnement dans la définition et la mise en œuvre de stratégies technologiques alignées sur vos objectifs business."
    },
    {
      icon: Settings,
      title: "Gestion de projets complexes",
      description: "Pilotage de projets technologiques d'envergure dans les télécommunications, la finance et les systèmes de paiement."
    },
    {
      icon: Shield,
      title: "Audit et optimisation des SI",
      description: "Analyse approfondie de vos systèmes d'information et recommandations d'amélioration pour une performance optimale."
    },
    {
      icon: Users,
      title: "Assistance technique et formation",
      description: "Support technique spécialisé et programmes de formation adaptés à vos équipes et technologies."
    },
    {
      icon: Code,
      title: "Développement et intégration",
      description: "Conception et intégration de solutions technologiques sur mesure adaptées à vos besoins spécifiques."
    },
    {
      icon: TrendingUp,
      title: "Transformation digitale",
      description: "Accompagnement complet dans votre processus de digitalisation pour une modernisation réussie."
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Nos Services
          </h2>
          <div className="w-24 h-1 bg-blue-900 rounded mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Une expertise reconnue au service de vos projets technologiques et stratégiques
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="group bg-white border border-slate-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-900 group-hover:scale-110 transition-all duration-300">
                  <IconComponent 
                    size={32} 
                    className="text-blue-900 group-hover:text-white transition-colors duration-300" 
                  />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-900 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
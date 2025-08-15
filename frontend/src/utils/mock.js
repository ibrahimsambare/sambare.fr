// Mock data et fonctions pour simuler les appels API

export const mockContactSubmission = async (formData) => {
  // Simulation d'un délai de réseau
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("📧 MESSAGE ENVOYÉ (MOCK):", formData);
      console.log("✅ Les données seront envoyées par email lors de l'intégration backend");
      resolve({
        success: true,
        message: "Message envoyé avec succès",
        data: formData
      });
    }, 2000);
  });
};

// Mock data pour les statistiques
export const mockStats = {
  experience: "30+",
  projets: "100+",
  pays: "15+",
  clients: "50+"
};

// Mock data pour les témoignages (optionnel)
export const mockTestimonials = [
  {
    id: 1,
    nom: "Dr. Mamadou Diallo",
    poste: "Directeur IT, Banque Centrale",
    message: "Memphis Ingénierie & Technologies a transformé notre infrastructure IT avec professionnalisme et expertise.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  },
  {
    id: 2,
    nom: "Aicha Kone",
    poste: "CEO, FinTech Solutions",
    message: "Un accompagnement stratégique remarquable qui nous a permis d'accélérer notre transformation digitale.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  }
];
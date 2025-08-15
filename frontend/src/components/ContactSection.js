import React, { useState } from "react";
import { MapPin, Phone, Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitResult({
          type: 'success',
          message: result.message
        });
        setFormData({
          nom: "",
          email: "",
          sujet: "",
          message: ""
        });
      } else {
        setSubmitResult({
          type: 'error',
          message: result.detail || result.message || "Une erreur s'est produite lors de l'envoi."
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      setSubmitResult({
        type: 'error',
        message: "Erreur de connexion. Veuillez vérifier votre connexion internet et réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitResult(null);
    setFormData({
      nom: "",
      email: "",
      sujet: "",
      message: ""
    });
  };

  // Affichage du message de succès
  if (submitResult?.type === 'success') {
    return (
      <section id="contact" className="py-20 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl p-12 shadow-lg">
            <CheckCircle className="mx-auto text-green-600 mb-6" size={64} />
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Message envoyé avec succès !</h3>
            <p className="text-lg text-slate-600 mb-4">
              {submitResult.message}
            </p>
            <p className="text-slate-500 mb-8">
              Vous recevrez également un email de confirmation à l'adresse fournie.
            </p>
            <button
              onClick={resetForm}
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
            >
              Envoyer un autre message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Nous Contacter
          </h2>
          <div className="w-24 h-1 bg-blue-900 rounded mx-auto mb-6"></div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Prêt à démarrer votre projet ? Contactez-nous pour discuter de vos besoins
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Informations de contact */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Informations de Contact</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-blue-900 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Adresse</h4>
                    <p className="text-slate-600">
                      Niamey, Niger<br />
                      Quartier Plateau<br />
                      BP 1234 Niamey
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="text-blue-900 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Téléphone</h4>
                    <p className="text-slate-600">
                      +227 XX XX XX XX<br />
                      +227 XX XX XX XX
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Mail className="text-blue-900 mt-1" size={24} />
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                    <p className="text-slate-600">
                      contact@sambare.fr<br />
                      direction@sambare.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-slate-900 mb-4">Horaires d'ouverture</h3>
              <div className="space-y-2 text-slate-600">
                <p>Lundi - Vendredi: 8h00 - 18h00</p>
                <p>Samedi: 9h00 - 13h00</p>
                <p>Dimanche: Fermé</p>
              </div>
            </div>
          </div>

          {/* Formulaire de contact */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-slate-900 mb-8">Envoyez-nous un message</h3>
              
              {/* Affichage des erreurs */}
              {submitResult?.type === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start space-x-3">
                  <AlertCircle className="text-red-500 mt-0.5" size={20} />
                  <div>
                    <p className="text-red-800 font-medium">Erreur lors de l'envoi</p>
                    <p className="text-red-600 text-sm mt-1">{submitResult.message}</p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-bold text-slate-900 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="Votre nom complet"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                      placeholder="votre.email@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-bold text-slate-900 mb-2">
                    Sujet *
                  </label>
                  <input
                    type="text"
                    id="sujet"
                    name="sujet"
                    value={formData.sujet}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors duration-200 disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Sujet de votre demande"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={isSubmitting}
                    rows={6}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 transition-colors duration-200 resize-none disabled:bg-slate-100 disabled:cursor-not-allowed"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Envoyer le message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
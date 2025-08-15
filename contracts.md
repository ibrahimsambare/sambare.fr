# Contracts API - Memphis Ingénierie & Technologies

## Vue d'ensemble
Ce fichier décrit les contrats API entre le frontend et le backend pour le site web de Memphis Ingénierie & Technologies, ainsi que les données mockées qui doivent être remplacées par de vraies intégrations.

## Données mockées actuelles à remplacer

### Frontend Mock Data (`/app/frontend/src/utils/mock.js`)
- `mockContactSubmission()` : Fonction qui simule l'envoi d'email de contact
- Les données de formulaire sont actuellement affichées dans la console
- Animation de loading de 2 secondes simulée

## API Endpoints à implémenter

### 1. POST /api/contact
**Objectif** : Recevoir et traiter les soumissions du formulaire de contact

**Request Body:**
```json
{
  "nom": "string (required)",
  "email": "string (required, valid email)",
  "sujet": "string (required)",
  "message": "string (required)"
}
```

**Response Success (200):**
```json
{
  "success": true,
  "message": "Message envoyé avec succès",
  "id": "string (unique contact submission ID)"
}
```

**Response Error (400/500):**
```json
{
  "success": false,
  "error": "string (error description)"
}
```

## Intégrations requises

### Service Email
- **Objectif** : Envoyer les messages du formulaire de contact par email
- **Destinataire** : contact@memphis-it.com (et/ou direction@memphis-it.com)
- **Template email** : Format professionnel avec les informations du formulaire
- **Confirmation** : Email de confirmation automatique à l'expéditeur

## Modifications Frontend nécessaires

### Dans ContactSection.js
1. Remplacer `mockContactSubmission(formData)` par un appel API réel
2. Utiliser `REACT_APP_BACKEND_URL` pour l'endpoint `/api/contact`
3. Gérer les erreurs de réseau et les réponses d'erreur du serveur
4. Maintenir l'UX actuelle (loading, success state, reset form)

### Exemple d'intégration
```javascript
// Remplacer dans ContactSection.js
const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'envoi');
    }

    const result = await response.json();
    setIsSubmitted(true);
    setFormData({ nom: "", email: "", sujet: "", message: "" });
  } catch (error) {
    console.error("Erreur lors de l'envoi:", error);
    // Gérer l'erreur visuellement
  } finally {
    setIsSubmitting(false);
  }
};
```

## Base de données

### Table: contact_messages
- id (string, primary key, UUID)
- nom (string, required)
- email (string, required)
- sujet (string, required)  
- message (text, required)
- created_at (datetime, auto)
- status (enum: 'new', 'read', 'replied')

## Configuration Email
- Utiliser un service professionnel (SendGrid, Mailgun, etc.)
- Template HTML professionnel pour les emails
- Configuration SMTP sécurisée
- Variables d'environnement pour les credentials

## Tests à effectuer après intégration
1. Soumission du formulaire avec données valides
2. Validation des champs requis
3. Envoi effectif des emails
4. Sauvegarde en base de données
5. Gestion des erreurs réseau
6. Responsive design du formulaire
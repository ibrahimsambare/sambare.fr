from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, To
import os
from typing import Optional
import logging
from datetime import datetime

logger = logging.getLogger(__name__)

class EmailDeliveryError(Exception):
    pass

class EmailService:
    def __init__(self):
        api_key = os.environ.get('SENDGRID_API_KEY')
        self.sender_email = os.environ.get('SENDER_EMAIL', 'contact@sambare.fr')
        
        logger.info(f"Configuration EmailService - Sender: {self.sender_email}")
        logger.info(f"Configuration EmailService - API Key present: {bool(api_key)}")
        logger.info(f"Configuration EmailService - API Key prefix: {api_key[:10] if api_key else 'None'}")
        
        self.sendgrid_client = SendGridAPIClient(api_key)
    
    def send_contact_form_email(self, nom: str, email: str, sujet: str, message: str) -> bool:
        """
        Envoie un email de formulaire de contact à l'équipe Memphis IT
        
        Args:
            nom: Nom du contact
            email: Email du contact  
            sujet: Sujet du message
            message: Message du contact
            
        Returns:
            bool: True si envoyé avec succès
        """
        try:
            logger.info(f"Tentative d'envoi email de {email} avec sender {self.sender_email}")
            
            # Email simple à l'équipe Memphis IT
            admin_subject = f"[Contact Website] {sujet}"
            
            admin_html_content = f"""
            <html>
                <body style="font-family: Arial, sans-serif;">
                    <h2>Nouveau message de contact</h2>
                    <p><strong>Nom:</strong> {nom}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Sujet:</strong> {sujet}</p>
                    <p><strong>Message:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #007bff;">
                        <p>{message}</p>
                    </div>
                </body>
            </html>
            """

            # Créer le message pour l'admin - Test avec une seule adresse d'abord
            admin_mail = Mail(
                from_email=self.sender_email,
                to_emails='contact@sambare.fr',  # Une seule adresse pour débugger
                subject=admin_subject,
                html_content=admin_html_content
            )

            # Ajouter l'email de réponse
            admin_mail.reply_to = email

            # Envoyer l'email admin
            response = self.sendgrid_client.send(admin_mail)
            
            logger.info(f"Email admin envoyé. Status: {response.status_code}")
            
            if response.status_code == 202:
                # Envoyer email de confirmation au client
                self._send_confirmation_email(nom, email, sujet)
                logger.info("Email de confirmation envoyé")
                return True
            else:
                logger.error(f"Échec envoi email admin. Status: {response.status_code}")
                return False

        except Exception as e:
            logger.error(f"Erreur lors de l'envoi de l'email de contact: {str(e)}")
            raise EmailDeliveryError(f"Échec de l'envoi de l'email: {str(e)}")
    
    def _send_confirmation_email(self, nom: str, email: str, sujet: str) -> None:
        """Envoie un email de confirmation au client"""
        try:
            confirmation_subject = "Confirmation de réception - Memphis Ingénierie & Technologies"
            
            confirmation_html = f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <div style="background: linear-gradient(135deg, #1e3a8a, #3b82f6); padding: 30px; border-radius: 10px; margin-bottom: 30px;">
                            <h1 style="color: white; margin: 0; text-align: center;">
                                Memphis Ingénierie & Technologies
                            </h1>
                            <p style="color: #e2e8f0; margin: 10px 0 0 0; text-align: center;">
                                Nous avons bien reçu votre message
                            </p>
                        </div>
                        
                        <div style="padding: 0 20px;">
                            <h2 style="color: #1e3a8a;">Bonjour {nom},</h2>
                            
                            <p>Nous vous remercions de nous avoir contactés concernant "<strong>{sujet}</strong>".</p>
                            
                            <p>Votre message a été transmis à notre équipe et nous vous répondrons dans les plus brefs délais, généralement sous 24 heures ouvrables.</p>
                            
                            <div style="background: #f8fafc; padding: 20px; border-radius: 10px; margin: 25px 0;">
                                <h3 style="color: #1e3a8a; margin-top: 0;">Nos coordonnées</h3>
                                <p style="margin: 5px 0;"><strong>Email:</strong> contact@sambare.fr</p>
                                <p style="margin: 5px 0;"><strong>Téléphone:</strong> +227 XX XX XX XX</p>
                                <p style="margin: 5px 0;"><strong>Adresse:</strong> Niamey, Niger</p>
                            </div>
                            
                            <p>En attendant, n'hésitez pas à consulter notre site web pour en savoir plus sur nos services de conseil stratégique, gestion de projets technologiques et ingénierie des systèmes d'information.</p>
                            
                            <p>Cordialement,<br>
                            <strong>L'équipe Memphis Ingénierie & Technologies</strong></p>
                        </div>
                        
                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
                            <p style="color: #64748b; font-size: 12px; margin: 0;">
                                Memphis Ingénierie & Technologies - Niamey, Niger<br>
                                Des solutions sur mesure pour vos projets stratégiques et technologiques
                            </p>
                        </div>
                    </div>
                </body>
            </html>
            """

            confirmation_mail = Mail(
                from_email=self.sender_email,
                to_emails=email,
                subject=confirmation_subject,
                html_content=confirmation_html
            )

            self.sendgrid_client.send(confirmation_mail)
            logger.info(f"Email de confirmation envoyé à {email}")
            
        except Exception as e:
            logger.warning(f"Échec de l'envoi de l'email de confirmation: {str(e)}")
            # On ne lève pas d'exception car l'email principal a été envoyé

# Instance globale du service email
email_service = EmailService()
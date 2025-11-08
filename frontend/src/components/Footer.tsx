import { Link } from "react-router-dom";
import { BookOpen, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-gold to-accent rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold">{t('AppName')}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {t('AppDescription')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('QuickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/parts" className="hover:text-primary transition-colors">{t('Articles')}</Link></li>
              <li><Link to="/scenarios" className="hover:text-primary transition-colors">{t('Scenarios')}</Link></li>
              <li><Link to="/progress" className="hover:text-primary transition-colors">{t('Progress')}</Link></li>
            </ul>
          </div>

          {/* Learning Categories */}
          <div>
            <h3 className="font-semibold mb-4">{t('LearningTopics')}</h3>
            <ul className="space-y-2 text-sm">
              <li>{t('FundamentalRights')}</li>
              <li>{t('FundamentalDuties')}</li>
              <li>{t('GovernmentStructure')}</li>
              <li>{t('ConstitutionalAmendments')}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">{t('ConnectWithUs')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@nagariksamvidhan.gov.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>1800-123-4567 (Toll Free)</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-8 border-muted" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted">
          <p>&copy; 2025 {t('Constitution Explorer')}. {t('AllRightsReserved')}</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="hover:text-primary transition-colors">{t('PrivacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{t('TermsOfService')}</Link>
            <Link to="/accessibility" className="hover:text-primary transition-colors">{t('Accessibility')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
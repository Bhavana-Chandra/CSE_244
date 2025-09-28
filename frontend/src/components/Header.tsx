import { Link } from "react-router-dom";
import { Search, User, BookOpen, Gamepad2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };
  
  return (
    <header className="bg-card border-b shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-gold to-accent rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('common.appName')}</h1>
              <p className="text-xs text-muted-foreground">{t('common.appDescription')}</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              {t('navigation.home')}
            </Link>
            <Link to="/articles" className="nav-link">
              {t('navigation.articles')}
            </Link>
            <Link to="/scenarios" className="nav-link">
              {t('navigation.scenarios')}
            </Link>
            <Link to="/quick-links" className="nav-link text-yellow-600 font-semibold hover:text-yellow-700">
              {t('navigation.quickLinks') || "Quick Links"}
            </Link>
            <Link to="/games" className="nav-link flex items-center space-x-2 text-purple-600 font-semibold hover:text-purple-700">
              <Gamepad2 className="h-4 w-4" />
              <span>{t('navigation.gamesHub')}</span>
            </Link>
            <Link to="/ai-assistant" className="nav-link">
              {t('navigation.aiAssistant')}
            </Link>
            <Link to="/progress" className="nav-link">
              {t('navigation.progress')}
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:block">
              <LanguageSelector />
            </div>

            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4" />
            </Button>

            {/* Login/Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground hidden md:block">
                  Hello, {user.full_name || user.email.split('@')[0]}
                </span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {t('navigation.login')}
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
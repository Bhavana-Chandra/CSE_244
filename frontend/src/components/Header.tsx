import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Menu, 
  X, 
  Home, 
  BookOpen, 
  Lightbulb, 
  Gamepad2, 
  Trophy, 
  User, 
  LogOut,
  Globe,
  ChevronDown,
  UserCircle,
  Settings,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");

  const navigationItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Parts", href: "/parts", icon: BookOpen },
    { name: "Scenarios", href: "/scenarios", icon: Lightbulb },
    { name: "Quick Links", href: "/quick-links", icon: Globe },
    { name: "Games Hub", href: "/games", icon: Gamepad2 },
    { name: "Progress", href: "/progress", icon: Trophy },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/");
  };

  const handleLanguageChange = (newLang: string) => {
    setLanguage(newLang);
    // Here you would typically implement language switching logic
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  // Inject Google Translate script and initialize widget inside Header
  useEffect(() => {
    // Define global init callback
    (window as any).googleTranslateElementInit = () => {
      try {
        const googleObj = (window as any).google;
        if (googleObj && googleObj.translate) {
          new googleObj.translate.TranslateElement(
            { pageLanguage: "en" },
            "google_translate_element"
          );
        }
      } catch (e) {
        // fail silently to avoid breaking header
      }
    };

    // Inject script only once
    const existing = document.getElementById("google-translate-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    } else {
      // If script is already present, try to initialize immediately
      if ((window as any).google && (window as any).google.translate) {
        (window as any).googleTranslateElementInit();
      }
    }
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-orange-200" 
        : "bg-white/80 backdrop-blur-sm"
    }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-saffron to-orange-500 p-2 rounded-lg"
            >
              <BookOpen className="h-6 w-6 text-black" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-muted-foreground ">
                Constitution Explorer
              </h1>
              <p className="text-xs text-muted-foreground">Learn • Explore • Understand</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <motion.div key={item.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to={item.href}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-orange-50 transition-all duration-200"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              </motion.div>
            ))}

            {/* Google Translate dropdown aligned to the right of Progress */}
            <div id="google_translate_element" className="ml-2 flex items-center" />
          </div>

        
           

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-saffron to-orange-500 rounded-full flex items-center justify-center">
                          <UserCircle className="h-5 w-5 text-white" />
                        </div>
                        <span className="hidden sm:block text-sm font-medium">{user.email?.split('@')[0]}</span>
                      </div>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center space-x-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-saffron to-orange-500 rounded-full flex items-center justify-center">
                          <UserCircle className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{user.email}</h3>
                          <p className="text-sm text-muted-foreground">Constitution Explorer</p>
                        </div>
                      </div>
                      
                      <nav className="flex-1 space-y-2">
                        <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                          <UserCircle className="h-5 w-5" />
                          <span>Profile</span>
                        </Link>
                        <Link to="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                          <Settings className="h-5 w-5" />
                          <span>Settings</span>
                        </Link>
                        <Link to="/progress" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors">
                          <BarChart3 className="h-5 w-5" />
                          <span>My Progress</span>
                        </Link>
                      </nav>
                      
                      <Button onClick={handleLogout} variant="outline" className="w-full">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gradient-to-r from-saffron to-orange-500 hover:from-saffron/90 hover:to-orange-500/90">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm">
                    {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="bg-gradient-to-r from-saffron to-orange-500 p-2 rounded-lg">
                        <BookOpen className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-orange-600">Constitution Explorer</h2>
                        <p className="text-sm text-muted-foreground">Learn • Explore • Understand</p>
                      </div>
                    </div>
                    
                    <nav className="flex-1 space-y-2">
                      {navigationItems.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={handleNavClick}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-orange-50 transition-colors"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.name}</span>
                        </Link>
                      ))}
                    </nav>
                    
                    {user && (
                      <div className="border-t pt-4">
                        <Button onClick={handleLogout} variant="outline" className="w-full">
                          <LogOut className="h-4 w-4 mr-2" />
                          Sign Out
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        
      </nav>
    </header>
  );
};

export default Header;
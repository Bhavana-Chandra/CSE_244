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
    // Helper function to check if Google Translate API is ready
    const isGoogleTranslateReady = (): boolean => {
      try {
        const googleObj = (window as any).google;
        return !!(
          googleObj &&
          googleObj.translate &&
          googleObj.translate.TranslateElement &&
          typeof googleObj.translate.TranslateElement === 'function'
        );
      } catch {
        return false;
      }
    };

    // Helper function to initialize translate element
    const initTranslateElement = (elementId: string): boolean => {
      try {
        if (!isGoogleTranslateReady()) {
          return false;
        }

        const element = document.getElementById(elementId);
        if (!element) {
          return false;
        }

        // Check if already initialized
        if (element.hasChildNodes()) {
          return true;
        }

        // Clear any existing content first
        element.innerHTML = '';
        
        const googleObj = (window as any).google;
        new googleObj.translate.TranslateElement(
          { 
            pageLanguage: "en",
            layout: googleObj.translate.TranslateElement.InlineLayout.SIMPLE
          },
          elementId
        );
        return true;
      } catch (e) {
        console.error(`Error initializing translate element ${elementId}:`, e);
        return false;
      }
    };

    // Define global init callback
    (window as any).googleTranslateElementInit = () => {
      // Wait a bit to ensure everything is ready
      setTimeout(() => {
        if (isGoogleTranslateReady()) {
          // Initialize for desktop
          initTranslateElement("google_translate_element");
          
          // Initialize for mobile header
          initTranslateElement("google_translate_element_mobile_header");
          
          // Try to initialize mobile menu if it's open
          if (isOpen) {
            setTimeout(() => {
              initTranslateElement("google_translate_element_mobile");
            }, 200);
          }
        }
      }, 100);
    };

    // Inject script only once
    const existing = document.getElementById("google-translate-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.type = "text/javascript";
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // If script is already present, try to initialize immediately
      if (isGoogleTranslateReady()) {
        (window as any).googleTranslateElementInit();
      } else {
        // Wait for script to load
        const checkInterval = setInterval(() => {
          if (isGoogleTranslateReady()) {
            clearInterval(checkInterval);
            (window as any).googleTranslateElementInit();
          }
        }, 100);
        
        // Clear interval after 10 seconds
        setTimeout(() => clearInterval(checkInterval), 10000);
      }
    }
  }, []);

  // Separate effect to handle mobile menu opening
  useEffect(() => {
    if (!isOpen) return;

    // Helper function to check if Google Translate API is ready
    const isGoogleTranslateReady = (): boolean => {
      try {
        const googleObj = (window as any).google;
        return !!(
          googleObj &&
          googleObj.translate &&
          googleObj.translate.TranslateElement &&
          typeof googleObj.translate.TranslateElement === 'function'
        );
      } catch {
        return false;
      }
    };

    // Function to try initializing the mobile translate element
    const initMobileTranslate = (): boolean => {
      if (!isGoogleTranslateReady()) {
        return false;
      }

      const mobileElement = document.getElementById("google_translate_element_mobile");
      if (!mobileElement) {
        return false;
      }

      // Check if already initialized
      if (mobileElement.hasChildNodes()) {
        return true;
      }

      try {
        // Clear element first
        mobileElement.innerHTML = '';
        
        const googleObj = (window as any).google;
        new googleObj.translate.TranslateElement(
          { 
            pageLanguage: "en",
            layout: googleObj.translate.TranslateElement.InlineLayout.SIMPLE
          },
          "google_translate_element_mobile"
        );
        return true;
      } catch (e) {
        console.error("Error initializing mobile translate:", e);
        return false;
      }
    };

    // Try multiple times with increasing delays to account for Sheet animation
    const attempts = [200, 400, 600, 1000, 1500];
    const timers: NodeJS.Timeout[] = [];

    attempts.forEach((delay) => {
      const timer = setTimeout(() => {
        if (initMobileTranslate()) {
          // Success, clear remaining timers
          timers.forEach(t => {
            if (t !== timer) clearTimeout(t);
          });
        }
      }, delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [isOpen]);

  return (
    <>
      {/* Styles for Google Translate widget */}
      <style>{`
        /* Google Translate widget styling */
        #google_translate_element,
        #google_translate_element_mobile {
          display: inline-block;
        }
        
        /* Hide Google branding on mobile for cleaner look */
        #google_translate_element_mobile .goog-te-banner-frame,
        #google_translate_element .goog-te-banner-frame {
          display: none !important;
        }
        
        /* Style the select dropdown */
        #google_translate_element_mobile .goog-te-gadget,
        #google_translate_element .goog-te-gadget {
          font-family: inherit;
          font-size: 14px;
        }
        
        #google_translate_element_mobile .goog-te-gadget-simple,
        #google_translate_element .goog-te-gadget-simple {
          background-color: transparent;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.5rem;
          font-size: 14px;
          color: #374151;
        }
        
        #google_translate_element_mobile .goog-te-gadget-simple .goog-te-menu-value span,
        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span {
          color: #374151;
        }
        
        /* Mobile specific styling */
        @media (max-width: 768px) {
          #google_translate_element_mobile,
          #google_translate_element_mobile_header {
            width: 100%;
          }
          
          #google_translate_element_mobile .goog-te-gadget-simple,
          #google_translate_element_mobile_header .goog-te-gadget-simple {
            width: 100%;
            max-width: 100%;
            font-size: 12px;
            padding: 0.375rem;
          }
          
          #google_translate_element_mobile_header {
            max-width: 120px;
          }
        }
      `}</style>
      
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

            {/* Mobile Menu Button and Translate */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Google Translate for Mobile Header */}
              <div 
                id="google_translate_element_mobile_header" 
                className="flex items-center"
                ref={(el) => {
                  // Initialize when element is mounted and script is loaded
                  if (el) {
                    const tryInit = () => {
                      try {
                        const googleObj = (window as any).google;
                        if (
                          googleObj &&
                          googleObj.translate &&
                          googleObj.translate.TranslateElement &&
                          typeof googleObj.translate.TranslateElement === 'function' &&
                          !el.hasChildNodes()
                        ) {
                          el.innerHTML = '';
                          new googleObj.translate.TranslateElement(
                            { 
                              pageLanguage: "en",
                              layout: googleObj.translate.TranslateElement.InlineLayout.SIMPLE
                            },
                            "google_translate_element_mobile_header"
                          );
                        } else if (!googleObj?.translate?.TranslateElement) {
                          // Script not loaded yet, try again
                          setTimeout(tryInit, 200);
                        }
                      } catch (e) {
                        console.error("Ref callback mobile header translate init error:", e);
                      }
                    };
                    setTimeout(tryInit, 100);
                  }
                }}
              />
              
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
                      
                      {/* Google Translate for Mobile */}
                      <div className="border-t pt-4 mt-4">
                        <div className="flex items-center space-x-3 p-3 rounded-lg">
                          <Globe className="h-5 w-5 text-gray-600" />
                          <span className="text-sm font-medium text-gray-700">Select Language</span>
                        </div>
                        <div className="px-3 pb-2">
                          <div 
                            id="google_translate_element_mobile" 
                            className="w-full"
                            ref={(el) => {
                              // Initialize when element is mounted and menu is open
                              if (el && isOpen) {
                                const tryInit = () => {
                                  try {
                                    const googleObj = (window as any).google;
                                    if (
                                      googleObj &&
                                      googleObj.translate &&
                                      googleObj.translate.TranslateElement &&
                                      typeof googleObj.translate.TranslateElement === 'function' &&
                                      !el.hasChildNodes()
                                    ) {
                                      el.innerHTML = '';
                                      new googleObj.translate.TranslateElement(
                                        { 
                                          pageLanguage: "en",
                                          layout: googleObj.translate.TranslateElement.InlineLayout.SIMPLE
                                        },
                                        "google_translate_element_mobile"
                                      );
                                    } else if (!googleObj?.translate?.TranslateElement) {
                                      // Script not loaded yet, try again
                                      setTimeout(tryInit, 200);
                                    }
                                  } catch (e) {
                                    console.error("Ref callback translate init error:", e);
                                  }
                                };
                                // Wait for Sheet animation to complete
                                setTimeout(tryInit, 400);
                              }
                            }}
                          />
                        </div>
                        <p className="text-xs text-muted-foreground px-3 pb-2">Powered by Google Translate</p>
                      </div>
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
    </>
  );
};

export default Header;
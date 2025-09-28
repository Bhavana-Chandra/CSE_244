import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Define translations directly instead of importing JSON files
const resources = {
  en: {
    translation: {
      common: {
        appName: "Citizens and Constitution",
        appDescription: "Constitutional Learning Platform",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        allRightsReserved: "All rights reserved"
      },
      navigation: {
        home: "Home",
        articles: "Articles",
        scenarios: "Scenarios",
        gamesHub: "Games Hub",
        aiAssistant: "AI Assistant",
        progress: "Progress",
        login: "Login",
        quickLinks: "Quick Links",
        learningTopics: "Learning Topics",
        fundamentalRights: "Fundamental Rights",
        fundamentalDuties: "Fundamental Duties",
        governmentStructure: "Government Structure",
        constitutionalAmendments: "Constitutional Amendments",
        connectWithUs: "Connect With Us",
        privacyPolicy: "Privacy Policy",
        termsOfService: "Terms of Service",
        accessibility: "Accessibility"
      },
      languages: {
        english: "English",
        hindi: "हिंदी",
        kannada: "ಕನ್ನಡ",
        tamil: "தமிழ்",
        telugu: "తెలుగు"
      },
      buttons: {
        search: "Search",
        submit: "Submit",
        cancel: "Cancel",
        save: "Save",
        delete: "Delete",
        edit: "Edit",
        view: "View",
        read: "Read",
        play: "Play",
        start: "Start",
        continue: "Continue",
        back: "Back",
        next: "Next"
      },
      articles: {
        readTime: "{{time}} min read",
        difficulty: {
          easy: "Easy",
          medium: "Medium",
          hard: "Hard"
        }
      },
      features: {
        sectionTitle: "Why Choose Our Platform?",
        sectionDescription: "Experience the most comprehensive and engaging way to learn about the Indian Constitution",
        interactiveLearning: {
          title: "Interactive Learning",
          description: "Learn through real-world scenarios, examples, and simplified explanations of constitutional articles."
        },
        aiAssistant: {
          title: "AI Assistant",
          description: "Get instant help for any constitutional question from our intelligent AI assistant."
        },
        multilingualSupport: {
          title: "Multilingual Support",
          description: "Available in 12+ Indian languages, ensuring everyone can learn in their preferred language."
        },
        progressTracking: {
          title: "Progress Tracking",
          description: "Monitor your learning journey with detailed analytics and personalized recommendations."
        },
        communityLearning: {
          title: "Community Learning",
          description: "Learn alongside thousands of citizens and share your constitutional knowledge."
        },
        gamifiedExperience: {
          title: "Gamified Experience",
          description: "Earn achievements, complete challenges, and compete on leaderboards while learning."
        },
        quickReferences: {
          title: "Quick References",
          description: "Access key constitutional concepts, rights, and duties with quick search and filters."
        },
        authenticContent: {
          title: "Authentic Content",
          description: "All content is verified by constitutional experts and updated with the latest amendments."
        },
        gamesHub: {
          title: "🎮 Games Hub",
          description: "Explore our collection of interactive constitutional games! From memory match to treasure hunt, learn while having fun and earn rewards.",
          exploreButton: "Explore Games →"
        }
      }
    }
  },
  hi: {
    translation: {
      common: {
        appName: "नागरिक और संविधान",
        appDescription: "संवैधानिक शिक्षा मंच",
        loading: "लोड हो रहा है...",
        error: "त्रुटि",
        success: "सफलता",
        allRightsReserved: "सर्वाधिकार सुरक्षित"
      },
      navigation: {
        home: "होम",
        articles: "लेख",
        scenarios: "परिदृश्य",
        gamesHub: "गेम्स हब",
        aiAssistant: "एआई सहायक",
        progress: "प्रगति",
        login: "लॉगिन",
        quickLinks: "त्वरित लिंक",
        learningTopics: "शिक्षण विषय",
        fundamentalRights: "मौलिक अधिकार",
        fundamentalDuties: "मौलिक कर्तव्य",
        governmentStructure: "सरकारी संरचना",
        constitutionalAmendments: "संवैधानिक संशोधन",
        connectWithUs: "हमसे जुड़ें",
        privacyPolicy: "गोपनीयता नीति",
        termsOfService: "सेवा की शर्तें",
        accessibility: "पहुंच"
      },
      languages: {
        english: "English",
        hindi: "हिंदी",
        kannada: "ಕನ್ನಡ",
        tamil: "தமிழ்",
        telugu: "తెలుగు"
      },
      buttons: {
        search: "खोजें",
        submit: "जमा करें",
        cancel: "रद्द करें",
        save: "सहेजें",
        delete: "हटाएं",
        edit: "संपादित करें",
        view: "देखें",
        read: "पढ़ें",
        play: "खेलें",
        start: "शुरू करें",
        continue: "जारी रखें",
        back: "वापस",
        next: "अगला"
      },
      articles: {
        readTime: "{{time}} मिनट पढ़ने का समय",
        difficulty: {
          easy: "आसान",
          medium: "मध्यम",
          hard: "कठिन"
        }
      },
      features: {
        sectionTitle: "हमारा प्लेटफॉर्म क्यों चुनें?",
        sectionDescription: "भारतीय संविधान के बारे में जानने का सबसे व्यापक और आकर्षक तरीका अनुभव करें",
        interactiveLearning: {
          title: "इंटरैक्टिव लर्निंग",
          description: "वास्तविक परिदृश्यों, उदाहरणों और संवैधानिक अनुच्छेदों के सरलीकृत स्पष्टीकरण के माध्यम से सीखें।"
        },
        aiAssistant: {
          title: "एआई सहायक",
          description: "हमारे बुद्धिमान एआई सहायक से किसी भी संवैधानिक प्रश्न के लिए तत्काल सहायता प्राप्त करें।"
        },
        multilingualSupport: {
          title: "बहुभाषी समर्थन",
          description: "12+ भारतीय भाषाओं में उपलब्ध, यह सुनिश्चित करने के लिए कि हर कोई अपनी पसंदीदा भाषा में सीख सके।"
        },
        progressTracking: {
          title: "प्रगति ट्रैकिंग",
          description: "विस्तृत विश्लेषण और व्यक्तिगत सिफारिशों के साथ अपनी सीखने की यात्रा की निगरानी करें।"
        },
        communityLearning: {
          title: "सामुदायिक शिक्षा",
          description: "हजारों नागरिकों के साथ मिलकर सीखें और अपने संवैधानिक ज्ञान को साझा करें।"
        },
        gamifiedExperience: {
          title: "गेमिफाइड अनुभव",
          description: "सीखते समय उपलब्धियां अर्जित करें, चुनौतियां पूरी करें और लीडरबोर्ड पर प्रतिस्पर्धा करें।"
        },
        quickReferences: {
          title: "त्वरित संदर्भ",
          description: "त्वरित खोज और फ़िल्टर के साथ प्रमुख संवैधानिक अवधारणाओं, अधिकारों और कर्तव्यों तक पहुंचें।"
        },
        authenticContent: {
          title: "प्रामाणिक सामग्री",
          description: "सभी सामग्री संवैधानिक विशेषज्ञों द्वारा सत्यापित है और नवीनतम संशोधनों के साथ अपडेट की गई है।"
        },
        gamesHub: {
          title: "🎮 गेम्स हब",
          description: "इंटरैक्टिव संवैधानिक गेम्स के हमारे संग्रह का अन्वेषण करें! मेमोरी मैच से ट्रेजर हंट तक, मज़े करते हुए सीखें और पुरस्कार अर्जित करें।",
          exploreButton: "गेम्स एक्सप्लोर करें →"
        }
      }
    }
  },
  kn: {
    translation: {
      common: {
        appName: "ನಾಗರಿಕ ಮತ್ತು ಸಂವಿಧಾನ",
        appDescription: "ಸಂವಿಧಾನಾತ್ಮಕ ಕಲಿಕೆ ವೇದಿಕೆ",
        loading: "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
        error: "ದೋಷ",
        success: "ಯಶಸ್ಸು",
        allRightsReserved: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ"
      },
      navigation: {
        home: "ಮುಖಪುಟ",
        articles: "ಲೇಖನಗಳು",
        scenarios: "ಸನ್ನಿವೇಶಗಳು",
        gamesHub: "ಆಟಗಳ ಕೇಂದ್ರ",
        aiAssistant: "ಎಐ ಸಹಾಯಕ",
        progress: "ಪ್ರಗತಿ",
        login: "ಲಾಗಿನ್",
        quickLinks: "ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು",
        learningTopics: "ಕಲಿಕೆ ವಿಷಯಗಳು",
        fundamentalRights: "ಮೂಲಭೂತ ಹಕ್ಕುಗಳು",
        fundamentalDuties: "ಮೂಲಭೂತ ಕರ್ತವ್ಯಗಳು",
        governmentStructure: "ಸರ್ಕಾರದ ರಚನೆ",
        constitutionalAmendments: "ಸಂವಿಧಾನಾತ್ಮಕ ತಿದ್ದುಪಡಿಗಳು",
        connectWithUs: "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕಿಸಿ",
        privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
        termsOfService: "ಸೇವಾ ನಿಯಮಗಳು",
        accessibility: "ಪ್ರವೇಶಿಸುವಿಕೆ"
      },
      languages: {
        english: "English",
        hindi: "हिंदी",
        kannada: "ಕನ್ನಡ",
        tamil: "தமிழ்",
        telugu: "తెలుగు"
      },
      buttons: {
        search: "ಹುಡುಕಿ",
        submit: "ಸಲ್ಲಿಸಿ",
        cancel: "ರದ್ದುಮಾಡಿ",
        save: "ಉಳಿಸಿ",
        delete: "ಅಳಿಸಿ",
        edit: "ಸಂಪಾದಿಸಿ",
        view: "ವೀಕ್ಷಿಸಿ",
        read: "ಓದಿ",
        play: "ಆಡಿ",
        start: "ಪ್ರಾರಂಭಿಸಿ",
        continue: "ಮುಂದುವರಿಸಿ",
        back: "ಹಿಂದೆ",
        next: "ಮುಂದೆ"
      },
      articles: {
        readTime: "{{time}} ನಿಮಿಷ ಓದುವ ಸಮಯ",
        difficulty: {
          easy: "ಸುಲಭ",
          medium: "ಮಧ್ಯಮ",
          hard: "ಕಠಿಣ"
        }
      },
      features: {
        sectionTitle: "ನಮ್ಮ ವೇದಿಕೆಯನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
        sectionDescription: "ಭಾರತೀಯ ಸಂವಿಧಾನದ ಬಗ್ಗೆ ತಿಳಿದುಕೊಳ್ಳಲು ಅತ್ಯಂತ ಸಮಗ್ರ ಮತ್ತು ಆಕರ್ಷಕ ಮಾರ್ಗವನ್ನು ಅನುಭವಿಸಿ",
        interactiveLearning: {
          title: "ಸಂವಾದಾತ್ಮಕ ಕಲಿಕೆ",
          description: "ವಾಸ್ತವಿಕ ಸನ್ನಿವೇಶಗಳು, ಉದಾಹರಣೆಗಳು ಮತ್ತು ಸಂವಿಧಾನಾತ್ಮಕ ವಿಧಿಗಳ ಸರಳೀಕೃತ ವಿವರಣೆಗಳ ಮೂಲಕ ಕಲಿಯಿರಿ."
        },
        aiAssistant: {
          title: "ಎಐ ಸಹಾಯಕ",
          description: "ನಮ್ಮ ಬುದ್ಧಿವಂತ ಎಐ ಸಹಾಯಕದಿಂದ ಯಾವುದೇ ಸಂವಿಧಾನಾತ್ಮಕ ಪ್ರಶ್ನೆಗಳಿಗೆ ತಕ್ಷಣದ ಸಹಾಯವನ್ನು ಪಡೆಯಿರಿ."
        },
        multilingualSupport: {
          title: "ಬಹುಭಾಷಾ ಬೆಂಬಲ",
          description: "12+ ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲಿ ಲಭ್ಯವಿದೆ, ಪ್ರತಿಯೊಬ್ಬರೂ ತಮ್ಮ ಆದ್ಯತೆಯ ಭಾಷೆಯಲ್ಲಿ ಕಲಿಯಲು ಸಾಧ್ಯವಾಗುವಂತೆ."
        },
        progressTracking: {
          title: "ಪ್ರಗತಿ ಟ್ರ್ಯಾಕಿಂಗ್",
          description: "ವಿವರವಾದ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು ವೈಯಕ್ತಿಕ ಶಿಫಾರಸುಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಕಲಿಕಾ ಪ್ರಯಾಣವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ."
        },
        communityLearning: {
          title: "ಸಮುದಾಯ ಕಲಿಕೆ",
          description: "ಸಾವಿರಾರು ನಾಗರಿಕರೊಂದಿಗೆ ಕಲಿಯಿರಿ ಮತ್ತು ನಿಮ್ಮ ಸಂವಿಧಾನಾತ್ಮಕ ಜ್ಞಾನವನ್ನು ಹಂಚಿಕೊಳ್ಳಿ."
        },
        gamifiedExperience: {
          title: "ಗೇಮಿಫೈಡ್ ಅನುಭವ",
          description: "ಕಲಿಯುವಾಗ ಸಾಧನೆಗಳನ್ನು ಗಳಿಸಿ, ಸವಾಲುಗಳನ್ನು ಪೂರ್ಣಗೊಳಿಸಿ ಮತ್ತು ಲೀಡರ್‌ಬೋರ್ಡ್‌ನಲ್ಲಿ ಸ್ಪರ್ಧಿಸಿ."
        },
        quickReferences: {
          title: "ತ್ವರಿತ ಉಲ್ಲೇಖಗಳು",
          description: "ತ್ವರಿತ ಹುಡುಕಾಟ ಮತ್ತು ಫಿಲ್ಟರ್‌ಗಳೊಂದಿಗೆ ಪ್ರಮುಖ ಸಂವಿಧಾನಾತ್ಮಕ ಪರಿಕಲ್ಪನೆಗಳು, ಹಕ್ಕುಗಳು ಮತ್ತು ಕರ್ತವ್ಯಗಳನ್ನು ಪ್ರವೇಶಿಸಿ."
        },
        authenticContent: {
          title: "ಪ್ರಾಮಾಣಿಕ ವಿಷಯ",
          description: "ಎಲ್ಲಾ ವಿಷಯವನ್ನು ಸಂವಿಧಾನಾತ್ಮಕ ತಜ್ಞರು ಪರಿಶೀಲಿಸಿದ್ದಾರೆ ಮತ್ತು ಇತ್ತೀಚಿನ ತಿದ್ದುಪಡಿಗಳೊಂದಿಗೆ ನವೀಕರಿಸಲಾಗಿದೆ."
        },
        gamesHub: {
          title: "🎮 ಆಟಗಳ ಕೇಂದ್ರ",
          description: "ನಮ್ಮ ಸಂವಾದಾತ್ಮಕ ಸಂವಿಧಾನಾತ್ಮಕ ಆಟಗಳ ಸಂಗ್ರಹವನ್ನು ಅನ್ವೇಷಿಸಿ! ಮೆಮೊರಿ ಮ್ಯಾಚ್‌ನಿಂದ ಟ್ರೆಷರ್ ಹಂಟ್‌ವರೆಗೆ, ಮಜಾ ಮಾಡುತ್ತಾ ಕಲಿಯಿರಿ ಮತ್ತು ಬಹುಮಾನಗಳನ್ನು ಗಳಿಸಿ.",
          exploreButton: "ಆಟಗಳನ್ನು ಅನ್ವೇಷಿಸಿ →"
        }
      }
    }
  }
};

// Configure i18next
i18n
  .use(LanguageDetector) // Detects user language
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: 'en', // Default language
    debug: true, // Set to true for development

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    }
  });

export default i18n;
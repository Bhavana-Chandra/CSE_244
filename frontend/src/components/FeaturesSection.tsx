import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Brain, Globe, BarChart3, Users, Award, Zap, Shield, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const getFeatures = (t) => [
  {
    icon: BookOpen,
    title: t('InteractiveLearning'),
    description: t('Engage with dynamic lessons, quizzes, and activities that make understanding the Constitution simple and enjoyable.'),
    color: "text-primary"
  },
  {
    icon: Brain,
    title: t('AI Assistant'),
    description: t('Get instant help from an AI-powered assistant available in multiple Indian languages for easy comprehension.'),
    color: "text-secondary"
  },
  {
    icon: Globe,
    title: t('MultilingualSupport'),
    description: t('Learn in your preferred language with complete support for multiple Indian and global languages.'),
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: t('ProgressTracking'),
    description: t('Monitor your learning journey with real-time progress reports and personalized insights.'),
    color: "text-gold"
  },
  {
    icon: Users,
    title: t('CommunityLearning'),
    description: t('Collaborate, discuss, and share knowledge with fellow learners in an interactive community space.'),
    color: "text-info"
  },
  {
    icon: Award,
    title: t('GamifiedExperience'),
    description: t('Stay motivated through quizzes, rewards, and achievements that turn learning into a fun challenge.'),
    color: "text-warning"
  },
  {
    icon: Zap,
    title: t('QuickReferences'),
    description: t('Access quick reference materials for key sections of the Constitution, making learning efficient and convenient.'),
    color: "text-primary"
  },
  {
    icon: Shield,
    title: t('AuthenticContent'),
    description: t('Learn from verified, reliable, and up-to-date information sourced from official constitutional documents.'),
    color: "text-accent"
  }
];

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = getFeatures(t);
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {t('Explore every Feature of the Constitution')}
          </h2>
          
        </div>

        {/* Games Hub Promo Card */}
        <div className="mb-12">
          <Card className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-6 mb-6 md:mb-0">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{t('GamesHubTitle')}</h3>
                    <p className="text-purple-100 max-w-md">
                      {t('GamesHubDescription')}
                    </p>
                  </div>
                </div>
                <Link to="/games">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                    {t('ExploreButton')}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="constitutional-card group hover:border-primary/20 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-current/10 flex items-center justify-center ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
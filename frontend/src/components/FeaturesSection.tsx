import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { BookOpen, Brain, Globe, BarChart3, Users, Award, Zap, Shield, Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  {
    icon: BookOpen,
    title: "Interactive Learning",
    description: "Learn through real scenarios, examples, and simplified explanations of constitutional articles.",
    color: "text-primary"
  },
  {
    icon: Brain,
    title: "AI Assistant",
    description: "Get instant help with any constitutional query from our intelligent AI assistant.",
    color: "text-secondary"
  },
  {
    icon: Globe,
    title: "Multilingual Support",
    description: "Available in 12+ Indian languages to ensure everyone can learn in their preferred language.",
    color: "text-accent"
  },
  {
    icon: BarChart3,
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics and personalized recommendations.",
    color: "text-gold"
  },
  {
    icon: Users,
    title: "Community Learning",
    description: "Join thousands of citizens learning together and share your constitutional knowledge.",
    color: "text-info"
  },
  {
    icon: Award,
    title: "Gamified Experience",
    description: "Earn achievements, complete challenges, and compete on leaderboards while learning.",
    color: "text-warning"
  },
  {
    icon: Zap,
    title: "Quick References",
    description: "Access key constitutional concepts, rights, and duties with instant search and filters.",
    color: "text-primary"
  },
  {
    icon: Shield,
    title: "Authentic Content",
    description: "All content is verified by constitutional experts and updated with latest amendments.",
    color: "text-accent"
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the most comprehensive and engaging way to learn about the Indian Constitution
          </p>
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
                    <h3 className="text-2xl font-bold mb-2">🎮 Games Hub</h3>
                    <p className="text-purple-100 max-w-md">
                      Explore our collection of interactive constitutional games! From Memory Match to Treasure Hunt, 
                      learn while having fun and earn rewards.
                    </p>
                  </div>
                </div>
                <Link to="/games">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                    Explore Games →
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
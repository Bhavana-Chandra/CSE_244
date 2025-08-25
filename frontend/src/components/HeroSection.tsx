import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ArrowRight, BookOpen, Users, Globe, TrendingUp } from "lucide-react";
import parliamentImage from "../assets/parliament-building.jpg";

const HeroSection = () => {
  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Learn Constitution{" "}
                <span className="text-primary">Simply</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
                Master your rights and duties through interactive learning. 
                Understand the Indian Constitution in multiple languages with AI-powered assistance.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/articles">
                <Button size="lg" className="btn-saffron w-full sm:w-auto">
                  Start Learning
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/articles">
                <Button variant="outline" size="lg" className="btn-outline-saffron w-full sm:w-auto">
                  Explore Articles
                </Button>
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <Card className="p-4 text-center bg-card/80 backdrop-blur">
                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full mx-auto mb-2">
                  <Users className="w-4 h-4 text-primary" />
                </div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Citizens</div>
              </Card>
              <Card className="p-4 text-center bg-card/80 backdrop-blur">
                <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full mx-auto mb-2">
                  <BookOpen className="w-4 h-4 text-accent" />
                </div>
                <div className="text-2xl font-bold text-foreground">450+</div>
                <div className="text-sm text-muted-foreground">Articles</div>
              </Card>
              <Card className="p-4 text-center bg-card/80 backdrop-blur">
                <div className="flex items-center justify-center w-8 h-8 bg-gold/10 rounded-full mx-auto mb-2">
                  <Globe className="w-4 h-4 text-gold" />
                </div>
                <div className="text-2xl font-bold text-foreground">12</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </Card>
            </div>
          </div>

          {/* Right Content - Parliament Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <img 
                src={parliamentImage} 
                alt="Indian Parliament Building - Symbol of Constitutional Democracy"
                className="w-full h-[500px] object-cover"
              />
              
              {/* Floating Achievement Badge */}
              <div className="absolute top-6 right-6 bg-gold text-gold-foreground px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                <TrendingUp className="w-4 h-4 inline mr-2" />
                95% Success Rate
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
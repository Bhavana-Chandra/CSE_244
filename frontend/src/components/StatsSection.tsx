import { Card, CardContent } from "./ui/card";
import { TrendingUp, Users, BookOpen, Award } from "lucide-react";

const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-secondary to-ashoka relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-10"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">
            Empowering Constitutional Literacy Across India
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Join the movement to create an informed citizenry through constitutional education
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Card className="stats-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">10,000+</div>
              <div className="text-blue-100 text-sm">Citizens Educated</div>
            </CardContent>
          </Card>

          <Card className="stats-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">450+</div>
              <div className="text-blue-100 text-sm">Articles Simplified</div>
            </CardContent>
          </Card>

          <Card className="stats-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">95%</div>
              <div className="text-blue-100 text-sm">Success Rate</div>
            </CardContent>
          </Card>

          <Card className="stats-card border-white/20">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">12+</div>
              <div className="text-blue-100 text-sm">Languages Supported</div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <p className="text-blue-100 text-lg font-medium">
            "Building a nation of informed citizens, one article at a time"
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
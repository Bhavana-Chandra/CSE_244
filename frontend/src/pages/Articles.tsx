import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, BookOpen, Scale, Star, Building, Gavel } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { loadCSVData, ConstitutionPart } from "@/utils/csvParser";

const categories = [
  { id: "rights", name: "Fundamental Rights", count: 24, icon: Scale, color: "bg-primary" },
  { id: "duties", name: "Fundamental Duties", count: 1, icon: Star, color: "bg-accent" },
  { id: "government", name: "Government Structure", count: 8, icon: Building, color: "bg-secondary" },
  { id: "judiciary", name: "Judiciary", count: 2, icon: Gavel, color: "bg-gold" },
  { id: "amendments", name: "Amendments", count: 1, icon: BookOpen, color: "bg-info" },
];

const categoryMapping: { [key: string]: string[] } = {
  rights: ["Part III"],
  duties: ["Part IV A"],
  government: ["Part V", "Part VI", "Part VIII", "Part IX", "Part IX A", "Part IX B", "Part X", "Part XI", "Part XII", "Part XIII"],
  judiciary: ["Part V", "Part VI"],
  amendments: ["Part XX"],
};

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [parts, setParts] = useState<ConstitutionPart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { parts } = await loadCSVData();
        setParts(parts);
      } catch (error) {
        console.error('Error loading constitution data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getPartPreview = (subject: string) => {
    return subject.substring(0, 80) + (subject.length > 80 ? "..." : "");
  };

  const filteredParts = parts.filter(part => {
    const searchLower = searchTerm.toLowerCase();
    const categoryParts = selectedCategory ? categoryMapping[selectedCategory] : null;

    const matchesCategory = !categoryParts || categoryParts.includes(part.name);
    const matchesSearch = 
      !searchLower ||
      part.name.toLowerCase().includes(searchLower) ||
      part.subject.toLowerCase().includes(searchLower) ||
      part.articleRange.toLowerCase().includes(searchLower);

    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Loading constitution data...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Constitution of India: Parts Overview</h1>
          <p className="text-xl text-muted-foreground">
            Browse through the foundational parts of the Indian Constitution.
          </p>
        </div>

        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search parts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card className="constitutional-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-5 h-5 mr-2" />
                  Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categories.map(category => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(selectedCategory === category.id ? "" : category.id)}
                      className={`w-full text-left p-3 rounded-lg transition-all hover:bg-muted ${
                        selectedCategory === category.id ? 'bg-primary/10 border-primary border' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{category.name}</div>
                            <div className="text-xs text-muted-foreground">{category.count} parts</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </aside>

          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredParts.map((part, index) => (
                <motion.div
                  key={part.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="constitutional-card h-full flex flex-col group">
                    <CardHeader>
                      <Badge variant="outline" className="font-mono mb-2 w-fit">{part.name}</Badge>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors">
                        {part.subject}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {getPartPreview(part.subject)}
                      </p>
                      <div className="mt-3 text-xs text-muted-foreground">
                        {part.articleRange}
                      </div>
                    </CardContent>
                    <div className="p-6 pt-0">
                      <Link to={`/parts/${part.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button className="w-full btn-saffron">
                          View Articles →
                        </Button>
                      </Link>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            {filteredParts.length === 0 && (
              <div className="text-center py-12 col-span-full">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No parts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter settings.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Articles;

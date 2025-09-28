import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, Star, BookOpen, Scale, Users, Building, Gavel } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const categories = [
  { id: "rights", name: "Fundamental Rights", count: 45, icon: Scale, color: "bg-primary" },
  { id: "duties", name: "Fundamental Duties", count: 11, icon: Star, color: "bg-accent" },
  { id: "government", name: "Government Structure", count: 78, icon: Building, color: "bg-secondary" },
  { id: "judiciary", name: "Judiciary", count: 23, icon: Gavel, color: "bg-gold" },
  { id: "amendments", name: "Amendments", count: 104, icon: BookOpen, color: "bg-info" },
];

const articles = [
  {
    id: 1,
    number: "Article 19",
    title: "Freedom of Speech and Expression",
    description: "Learn about your fundamental right to express opinions and share ideas freely within legal boundaries.",
    difficulty: "Easy",
    readTime: "8 min",
    category: "rights",
    isBookmarked: false,
    completed: false
  },
  {
    id: 2,
    number: "Article 21",
    title: "Right to Life and Personal Liberty",
    description: "Understand the most important fundamental right that protects your life and personal freedom.",
    difficulty: "Medium",
    readTime: "12 min",
    category: "rights",
    isBookmarked: true,
    completed: true
  },
  {
    id: 52,
    number: "Articles 52-62",
    title: "The President",
    description: "These articles deal with the President as head of state, election process, qualifications, term of office, impeachment, and powers.",
    difficulty: "Medium",
    readTime: "15 min",
    category: "government",
    isBookmarked: false,
    completed: false
  },
  {
    id: 63,
    number: "Articles 63-73",
    title: "Vice-President and Council of Ministers",
    description: "These cover the Vice-President's election, role as Rajya Sabha Chairman, and provisions for the Prime Minister and Council of Ministers.",
    difficulty: "Medium",
    readTime: "12 min",
    category: "government",
    isBookmarked: false,
    completed: false
  },
  {
    id: 74,
    number: "Articles 74-78",
    title: "Executive Powers and Responsibilities",
    description: "These articles define the executive power of the Union, distribution of business, and collective responsibility of ministers.",
    difficulty: "Hard",
    readTime: "10 min",
    category: "government",
    isBookmarked: false,
    completed: false
  },
  {
    id: 124,
    number: "Article 124",
    title: "Establishment and Constitution of Supreme Court",
    description: "This establishes the Supreme Court as the apex court with one Chief Justice and initially seven other judges (now 33).",
    difficulty: "Medium",
    readTime: "10 min",
    category: "judiciary",
    isBookmarked: false,
    completed: false
  },
  {
    id: 125,
    number: "Article 125",
    title: "Salaries and Conditions of Judges",
    description: "This ensures independence of judiciary by providing that judges' salaries cannot be reduced during their term.",
    difficulty: "Easy",
    readTime: "8 min",
    category: "judiciary",
    isBookmarked: false,
    completed: false
  },
  {
    id: 126,
    number: "Article 126",
    title: "Acting Chief Justice",
    description: "This provides for appointment of acting Chief Justice when the position is vacant to ensure continuity in judicial administration.",
    difficulty: "Easy",
    readTime: "5 min",
    category: "judiciary",
    isBookmarked: false,
    completed: false
  },
  {
    id: 1001,
    number: "1st Amendment",
    title: "Political and Administrative Reforms (1951)",
    description: "Added Articles 31A and 31B, created Ninth Schedule to protect land reform laws from judicial review.",
    difficulty: "Hard",
    readTime: "15 min",
    category: "amendments",
    isBookmarked: false,
    completed: false
  },
  {
    id: 1007,
    number: "7th Amendment",
    title: "State Reorganization (1956)",
    description: "Reorganized states and territories based on linguistic lines, a major restructuring of India's internal boundaries.",
    difficulty: "Medium",
    readTime: "12 min",
    category: "amendments",
    isBookmarked: false,
    completed: false
  },
  {
    id: 3,
    number: "Article 32",
    title: "Right to Constitutional Remedies",
    description: "Discover how you can approach courts when your fundamental rights are violated.",
    difficulty: "Hard",
    readTime: "15 min",
    category: "rights",
    isBookmarked: false,
    completed: false
  },
  {
    id: 4,
    number: "Article 14",
    title: "Equality Before Law",
    description: "Learn how the Constitution ensures equal treatment for all citizens under the law.",
    difficulty: "Easy",
    readTime: "10 min",
    category: "rights",
    isBookmarked: false,
    completed: true
  },
  {
    id: 5,
    number: "Article 51A",
    title: "Fundamental Duties",
    description: "Understand your duties as a citizen towards the nation and fellow citizens.",
    difficulty: "Medium",
    readTime: "14 min",
    category: "duties",
    isBookmarked: true,
    completed: false
  },
  {
    id: 6,
    number: "Article 356",
    title: "President's Rule",
    description: "Learn about emergency provisions and when the central government can take control of states.",
    difficulty: "Hard",
    readTime: "18 min",
    category: "government",
    isBookmarked: false,
    completed: false
  }
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const filteredArticles = articles.filter(article => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (selectedCategory === "" || article.category === selectedCategory) &&
    (selectedDifficulty === "" || article.difficulty === selectedDifficulty);
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-success text-white";
      case "Medium": return "bg-warning text-white";
      case "Hard": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Constitutional Articles</h1>
          <p className="text-xl text-muted-foreground">
            Explore and learn about the Indian Constitution's articles in simple, easy-to-understand language.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search constitutional topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="constitutional-card">
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
                            <div className="text-xs text-muted-foreground">{category.count} articles</div>
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Articles Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="constitutional-card group">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-primary" />
                        </div>
                        {article.isBookmarked && <Star className="w-4 h-4 text-gold fill-current" />}
                      </div>
                      {article.completed && (
                        <Badge className="bg-success text-white">Completed</Badge>
                      )}
                    </div>
                    <div>
                      <Badge variant="outline" className="text-xs font-mono">
                        {article.number}
                      </Badge>
                      <CardTitle className="text-lg mt-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </CardTitle>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <Badge className={getDifficultyColor(article.difficulty)}>
                          {article.difficulty}
                        </Badge>
                        <span className="flex items-center text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                    
                    <Link to={`/articles/${article.id}`}>
                      <Button className="w-full btn-saffron">
                        Start Reading →
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
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
import { Link } from "react-router-dom";
import { Search, User, Globe, BookOpen, Brain, TrendingUp } from "lucide-react";
import { Button } from "./ui/button";

const Header = () => {
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
              <h1 className="text-xl font-bold text-foreground">नागरिक और संविधान</h1>
              <p className="text-xs text-muted-foreground">Constitutional Learning Platform</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/articles" className="nav-link">
              Articles
            </Link>
            <Link to="/scenarios" className="nav-link">
              Scenarios
            </Link>
            <Link to="/ai-assistant" className="nav-link">
              AI Assistant
            </Link>
            <Link to="/progress" className="nav-link">
              Progress
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-muted rounded-lg">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <select className="bg-transparent text-sm font-medium focus:outline-none">
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>
            </div>

            {/* Search Button */}
            <Button variant="ghost" size="sm" className="hidden md:flex">
              <Search className="w-4 h-4" />
            </Button>

            {/* Login/Profile */}
            <Link to="/login">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, Bookmark, Share2, Download, Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ConstitutionArticle {
  number: string;
  title: string;
  text: string;
}

const ArticleDetail = () => {
  const { number } = useParams<{ number: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<ConstitutionArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [simplifiedLanguage, setSimplifiedLanguage] = useState(false);
  const [notes, setNotes] = useState("");
  const [bookmarked, setBookmarked] = useState(false);
  const [allArticles, setAllArticles] = useState<ConstitutionArticle[]>([]);

  useEffect(() => {
    const loadArticleData = async () => {
      try {
        // Load all articles from CSV
        const response = await fetch('/Constitution Of India.csv');
        const text = await response.text();
        const lines = text.split('\n').slice(1); // Skip header
        
        const articles: ConstitutionArticle[] = [];
        for (const line of lines) {
          const parts = line.split(',');
          if (parts.length >= 3) {
            articles.push({
              number: parts[0].trim(),
              title: parts[1].trim(),
              text: parts[2].trim()
            });
          }
        }
        
        setAllArticles(articles);
        
        // Find current article
        const currentArticle = articles.find(a => a.number === number);
        setArticle(currentArticle || null);
        
        // Load saved notes and bookmarks
        const savedNotes = localStorage.getItem(`article-notes-${number}`);
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked-articles') || '[]');
        
        if (savedNotes) setNotes(savedNotes);
        if (savedBookmarks.includes(number)) setBookmarked(true);
        
      } catch (error) {
        console.error('Error loading article data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadArticleData();
  }, [number]);

  const handlePrevious = () => {
    if (!article || !allArticles.length) return;
    const currentIndex = allArticles.findIndex(a => a.number === article.number);
    if (currentIndex > 0) {
      navigate(`/articles/${allArticles[currentIndex - 1].number}`);
    }
  };

  const handleNext = () => {
    if (!article || !allArticles.length) return;
    const currentIndex = allArticles.findIndex(a => a.number === article.number);
    if (currentIndex < allArticles.length - 1) {
      navigate(`/articles/${allArticles[currentIndex + 1].number}`);
    }
  };

  const handleBookmark = () => {
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarked-articles') || '[]');
    let newBookmarks;
    
    if (bookmarked) {
      newBookmarks = savedBookmarks.filter((id: string) => id !== number);
    } else {
      newBookmarks = [...savedBookmarks, number];
    }
    
    localStorage.setItem('bookmarked-articles', JSON.stringify(newBookmarks));
    setBookmarked(!bookmarked);
  };

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes);
    localStorage.setItem(`article-notes-${number}`, newNotes);
  };

  const handleShare = () => {
    if (navigator.share && article) {
      navigator.share({
        title: `Article ${article.number} - ${article.title}`,
        text: `Check out Article ${article.number} of the Indian Constitution`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    if (!article) return;
    
    const content = `Article ${article.number} - ${article.title}\n\n${article.text}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `article-${article.number}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getProgress = () => {
    if (!article || !allArticles.length) return 0;
    const currentIndex = allArticles.findIndex(a => a.number === article.number);
    return ((currentIndex + 1) / allArticles.length) * 100;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Loading article...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Article not found</h3>
            <p className="text-muted-foreground">The requested article could not be found.</p>
            <Link to="/articles">
              <Button variant="outline" className="mt-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/articles">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePrevious} disabled={!allArticles.length || allArticles[0].number === article.number}>
                ← Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                {allArticles.findIndex(a => a.number === article.number) + 1} / {allArticles.length}
              </span>
              <Button variant="outline" size="sm" onClick={handleNext} disabled={!allArticles.length || allArticles[allArticles.length - 1].number === article.number}>
                Next →
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full bg-secondary rounded-full h-2">
              <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${getProgress()}%` }} />
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-8">
            <Badge variant="outline" className="font-mono mb-4">Article {article.number}</Badge>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="outline" size="sm" onClick={() => setSimplifiedLanguage(!simplifiedLanguage)}>
                <Eye className="w-4 h-4 mr-2" />
                {simplifiedLanguage ? 'Original' : 'Simplified'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                <Bookmark className={`w-4 h-4 mr-2 ${bookmarked ? 'fill-current' : ''}`} />
                {bookmarked ? 'Bookmarked' : 'Bookmark'}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>

          <Card className="constitutional-card mb-8">
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none">
                <p className="text-foreground leading-relaxed text-justify">
                  {simplifiedLanguage ? 
                    article.text.replace(/shall/g, 'will').replace(/may/g, 'can').replace(/hereto/g, 'here to') : 
                    article.text
                  }
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="constitutional-card">
            <CardHeader>
              <CardTitle>Your Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add your notes about this article..."
                className="w-full min-h-[120px] p-3 border rounded-md bg-background text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
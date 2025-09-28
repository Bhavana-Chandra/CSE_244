import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

// Sample article data structure
interface Article {
  id: number;
  number: string;
  title: string;
  standard: string;
  simplified: string;
  relatedArticles: RelatedArticle[];
}

interface RelatedArticle {
  id: number;
  title: string;
}

// Sample articles data
const articlesData: Record<string, Article> = {
  "1": {
    id: 1,
    number: "Article 19",
    title: "Freedom of Speech and Expression",
    standard: "Article 19 of the Indian Constitution guarantees to all citizens the right to freedom of speech and expression, which includes the right to express one's own convictions and opinions freely by words of mouth, writing, printing, pictures or any other mode. It includes the freedom of communication and the right to propagate or publish one's views. The freedom of speech and expression also includes the right to remain silent.",
    simplified: "Article 19 gives you the right to express your thoughts and opinions freely through speaking, writing, or any other way. You can share your ideas with others, publish your views, and even choose to stay silent if you want.",
    relatedArticles: [
      { id: 21, title: "Right to Life and Personal Liberty" },
      { id: 14, title: "Equality Before Law" }
    ]
  },
  "2": {
    id: 2,
    number: "Article 21",
    title: "Right to Life and Personal Liberty",
    standard: "Article 21 of the Constitution of India states that 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' This fundamental right is available to every person, citizens and foreigners alike. The Supreme Court has interpreted this article to include various rights such as the right to live with human dignity, right to livelihood, right to health, right to pollution-free air, etc.",
    simplified: "Article 21 protects your life and personal freedom. The government cannot take these away from you unless they follow proper legal procedures. This right includes living with dignity, having a job, access to healthcare, and clean air.",
    relatedArticles: [
      { id: 19, title: "Freedom of Speech and Expression" },
      { id: 14, title: "Equality Before Law" }
    ]
  },
  "14": {
    id: 14,
    number: "Article 14",
    title: "Equality Before Law",
    standard: "Article 14 of the Indian Constitution guarantees equality before law and equal protection of laws to all persons within the territory of India. It embodies the general principle of equality and prohibits unreasonable discrimination between persons. The concept of 'equality before law' is a declaration of equality of all persons within the territory of India, implying thereby the absence of any special privilege in favor of any individual. Every person, whatever be his rank or position is subject to the jurisdiction of the ordinary courts.",
    simplified: "Article 14 means everyone should be treated equally by the law, regardless of their background. No one gets special treatment in court, and the government can't discriminate against people without a good reason.",
    relatedArticles: [
      { id: 19, title: "Freedom of Speech and Expression" },
      { id: 21, title: "Right to Life and Personal Liberty" }
    ]
  }
};

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isSimplified, setIsSimplified] = useState<boolean>(false);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>("");
  const { toast } = useToast();
  
  const article = articlesData[id || "14"]; // Default to Article 14 if no ID is provided
  
  // Load saved notes from localStorage on component mount
  useEffect(() => {
    if (id) {
      const savedNotes = localStorage.getItem(`article-notes-${id}`);
      if (savedNotes) {
        setNotes(savedNotes);
      }
      
      const bookmarkStatus = localStorage.getItem(`article-bookmark-${id}`);
      setIsBookmarked(bookmarkStatus === "true");
    }
  }, [id]);
  
  // Save notes to localStorage
  const saveNotes = () => {
    if (id) {
      localStorage.setItem(`article-notes-${id}`, notes);
      toast({
        title: "Successfully saved",
        description: "Your notes have been saved locally",
      });
    }
  };
  
  // Toggle bookmark status
  const toggleBookmark = () => {
    const newStatus = !isBookmarked;
    setIsBookmarked(newStatus);
    if (id) {
      localStorage.setItem(`article-bookmark-${id}`, String(newStatus));
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen bg-yellow-300">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Article not found</h1>
            <Link to="/articles" className="text-primary hover:underline">
              Return to Articles
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-300">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm">
          <Link to="/articles" className="hover:underline">Articles</Link>
          {" / "}
          <span>{article.number} {article.title}</span>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Article Header */}
              <div className="mb-6">
                <div className="text-sm text-muted-foreground mb-1">{article.number}</div>
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="simplified"
                      checked={isSimplified}
                      onCheckedChange={() => setIsSimplified(!isSimplified)}
                    />
                    <label htmlFor="simplified" className="text-sm cursor-pointer">Simplified</label>
                  </div>
                  
                  <Button 
                    onClick={toggleBookmark}
                    variant={isBookmarked ? "default" : "outline"}
                    className={isBookmarked ? "bg-orange-500 hover:bg-orange-600" : ""}
                  >
                    {isBookmarked ? "Bookmarked" : "Bookmark"}
                  </Button>
                </div>
              </div>
              
              {/* Article Content */}
              <div className="prose max-w-none">
                <p className="leading-relaxed">
                  {isSimplified ? article.simplified : article.standard}
                </p>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Notes Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Notes</h2>
              <Textarea 
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="min-h-[150px] mb-4"
              />
              <Button onClick={saveNotes} className="w-full bg-orange-500 hover:bg-orange-600">
                Save locally
              </Button>
            </div>
            
            {/* Related Articles Panel */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Related articles</h2>
              <ul className="space-y-3">
                {article.relatedArticles.map((related) => (
                  <li key={related.id}>
                    <Link 
                      to={`/articles/${related.id}`}
                      className="flex items-center text-primary hover:underline"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      <span>Article {related.id} {related.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
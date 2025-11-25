import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, FileText, Lightbulb, Star, PenTool, Download, Share2, Scale, Book, GraduationCap, Bookmark } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loadCSVData, ConstitutionPart, ConstitutionArticle } from "@/utils/csvParser";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

// Study material data for each part based on actual constitutional content
const studyMaterials: { [key: string]: any } = {
  "part-i": {
    overview: "Part I of the Indian Constitution deals with the Union and its Territory. It establishes India as a Union of States and defines the territorial boundaries of the nation. This part lays the foundation for the geographical and political structure of the Indian Union.",
    keyPoints: [
      "India is a Union of States, not a federation",
      "Parliament has the power to admit new states",
      "Parliament can alter state boundaries, names, and areas",
      "Territory includes states, union territories, and acquired territories",
      "Laws made under Articles 2 and 3 are not constitutional amendments"
    ],
    importance: "This part establishes the territorial integrity and flexibility of the Indian Union, allowing for the reorganization of states while maintaining national unity.",
    caseLaws: [
      "Berubari Union case (1960)",
      "Babulal Parate v. State of Bombay (1960)"
    ],
    articleRange: "Articles 1-4"
  },
  "part-ii": {
    overview: "Part II defines the citizenship provisions of the Indian Constitution. It determines who are citizens of India at the commencement of the Constitution and provides the basis for citizenship laws.",
    keyPoints: [
      "Citizenship at commencement based on domicile and birth",
      "Special provisions for migrants from Pakistan",
      "Rights of persons of Indian origin residing abroad",
      "Prohibition on holding foreign titles",
      "Parliament's power to regulate citizenship"
    ],
    importance: "This part establishes the criteria for Indian citizenship and forms the basis for the Citizenship Act, 1955.",
    caseLaws: [
      "State Trading Corporation v. Commercial Tax Officer (1963)",
      "R.C. Cooper v. Union of India (1970)"
    ],
    articleRange: "Articles 5-11"
  },
  "part-iii": {
    overview: "Fundamental Rights are the basic human rights enshrined in the Constitution of India which are guaranteed to all citizens. They are applied without discrimination on the basis of race, religion, gender, etc. These rights are enforceable by the courts, subject to certain restrictions.",
    keyPoints: [
      "Right to Equality (Articles 14-18)",
      "Right to Freedom (Articles 19-22)",
      "Right against Exploitation (Articles 23-24)",
      "Right to Freedom of Religion (Articles 25-28)",
      "Cultural and Educational Rights (Articles 29-30)",
      "Right to Constitutional Remedies (Article 32)"
    ],
    importance: "Fundamental Rights are the cornerstone of Indian democracy and ensure basic human dignity and freedom to all citizens.",
    caseLaws: [
      "Kesavananda Bharati v. State of Kerala (1973)",
      "Maneka Gandhi v. Union of India (1978)",
      "Minerva Mills v. Union of India (1980)"
    ],
    articleRange: "Articles 12-35"
  },
  "part-iv": {
    overview: "Directive Principles of State Policy are guidelines for the framing of laws by the government. These provisions, set out in Part IV of the Constitution, are not enforceable by the courts, but are fundamental in the governance of the country.",
    keyPoints: [
      "Social and Economic Welfare Principles",
      "Gandhian Principles",
      "Liberal-Intellectual Principles",
      "Implementation through legislation",
      "Complementary to Fundamental Rights"
    ],
    importance: "These principles serve as a guide for the government to establish a just society and welfare state.",
    caseLaws: [
      "Champakam Dorairajan v. State of Madras (1951)",
      "Golaknath v. State of Punjab (1967)",
      "Kesavananda Bharati v. State of Kerala (1973)"
    ],
    articleRange: "Articles 36-51"
  },
  "part-iva": {
    overview: "Part IVA was added by the 42nd Amendment Act, 1976, and contains the Fundamental Duties of citizens. These duties serve as a reminder to citizens that while enjoying rights, they also have obligations towards the nation.",
    keyPoints: [
      "Added by 42nd Amendment Act, 1976",
      "Originally 10 duties, expanded to 11 by 86th Amendment",
      "Non-justiciable in nature",
      "Includes duties towards nation, constitution, and society",
      "Promotes harmony and spirit of common brotherhood"
    ],
    importance: "Fundamental Duties remind citizens of their responsibilities towards the nation and promote civic consciousness.",
    caseLaws: [
      "M.C. Mehta v. Union of India (1983)",
      "AIIMS Students Union v. AIIMS (2001)"
    ],
    articleRange: "Article 51A"
  },
  "part-v": {
    overview: "Part V deals with the Union Government, establishing the executive, legislative, and judicial structure at the central level. It defines the powers and functions of the President, Parliament, and Supreme Court.",
    keyPoints: [
      "Executive power vested in the President",
      "Parliament consists of President, Lok Sabha, and Rajya Sabha",
      "Supreme Court as the highest judicial authority",
      "Comptroller and Auditor General for financial oversight",
      "Attorney General as chief legal advisor"
    ],
    importance: "This part establishes the federal structure and distribution of powers at the Union level.",
    caseLaws: [
      "S.R. Bommai v. Union of India (1994)",
      "Kesavananda Bharati v. State of Kerala (1973)"
    ],
    articleRange: "Articles 52-151"
  },
  "part-vi": {
    overview: "Part VI deals with the State Governments, establishing the executive, legislative, and judicial structure at the state level. It defines the powers and functions of Governors, State Legislatures, and High Courts.",
    keyPoints: [
      "Governor as constitutional head of state",
      "State Legislature structure varies by state",
      "High Courts as highest judicial authority in states",
      "Distribution of powers between Union and States",
      "Special provisions for certain states"
    ],
    importance: "This part establishes the federal structure and ensures state autonomy within the Union framework.",
    caseLaws: [
      "S.R. Bommai v. Union of India (1994)",
      "State of Rajasthan v. Union of India (1977)"
    ],
    articleRange: "Articles 152-237"
  },
  "part-viii": {
    overview: "Part VIII deals with Union Territories, which are administered directly by the Central Government. It provides for the administration and governance of these territories.",
    keyPoints: [
      "Union Territories are administered by President",
      "Administrator appointed for each territory",
      "Special provisions for Delhi as National Capital Territory",
      "Power to create local legislatures and councils of ministers",
      "Varied administrative arrangements for different territories"
    ],
    importance: "This part ensures proper administration of centrally governed territories while allowing for local representation.",
    caseLaws: [
      "NCT of Delhi v. Union of India (2018)",
      "Shiv Kirpal Singh v. V.V. Giri (1970)"
    ],
    articleRange: "Articles 239-242"
  },
  "part-ix": {
    overview: "Part IX was added by the 73rd Amendment Act, 1992, and establishes the Panchayati Raj system for rural local self-government. It provides for a three-tier system of Panchayats.",
    keyPoints: [
      "Three-tier Panchayati Raj system",
      "Reservation for SCs, STs, and women",
      "Five-year term for Panchayats",
      "State Election Commission for elections",
      "Finance Commission for financial devolution"
    ],
    importance: "This part institutionalizes grassroots democracy and ensures participation of rural communities in governance.",
    caseLaws: [
      "K. Krishna Murthy v. Union of India (2010)",
      "State of West Bengal v. Committee for Protection of Democratic Rights (2010)"
    ],
    articleRange: "Articles 243-243ZT"
  },
  "part-ixa": {
    overview: "Part IXA was added by the 74th Amendment Act, 1992, and establishes the Municipal system for urban local self-government. It provides for various types of urban local bodies.",
    keyPoints: [
      "Municipalities for urban areas",
      "Municipal Corporations for larger urban areas",
      "Reservation for SCs, STs, and women",
      "Ward Committees for citizen participation",
      "Metropolitan Planning Committees"
    ],
    importance: "This part institutionalizes urban democracy and ensures participation of urban communities in governance.",
    caseLaws: [
      "K. Krishna Murthy v. Union of India (2010)",
      "State of Punjab v. Jalour Singh (2007)"
    ],
    articleRange: "Articles 243P-243ZG"
  },
  "part-xi": {
    overview: "Part XI deals with the distribution of legislative powers between the Union and States. It establishes the three lists in the Seventh Schedule and provides for coordination between different levels of government.",
    keyPoints: [
      "Union List, State List, and Concurrent List",
      "Residuary powers with Union",
      "Parliament's power over state subjects in national interest",
      "Inter-state trade and commerce provisions",
      "Coordination mechanisms between Union and States"
    ],
    importance: "This part establishes the federal structure and ensures proper distribution of powers while maintaining national unity.",
    caseLaws: [
      "State of West Bengal v. Union of India (1963)",
      "K.C. Gajapati Narayan Deo v. State of Orissa (1953)"
    ],
    articleRange: "Articles 245-263"
  },
  "part-xii": {
    overview: "Part XII deals with finance, property, contracts, and suits. It establishes the financial relationship between the Union and States and provides for property rights and contractual obligations.",
    keyPoints: [
      "Distribution of tax revenues",
      "Finance Commission recommendations",
      "Consolidated Funds and Contingency Funds",
      "Property rights and contractual obligations",
      "Audit and accounts provisions"
    ],
    importance: "This part ensures proper financial management and fiscal federalism in the Indian Union.",
    caseLaws: [
      "State of West Bengal v. Union of India (1963)",
      "R.C. Cooper v. Union of India (1970)"
    ],
    articleRange: "Articles 264-300A"
  }
};

export default function PartDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [part, setPart] = useState<ConstitutionPart | null>(null);
  const [articles, setArticles] = useState<ConstitutionArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [bookmarkedArticles, setBookmarkedArticles] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState("articles");

  // Get study material for current part
  const currentStudyMaterial = studyMaterials[id as string] || {
    overview: "Study material for this part is being prepared.",
    keyPoints: ["Key points will be available soon."],
    importance: "Importance information will be provided.",
    caseLaws: ["Case laws will be listed here."],
    articleRange: "Articles range will be specified."
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch constitution data
        const constitutionData = await loadCSVData();
        
        // Find the specific part
        const foundPart = constitutionData.parts.find(p => p.id === id);
        if (!foundPart) {
          throw new Error("Part not found");
        }
        setPart(foundPart);
        
        const articleRange = foundPart.articleRange.replace("Article ", "").split("-");
        const startArticle = parseInt(articleRange[0]);
        const endArticle = parseInt(articleRange[1]) || startArticle;
        
        // Filter articles within the range
        const partArticles = constitutionData.articles.filter(article => {
          const articleNumber = article.number;
          return articleNumber >= startArticle && articleNumber <= endArticle;
        });
        
        setArticles(partArticles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load part data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleNotesChange = (value: string) => {
    setNotes(value);
    // Save notes to localStorage
    localStorage.setItem(`part-${id}-notes`, value);
  };

  const handleBookmark = (articleNumber: number) => {
    const newBookmarks = new Set(bookmarkedArticles);
    if (bookmarkedArticles.has(articleNumber)) {
      newBookmarks.delete(articleNumber);
    } else {
      newBookmarks.add(articleNumber);
    }
    setBookmarkedArticles(newBookmarks);
    localStorage.setItem(`bookmarked-articles-${id}`, JSON.stringify([...newBookmarks]));
  };

  const formatContent = (text: string) => {
    let t = text;
    t = t.replace(/;\s+/g, ';\n');
    t = t.replace(/\s\((\d+)\)/g, '\n($1)');
    t = t.replace(/\s\(([a-zA-Z])\)/g, '\n($1)');
    t = t.replace(/\s(Proviso:)/g, '\n$1');
    t = t.replace(/\s(Explanation\s+I:)/g, '\n$1');
    t = t.replace(/\s(Explanation\s+II:)/g, '\n$1');
    return t;
  };

  const handleDownloadStudyMaterial = () => {
    const content = `
STUDY MATERIAL FOR ${part?.id}

OVERVIEW:
${currentStudyMaterial.overview}

KEY POINTS:
${currentStudyMaterial.keyPoints.map((point: string) => `• ${point}`).join('\n')}

IMPORTANCE:
${currentStudyMaterial.importance}

CASE LAWS:
${currentStudyMaterial.caseLaws.map((caseLaw: string) => `• ${caseLaw}`).join('\n')}

ARTICLES COVERED:
${currentStudyMaterial.articleRange || "Articles range will be specified."}

NOTES:
${notes}

Generated from Constitution Study App
    `.trim();
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${part?.id.replace(/\s+/g, '_')}_Study_Material.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Load saved data
  useEffect(() => {
    const savedNotes = localStorage.getItem(`part-${id}-notes`);
    const savedBookmarks = localStorage.getItem(`bookmarked-articles-${id}`);
    
    if (savedNotes) setNotes(savedNotes);
    if (savedBookmarks) {
      setBookmarkedArticles(new Set(JSON.parse(savedBookmarks)));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading constitutional content...</p>
        </div>
      </div>
    );
  }

  if (error || !part) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Content</h2>
          <p className="text-gray-600 mb-4">{error || "Part not found"}</p>
          <Button onClick={() => navigate('/parts')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Parts
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button onClick={() => navigate('/parts')} variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Parts
            </Button>
            <Button onClick={handleDownloadStudyMaterial} variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download Study Material
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Part Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 border border-gray-200">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{part.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{part.subject}</p>
            <Badge variant="outline" className="text-sm bg-blue-50 text-blue-700 border-blue-200">
              {part.articleRange}
            </Badge>
          </div>
          
          {part.partText && (
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p className="text-center">{part.partText}</p>
            </div>
          )}
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-gray-100 p-1 rounded-lg">
            <TabsTrigger value="articles" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Book className="w-4 h-4 mr-2" />
              Articles
            </TabsTrigger>
            <TabsTrigger value="study-material" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <GraduationCap className="w-4 h-4 mr-2" />
              Study Material
            </TabsTrigger>
            <TabsTrigger value="key-points" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Star className="w-4 h-4 mr-2" />
              Key Points
            </TabsTrigger>
            <TabsTrigger value="case-laws" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Scale className="w-4 h-4 mr-2" />
              Case Laws
            </TabsTrigger>
            <TabsTrigger value="notes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="w-4 h-4 mr-2" />
              My Notes
            </TabsTrigger>
          </TabsList>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Constitutional Articles</h2>
              <div className="grid gap-6">
                {articles.map((article) => (
                  <Card key={article.number} className="hover:shadow-md transition-shadow duration-200 border-gray-200">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-xl text-gray-900">
                            Article {`${article.number}${article.suffix || ''}`}
                          </CardTitle>
                          {article.title && (
                            <p className="text-gray-600 mt-1">{article.title}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBookmark(article.number)}
                          className={bookmarkedArticles.has(article.number) ? "text-yellow-500" : "text-gray-400"}
                        >
                          <Bookmark className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="prose prose-gray max-w-none">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">{formatContent(article.content)}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Study Material Tab */}
          <TabsContent value="study-material" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Comprehensive Study Material</h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Overview</h3>
                  <p className="text-blue-800 leading-relaxed">{currentStudyMaterial.overview}</p>
                </div>

                <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Importance</h3>
                  <p className="text-green-800 leading-relaxed">{currentStudyMaterial.importance}</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                  <h3 className="text-lg font-semibold text-purple-900 mb-3">Articles Covered</h3>
                  <Badge variant="outline" className="text-purple-700 border-purple-300 bg-purple-50">
                    {currentStudyMaterial.articleRange}
                  </Badge>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Key Points Tab */}
          <TabsContent value="key-points" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Points to Remember</h2>
              <div className="grid gap-4">
                {currentStudyMaterial.keyPoints.map((point: string, index: number) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-800 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Case Laws Tab */}
          <TabsContent value="case-laws" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Important Case Laws</h2>
              <div className="grid gap-4">
                {currentStudyMaterial.caseLaws.map((caseLaw: string, index: number) => (
                  <Card key={index} className="border-l-4 border-l-blue-500 bg-blue-50">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <Scale className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <p className="text-blue-900 font-medium">{caseLaw}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Notes Tab */}
          <TabsContent value="notes" className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Study Notes</h2>
              <div className="space-y-4">
                <Textarea
                  placeholder="Add your personal notes, insights, and study points here..."
                  value={notes}
                  onChange={(e) => handleNotesChange(e.target.value)}
                  className="min-h-64 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  rows={12}
                />
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Notes are automatically saved to your browser</span>
                  <span>{notes.length} characters</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

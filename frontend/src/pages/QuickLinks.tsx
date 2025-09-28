import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Scale, 
  Users, 
  FileText, 
  Building, 
  BookOpen, 
  Globe,
  Info
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTranslation } from "react-i18next";

const QuickLinks = () => {
  const { t } = useTranslation();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const sections = [
    {
      id: "citizenship",
      title: "Citizenship & Rights",
      color: "bg-blue-500",
      icon: <Scale className="h-6 w-6 text-white" />,
      links: [
        { id: "equality", title: "Right to Equality", summary: "Articles 14-18: Equal protection of laws and prohibition of discrimination" },
        { id: "freedom", title: "Right to Freedom", summary: "Articles 19-22: Freedom of speech, expression, assembly, association, movement, etc." },
        { id: "exploitation", title: "Right against Exploitation", summary: "Articles 23-24: Prohibition of trafficking, forced labor, and child labor" },
        { id: "remedies", title: "Right to Constitutional Remedies", summary: "Article 32: Right to move the Supreme Court for enforcement of Fundamental Rights" },
        { id: "education", title: "Right to Education", summary: "Article 21A: Free and compulsory education for children aged 6-14 years" }
      ]
    },
    {
      id: "women",
      title: "Women & Child Rights",
      color: "bg-pink-500",
      icon: <Users className="h-6 w-6 text-white" />,
      links: [
        { id: "women", title: "Rights of Women", summary: "Constitutional provisions and laws protecting women's rights" },
        { id: "child", title: "Child Rights & Protection", summary: "Laws and provisions for protection of children's rights and welfare" },
        { id: "domestic", title: "Laws Against Domestic Violence", summary: "Protection of Women from Domestic Violence Act and related provisions" }
      ]
    },
    {
      id: "legal",
      title: "Legal & Complaint Access",
      color: "bg-green-500",
      icon: <FileText className="h-6 w-6 text-white" />,
      links: [
        { id: "complaint", title: "How to File a Complaint", summary: "Step-by-step guide to filing complaints with various authorities" },
        { id: "lokpal", title: "Lokpal & Anti-Corruption Links", summary: "Information about anti-corruption bodies and how to approach them" },
        { id: "rti", title: "RTI (Right to Information)", summary: "How to file RTI applications and get information from public authorities" }
      ]
    },
    {
      id: "governance",
      title: "Governance & Democracy",
      color: "bg-orange-500",
      icon: <Building className="h-6 w-6 text-white" />,
      links: [
        { id: "structure", title: "Structure of Government", summary: "Overview of the three branches of government: Executive, Legislature, and Judiciary" },
        { id: "laws", title: "How Laws are Made", summary: "The legislative process and how bills become laws" },
        { id: "powers", title: "State vs Central Powers", summary: "Distribution of powers between the Union and State governments" }
      ]
    },
    {
      id: "special",
      title: "Special Topics",
      color: "bg-purple-500",
      icon: <BookOpen className="h-6 w-6 text-white" />,
      links: [
        { id: "reservation", title: "Reservation & Social Justice", summary: "Constitutional provisions for reservation and affirmative action" },
        { id: "emergency", title: "Emergency Provisions", summary: "Types of emergencies and their constitutional implications" },
        { id: "amendments", title: "Amendments Overview", summary: "Process of amending the Constitution and key amendments" }
      ]
    },
    {
      id: "multilingual",
      title: "Multilingual Access",
      color: "bg-red-500",
      icon: <Globe className="h-6 w-6 text-white" />,
      links: [
        { id: "hindi", title: "हिंदी", summary: "View content in Hindi" },
        { id: "tamil", title: "தமிழ்", summary: "View content in Tamil" },
        { id: "bengali", title: "বাংলা", summary: "View content in Bengali" },
        { id: "other", title: "Other Languages", summary: "Access content in additional Indian languages" }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-background py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">Quick Access: Know Your Rights & Duties</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore key topics of the Indian Constitution in simple terms with direct links.
            </p>
          </div>
          
          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section) => (
              <Card key={section.id} className="overflow-hidden border-2 border-yellow-400 hover:shadow-lg transition-shadow">
                <div className={`${section.color} p-4 flex items-center space-x-3`}>
                  {section.icon}
                  <h2 className="text-xl font-semibold text-white">{section.title}</h2>
                </div>
                <CardContent className="p-4">
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <TooltipProvider key={link.id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <li className="p-2 hover:bg-yellow-50 rounded-md cursor-pointer transition-colors">
                              <a 
                                href={`/articles?category=${section.id}&topic=${link.id}`}
                                className="flex items-center text-foreground hover:text-primary transition-colors"
                                onMouseEnter={() => setHoveredLink(`${section.id}-${link.id}`)}
                                onMouseLeave={() => setHoveredLink(null)}
                              >
                                <Info className="h-4 w-4 mr-2 text-yellow-500" />
                                <span>{link.title}</span>
                              </a>
                            </li>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="max-w-xs">
                            <p>{link.summary}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuickLinks;
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ExternalLink, 
  Globe, 
  Shield, 
  Users, 
  Building,
  FileText,
  ArrowRight,
  Scale,
  AlertTriangle,
  Phone,
  Mail,
  MessageSquare,
  FileCheck,
  Gavel,
  CreditCard
} from "lucide-react";
import { useTranslation } from "react-i18next";

const QuickLinks = () => {
  const { t } = useTranslation();

  // Government website links
  const governmentLinks = [
    {
      id: "digital-india",
      title: "Digital India Portal",
      description: "Official portal for Digital India initiatives and services",
      url: "https://digitalindia.gov.in",
      icon: <Globe className="h-6 w-6" />,
      color: "bg-blue-500",
      category: "Digital Services"
    },
    {
      id: "mygov",
      title: "MyGov India",
      description: "Citizen engagement platform for governance and policy participation",
      url: "https://www.mygov.in",
      icon: <Users className="h-6 w-6" />,
      color: "bg-green-500",
      category: "Citizen Engagement"
    },
    {
      id: "india-gov",
      title: "India.gov.in",
      description: "National portal of India - Official government website",
      url: "https://www.india.gov.in",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-orange-500",
      category: "Government Portal"
    },
    {
      id: "pm-india",
      title: "PM India",
      description: "Official website of the Prime Minister of India",
      url: "https://www.pmindia.gov.in",
      icon: <Building className="h-6 w-6" />,
      color: "bg-purple-500",
      category: "Leadership"
    },
    {
      id: "president-india",
      title: "President of India",
      description: "Official website of the President of India",
      url: "https://presidentofindia.nic.in",
      icon: <FileText className="h-6 w-6" />,
      color: "bg-indigo-500",
      category: "Constitutional Office"
    },
    {
      id: "supreme-court",
      title: "Supreme Court of India",
      description: "Official website of the Supreme Court of India",
      url: "https://www.sci.gov.in",
      icon: <Scale className="h-6 w-6" />,
      color: "bg-red-500",
      category: "Judiciary"
    }
  ];

  // Online complaint and grievance portals
  const complaintLinks = [
    {
      id: "cpgrams",
      title: "CPGRAMS - Centralized Public Grievance Redressal",
      description: "File complaints and track status of grievances against central government departments",
      url: "https://pgportal.gov.in",
      icon: <AlertTriangle className="h-6 w-6" />,
      color: "bg-red-600",
      category: "Grievance Redressal"
    },
    {
      id: "consumer-helpline",
      title: "National Consumer Helpline",
      description: "Register consumer complaints and get assistance for consumer rights violations",
      url: "https://consumerhelpline.gov.in",
      icon: <Phone className="h-6 w-6" />,
      color: "bg-green-600",
      category: "Consumer Rights"
    },
    {
      id: "cyber-crime",
      title: "Cyber Crime Reporting Portal",
      description: "Report cyber crimes, online fraud, and digital security issues",
      url: "https://cybercrime.gov.in",
      icon: <Shield className="h-6 w-6" />,
      color: "bg-blue-600",
      category: "Cyber Security"
    },
    {
      id: "rti-portal",
      title: "RTI Online Portal",
      description: "File Right to Information (RTI) applications online",
      url: "https://rtionline.gov.in",
      icon: <FileCheck className="h-6 w-6" />,
      color: "bg-purple-600",
      category: "Transparency"
    },
    {
      id: "legal-services",
      title: "National Legal Services Authority",
      description: "Free legal aid and assistance for eligible citizens",
      url: "https://nalsa.gov.in",
      icon: <Gavel className="h-6 w-6" />,
      color: "bg-indigo-600",
      category: "Legal Aid"
    },
    {
      id: "banking-ombudsman",
      title: "Banking Ombudsman",
      description: "Complaints against banks and financial institutions",
      url: "https://rbi.org.in",
      icon: <CreditCard className="h-6 w-6" />,
      color: "bg-yellow-600",
      category: "Banking"
    }
  ];

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow hero-gradient py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Government Quick Links
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access official government websites and digital services directly from here.
            </p>
          </div>
          
          {/* Government Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {governmentLinks.map((link) => (
              <Card 
                key={link.id} 
                className="constitutional-card hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => handleLinkClick(link.url)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`${link.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}>
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.title}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground font-medium">
                        {link.category}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {link.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Website
                    </Button>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Online Complaint & Grievance Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Online Complaints & Grievances
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                File complaints, report issues, and seek redressal through official government portals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {complaintLinks.map((link) => (
                <Card 
                  key={link.id} 
                  className="constitutional-card hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  onClick={() => handleLinkClick(link.url)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`${link.color} p-3 rounded-lg text-white group-hover:scale-110 transition-transform duration-200`}>
                        {link.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                          {link.title}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground font-medium">
                          {link.category}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {link.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Access Portal
                      </Button>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-12">
            <Card className="constitutional-card">
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    About These Links
                  </h3>
                  <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                    These are official government websites and complaint portals that provide direct access to 
                    government services, information, and grievance redressal systems. All links open in new tabs 
                    to ensure you don't lose your place on this constitutional learning platform.
                  </p>
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                      Official Government Sites
                    </span>
                    <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                      Grievance Redressal
                    </span>
                    <span className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-medium">
                      Citizen Services
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      Complaint Portals
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default QuickLinks;
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import { Bot, Send, User, Sparkles, BookOpen, Scale } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your Constitutional AI Assistant. I can help you understand the Indian Constitution, explain articles, discuss fundamental rights and duties, and answer any constitutional questions you might have. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: `I understand you're asking about "${inputText}". This is a mock response. In a real implementation, this would connect to an AI service to provide accurate constitutional information. The AI would analyze your question and provide detailed explanations about relevant articles, precedents, and constitutional principles.`,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are fundamental rights?",
    "Explain Article 21",
    "What are fundamental duties?",
    "How does the judiciary work?",
    "What is the Preamble?"
  ];

  return (
    <div className="min-h-screen hero-gradient">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
              <Bot className="w-8 h-8 text-primary" />
              Constitutional AI Assistant
            </h1>
            <p className="text-muted-foreground">
              Ask me anything about the Indian Constitution
            </p>
          </div>

          {/* Quick Questions */}
          <Card className="constitutional-card mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Quick Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((question, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputText(question)}
                    className="text-xs"
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="constitutional-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Messages */}
              <div className="h-96 overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.isUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.isUser ? (
                          <User className="w-4 h-4" />
                        ) : (
                          <Bot className="w-4 h-4" />
                        )}
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-4 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        <span className="text-sm">AI is typing...</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about the Constitution..."
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputText.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <Scale className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Legal Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Get detailed explanations of constitutional articles and legal concepts
                </p>
              </CardContent>
            </Card>
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Educational Support</h3>
                <p className="text-sm text-muted-foreground">
                  Learn with examples, case studies, and simplified explanations
                </p>
              </CardContent>
            </Card>
            <Card className="constitutional-card">
              <CardContent className="p-4 text-center">
                <Sparkles className="w-8 h-8 mx-auto mb-2 text-primary" />
                <h3 className="font-semibold mb-1">Interactive Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Engage in meaningful discussions about constitutional principles
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiAssistant;
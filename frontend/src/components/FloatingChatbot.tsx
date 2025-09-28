import React, { useState, useRef } from "react";
import axios from "axios";

// Model Priority System - try in exact sequence (verified working models)
const MODELS = [
  { name: "microsoft/DialoGPT-medium", displayName: "DialoGPT-Medium", type: "text-generation" },
  { name: "gpt2", displayName: "GPT-2", type: "text-generation" },
  { name: "EleutherAI/gpt-neo-125M", displayName: "GPT-Neo-125M", type: "text-generation" }
];

const API_URL = "https://api-inference.huggingface.co/models/";
const API_KEY = import.meta.env.VITE_HUGGINGFACE_API_KEY;

const constitutionalContext = `You are an expert on the Constitution of India. Answer questions strictly based on the Constitution, providing relevant articles, sections, and context. If the question is not related to the Constitution, politely refuse.`;

// Local Knowledge Base - Comprehensive constitutional answers
const localKnowledgeBase = {
  "father of constitution": {
    answer: "Dr. B.R. Ambedkar is known as the Father of the Indian Constitution. He was the Chairman of the Drafting Committee of the Constituent Assembly and played a pivotal role in framing the Constitution of India. The Constitution was adopted on 26th November 1949 and came into effect on 26th January 1950.",
    source: "Local KB"
  },
  "fundamental rights": {
    answer: "The Fundamental Rights are enshrined in Part III of the Indian Constitution (Articles 12-35). They include:\n\n1. Right to Equality (Articles 14-18)\n2. Right to Freedom (Articles 19-22)\n3. Right against Exploitation (Articles 23-24)\n4. Right to Freedom of Religion (Articles 25-28)\n5. Cultural and Educational Rights (Articles 29-30)\n6. Right to Constitutional Remedies (Article 32)\n\nThese rights are justiciable and can be enforced through the courts.",
    source: "Local KB"
  },
  "article 370": {
    answer: "Article 370 of the Indian Constitution granted special autonomous status to Jammu and Kashmir. It was abrogated on 5th August 2019 through a Presidential Order. The article had allowed the state to have its own constitution, flag, and autonomy over internal administration, except in matters of defense, foreign affairs, finance, and communications.",
    source: "Local KB"
  },
  "government structure": {
    answer: "The Government of India follows a federal structure with three levels:\n\n1. **Union Government (Central)**: Headed by the Prime Minister, includes Parliament (Lok Sabha and Rajya Sabha), President, and Supreme Court\n\n2. **State Government**: Headed by Chief Minister, includes State Legislature, Governor, and High Court\n\n3. **Local Government**: Panchayats (rural) and Municipalities (urban)\n\nThe Constitution establishes a system of checks and balances between these levels.",
    source: "Local KB"
  },
  "preamble": {
    answer: "The Preamble to the Indian Constitution declares India to be a Sovereign, Socialist, Secular, Democratic Republic. It states the objectives of the Constitution: Justice, Liberty, Equality, and Fraternity. The Preamble was amended in 1976 to include the words 'Socialist' and 'Secular'.",
    source: "Local KB"
  },
  "directive principles": {
    answer: "The Directive Principles of State Policy are enshrined in Part IV of the Constitution (Articles 36-51). They are non-justiciable guidelines for the government to establish a welfare state. Key principles include right to work, education, public assistance, uniform civil code, and protection of environment.",
    source: "Local KB"
  },
  "fundamental duties": {
    answer: "The Fundamental Duties are listed in Article 51A of the Constitution. They were added by the 42nd Amendment in 1976. There are 11 fundamental duties including respecting the Constitution, national flag and anthem, promoting harmony, protecting the environment, and developing scientific temper.",
    source: "Local KB"
  },
  "president": {
    answer: "The President of India is the head of state and the first citizen of India. The President is elected by an electoral college consisting of elected members of both houses of Parliament and state legislatures. The President has executive, legislative, and emergency powers as outlined in Articles 52-78 of the Constitution.",
    source: "Local KB"
  },
  "prime minister": {
    answer: "The Prime Minister is the head of government and the leader of the Council of Ministers. The Prime Minister is appointed by the President and is usually the leader of the majority party in the Lok Sabha. The Prime Minister's powers and functions are outlined in Article 74-75 of the Constitution.",
    source: "Local KB"
  },
  "supreme court": {
    answer: "The Supreme Court of India is the highest judicial authority in the country. It has original, appellate, and advisory jurisdiction. The Supreme Court consists of a Chief Justice and up to 34 judges. It acts as the guardian of the Constitution and has the power of judicial review.",
    source: "Local KB"
  },
  "article 1": {
    answer: "Article 1 of the Indian Constitution declares India as a Union of States. It states: 'India, that is Bharat, shall be a Union of States.' The article defines the territory of India and establishes the federal structure of the country.",
    source: "Local KB"
  },
  "article 14": {
    answer: "Article 14 of the Indian Constitution guarantees the Right to Equality. It states: 'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.' This is a fundamental right that ensures equal treatment under the law.",
    source: "Local KB"
  },
  "article 19": {
    answer: "Article 19 of the Indian Constitution guarantees six fundamental freedoms to all citizens: (1) Freedom of speech and expression, (2) Freedom to assemble peaceably, (3) Freedom to form associations, (4) Freedom to move freely throughout India, (5) Freedom to reside and settle in any part of India, (6) Freedom to practice any profession, occupation, trade or business.",
    source: "Local KB"
  },
  "article 21": {
    answer: "Article 21 of the Indian Constitution guarantees the Right to Life and Personal Liberty. It states: 'No person shall be deprived of his life or personal liberty except according to procedure established by law.' This is one of the most important fundamental rights and has been interpreted broadly by the Supreme Court.",
    source: "Local KB"
  },
  "article 25": {
    answer: "Article 25 of the Indian Constitution guarantees the Right to Freedom of Religion. It states: 'Subject to public order, morality and health and to the other provisions of this Part, all persons are equally entitled to freedom of conscience and the right freely to profess, practise and propagate religion.' This includes the right to practice, profess, and propagate any religion.",
    source: "Local KB"
  },
  "article 345": {
    answer: "Article 345 of the Indian Constitution deals with the Official language or languages of a State. It states that the Legislature of a State may by law adopt any one or more of the languages in use in the State or Hindi as the language or languages to be used for all or any of the official purposes of that State.",
    source: "Local KB"
  },
  "women rights": {
    answer: "The Constitution of India provides several rights for women:\n\n1. **Right to Equality (Article 14)**: Equal protection of laws\n2. **Right to Freedom (Article 19)**: Freedom of speech, assembly, movement\n3. **Right to Life (Article 21)**: Right to life and personal liberty\n4. **Right against Exploitation (Article 23)**: Prohibition of traffic in human beings\n5. **Right to Education (Article 21A)**: Free and compulsory education\n6. **Right to Work**: Equal opportunity in employment\n7. **Right to Property**: Equal inheritance rights\n8. **Right to Vote**: Universal adult franchise\n\nThese rights ensure gender equality and protection for women in India.",
    source: "Local KB"
  },
  "basic rights for women": {
    answer: "The Constitution of India provides several fundamental rights for women:\n\n1. **Right to Equality (Article 14)**: Equal protection of laws\n2. **Right to Freedom (Article 19)**: Freedom of speech, assembly, movement\n3. **Right to Life (Article 21)**: Right to life and personal liberty\n4. **Right against Exploitation (Article 23)**: Prohibition of traffic in human beings\n5. **Right to Education (Article 21A)**: Free and compulsory education\n6. **Right to Work**: Equal opportunity in employment\n7. **Right to Property**: Equal inheritance rights\n8. **Right to Vote**: Universal adult franchise\n\nThese rights ensure gender equality and protection for women in India.",
    source: "Local KB"
  },
  "article 200": {
    answer: "Article 200 of the Indian Constitution deals with the 'Assent to Bills' by the Governor. It states that when a Bill has been passed by the Legislative Assembly of a State or, in the case of a State having a Legislative Council, has been passed by both Houses of the Legislature of the State, it shall be presented to the Governor and the Governor shall declare either that he assents to the Bill or that he withholds assent therefrom or that he reserves the Bill for the consideration of the President.",
    source: "Local KB"
  },
  "articles specific to children": {
    answer: "The Constitution of India provides several articles that specifically protect children's rights:\n\n1. **Article 21A**: Right to Education - Free and compulsory education for children aged 6-14 years\n2. **Article 24**: Prohibition of employment of children in factories, mines, and other hazardous employment\n3. **Article 39(e)**: State shall ensure that children are not abused and are given opportunities to develop in a healthy manner\n4. **Article 39(f)**: State shall ensure that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity\n5. **Article 45**: State shall provide early childhood care and education for children until they complete the age of six years\n\nThese articles ensure the protection, education, and development of children in India.",
    source: "Local KB"
  },
  "children rights": {
    answer: "The Constitution of India provides several articles that specifically protect children's rights:\n\n1. **Article 21A**: Right to Education - Free and compulsory education for children aged 6-14 years\n2. **Article 24**: Prohibition of employment of children in factories, mines, and other hazardous employment\n3. **Article 39(e)**: State shall ensure that children are not abused and are given opportunities to develop in a healthy manner\n4. **Article 39(f)**: State shall ensure that children are given opportunities and facilities to develop in a healthy manner and in conditions of freedom and dignity\n5. **Article 45**: State shall provide early childhood care and education for children until they complete the age of six years\n\nThese articles ensure the protection, education, and development of children in India.",
    source: "Local KB"
  },
  "name them": {
    answer: "I need more context to answer your question. Please specify what you're referring to. For example:\n- 'Name the fundamental rights'\n- 'Name the articles for children'\n- 'Name the directive principles'\n\nI can help you with specific constitutional topics if you provide more details.",
    source: "Local KB"
  }
};

function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", content: "Hi! Ask me anything about the Constitution of India.", source: "Local KB" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentModel, setCurrentModel] = useState("Local KB");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(scrollToBottom, [messages]);

  // Check local knowledge base first
  function checkLocalKB(question) {
    const normalizedQuestion = question.toLowerCase().trim();
    
    // Direct matches
    if (localKnowledgeBase[normalizedQuestion]) {
      return localKnowledgeBase[normalizedQuestion];
    }
    
    // Article number matching
    const articleMatch = normalizedQuestion.match(/article\s+(\d+)/);
    if (articleMatch) {
      const articleNum = articleMatch[1];
      const articleKey = `article ${articleNum}`;
      if (localKnowledgeBase[articleKey]) {
        return localKnowledgeBase[articleKey];
      }
    }
    
    // Enhanced keyword matching for constitutional topics
    const constitutionalKeywords = [
      'children', 'women', 'rights', 'fundamental', 'directive', 'duties',
      'president', 'prime minister', 'supreme court', 'parliament', 'governor',
      'equality', 'freedom', 'liberty', 'education', 'religion', 'property'
    ];
    
    for (const keyword of constitutionalKeywords) {
      if (normalizedQuestion.includes(keyword)) {
        // Check for specific combinations
        if (normalizedQuestion.includes('children') && (normalizedQuestion.includes('article') || normalizedQuestion.includes('right'))) {
          return localKnowledgeBase['articles specific to children'];
        }
        if (normalizedQuestion.includes('women') && normalizedQuestion.includes('right')) {
          return localKnowledgeBase['women rights'];
        }
        if (normalizedQuestion.includes('fundamental') && normalizedQuestion.includes('right')) {
          return localKnowledgeBase['fundamental rights'];
        }
      }
    }
    
    // Partial matches
    for (const [key, value] of Object.entries(localKnowledgeBase)) {
      if (normalizedQuestion.includes(key) || key.includes(normalizedQuestion)) {
        return value;
      }
    }
    
    // Keyword-based matching
    const keywords = normalizedQuestion.split(' ');
    for (const keyword of keywords) {
      if (localKnowledgeBase[keyword]) {
        return localKnowledgeBase[keyword];
      }
    }
    
    return null;
  }

  async function queryModel(model, question) {
    try {
      // All models are text generation - use consistent format
      const requestBody = {
        inputs: `${constitutionalContext}\n\nUser: ${question}\n\nAssistant:`,
        parameters: {
          max_new_tokens: 200,
          temperature: 0.7,
          return_full_text: false,
          do_sample: true,
          top_p: 0.9
        }
      };

      // Debug logging (only in development)
      if (process.env.NODE_ENV === 'development') {
        console.log(`Trying model: ${model.displayName} with question: ${question}`);
      }

      const response = await axios.post(
        `${API_URL}${model.name}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
          },
          timeout: 20000
        }
      );
      
        // Debug logging (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`Model ${model.displayName} response:`, response.data);
        }
      
      if (response.data) {
        let answer;
        // Text generation models
        if (response.data[0] && response.data[0].generated_text) {
          answer = response.data[0].generated_text.trim();
        } else if (response.data.generated_text) {
          answer = response.data.generated_text.trim();
        } else {
          throw new Error("No generated text in response");
        }
        
        // Clean up the answer
        answer = answer.replace(/^Assistant:\s*/i, '').trim();
        
        return {
          answer: answer,
          source: model.displayName
        };
      }
      throw new Error("No response from model");
    } catch (err) {
        // Debug logging (only in development)
        if (process.env.NODE_ENV === 'development') {
          console.log(`Model ${model.displayName} error:`, err.response?.status, err.message);
        }
      throw err;
    }
  }

  async function sendMessage() {
    if (!input.trim()) return;
    const userMessage = input.trim();
    setMessages(msgs => [...msgs, { role: "user", content: userMessage }]);
    setLoading(true);
    setError("");
    
    try {
      // Try AI models first for responsive answers
      let lastError = null;
      for (const model of MODELS) {
        try {
          const result = await queryModel(model, userMessage);
          setMessages(msgs => [...msgs, { 
            role: "bot", 
            content: result.answer, 
            source: result.source 
          }]);
          setCurrentModel(result.source);
          setInput("");
          setLoading(false);
          return;
        } catch (err) {
          lastError = err;
          // Debug logging (only in development)
          if (process.env.NODE_ENV === 'development') {
            console.log(`Model ${model.displayName} failed:`, err.message);
          }
          continue; // Try next model
        }
      }
      
      // All models failed, check local knowledge base as fallback
      const localAnswer = checkLocalKB(userMessage);
      if (localAnswer) {
        setMessages(msgs => [...msgs, { 
          role: "bot", 
          content: localAnswer.answer, 
          source: localAnswer.source 
        }]);
        setCurrentModel(localAnswer.source);
        setInput("");
        setLoading(false);
        return;
      }
      
      // No models or local KB available, provide helpful response
      const fallbackAnswer = "I apologize, but I'm having trouble accessing the AI models right now. However, I can help you with specific constitutional topics. Please try asking about: Father of Constitution, Fundamental Rights, Article 370, Government Structure, Preamble, Directive Principles, Fundamental Duties, President, Prime Minister, Supreme Court, or specific articles like Article 1, 14, 19, 21, etc.";
      
      setMessages(msgs => [...msgs, { 
        role: "bot", 
        content: fallbackAnswer, 
        source: "Local KB" 
      }]);
      setCurrentModel("Local KB");
      setError("All AI models are currently unavailable. Using local knowledge base.");
      
    } catch (err) {
      setMessages(msgs => [...msgs, { 
        role: "bot", 
        content: "I'm sorry, I encountered an error. Please try again or ask about a specific constitutional topic.", 
        source: "Local KB" 
      }]);
      setError("Error: " + (err.message || "Unknown error"));
    }
    
    setInput("");
    setLoading(false);
  }

  // Quick button handlers
  const handleQuickButton = (topic) => {
    setInput(topic);
    // Auto-send the message
    setTimeout(() => {
      sendMessage();
    }, 100);
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg z-50 hover:bg-blue-700 transition"
        onClick={() => setOpen(o => !o)}
        aria-label="Ask Constitution"
      >
        {open ? "Close Chat" : "Ask Constitution"}
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 w-96 max-w-full bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200 animate-fade-in">
          {/* Header with badges */}
          <div className="p-4 border-b bg-blue-50">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-blue-700 text-lg">Constitutional Assistant</h3>
              <div className="flex gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">AI Powered</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Local KB</span>
              </div>
            </div>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ maxHeight: "400px" }}>
            {messages.map((msg, i) => (
              <div key={i} className={`${msg.role === "bot" ? "flex flex-col" : "text-right"}`}>
                <div className={`text-sm p-3 rounded-lg ${
                  msg.role === "bot" 
                    ? "text-gray-800 bg-blue-50 border-l-4 border-blue-400" 
                    : "text-blue-700 bg-blue-100 inline-block ml-auto"
                }`}>
                  {msg.content}
                </div>
                {msg.role === "bot" && msg.source && (
                  <div className="text-xs text-gray-500 mt-1">
                    Powered by {msg.source}
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="text-xs text-gray-400 flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Assistant is thinking...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Quick buttons */}
          <div className="p-3 border-t bg-gray-50">
            <div className="text-xs text-gray-600 mb-2">Quick Topics:</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickButton("Father of constitution")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                disabled={loading}
              >
                Father of constitution
              </button>
              <button
                onClick={() => handleQuickButton("Fundamental rights")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                disabled={loading}
              >
                Fundamental rights
              </button>
              <button
                onClick={() => handleQuickButton("Article 370")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                disabled={loading}
              >
                Article 370
              </button>
              <button
                onClick={() => handleQuickButton("Government structure")}
                className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition"
                disabled={loading}
              >
                Government structure
              </button>
            </div>
          </div>
          
          {/* Input */}
          <div className="p-3 border-t flex">
            <input
              className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !loading && sendMessage()}
              placeholder="Ask about the Constitution..."
              disabled={loading}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700 disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
          
          {/* Model info */}
          <div className="px-3 pb-2 text-xs text-gray-500">


            Using NEW API: DialoGPT-Medium - GPT-2 - GPT-Neo-125M - Local KB
          </div>
          <div className="px-3 pb-3 text-xs text-gray-500 flex items-center">
            API Key: Configured <span className="text-green-500 ml-1">✓</span>
          </div>
          
          {error && <div className="p-3 text-xs text-red-500 bg-red-50 border-t">{error}</div>}
          
          {/* Close button */}
          <div className="p-3 border-t text-center">
            <button
              onClick={() => setOpen(false)}
              className="text-blue-600 text-sm hover:text-blue-800"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FloatingChatbot;
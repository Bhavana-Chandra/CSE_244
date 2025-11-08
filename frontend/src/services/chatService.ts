import { GoogleGenerativeAI } from '@google/generative-ai';

const SYSTEM_PROMPT = `You are a Constitutional Assistant for an Indian civic education platform. Educate users about the Indian Constitution in simple, clear language.

Rules:
- Cite specific Articles and Parts (e.g., Article 21A, Part III)
- Use numbered lists for multiple points
- Keep responses 150-250 words
- Give practical examples
- Be friendly and encouraging
- Use simple language suitable for all ages

Format responses like:
"Based on the Indian Constitution, here are the top 3 rights for children:

1. **Right to Education (Article 21A)**: Free and compulsory education for children aged 6-14 years...

2. **Protection from Exploitation (Article 24)**: Children under 14 cannot work in hazardous jobs...

3. **Right to Development (Article 39)**: The State must protect children's health and ensure proper development..."`;

const SAMPLE_QUESTIONS = [
  "tell top 3 rights that particular to children in Indian constitution",
  "What are Fundamental Rights?",
  "Explain Article 21 in simple terms",
  "What is the difference between Fundamental Rights and Duties?"
];

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private isDemoMode: boolean = false;

  constructor() {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('Gemini API key not found. Running in demo mode.');
      this.isDemoMode = true;
    } else {
      try {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
      } catch (error) {
        console.warn('Failed to initialize Gemini API. Running in demo mode.', error);
        this.isDemoMode = true;
      }
    }
  }

  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<string> {
    // Demo mode responses for testing
    if (this.isDemoMode) {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
      
      const demoResponses: { [key: string]: string } = {
        'tell top 3 rights that particular to children in Indian constitution': `Based on the Indian Constitution, here are the top 3 rights for children:

1. **Right to Education (Article 21A)**: Free and compulsory education for children aged 6-14 years. Every child has the right to quality education without discrimination.

2. **Protection from Exploitation (Article 24)**: Children under 14 cannot work in hazardous jobs. This protects their health and ensures they can focus on education.

3. **Right to Development (Article 39)**: The State must protect children's health and ensure proper development, providing opportunities for healthy growth.`,

        'What are Fundamental Rights?': `Fundamental Rights are basic human rights guaranteed by the Indian Constitution (Part III, Articles 12-35):

1. **Right to Equality (Articles 14-18)**: Equal treatment before law, no discrimination.

2. **Right to Freedom (Articles 19-22)**: Speech, assembly, movement, and personal liberty.

3. **Right against Exploitation (Articles 23-24)**: Protection from human trafficking and forced labor.

4. **Right to Freedom of Religion (Articles 25-28)**: Freedom to practice any religion.

5. **Cultural and Educational Rights (Articles 29-30)**: Preserve culture and establish institutions.

6. **Right to Constitutional Remedies (Article 32)**: Approach courts for enforcement.`,

        'Explain Article 21 in simple terms': `**Article 21 - Right to Life and Personal Liberty**

This is one of the most important Fundamental Rights. It states:

"No person shall be deprived of his life or personal liberty except according to procedure established by law."

**What it means:**
- You have the right to live with dignity
- Government cannot take away your freedom without proper legal process
- Includes right to privacy, health, clean environment, and livelihood
- Protection against illegal arrest or detention

**Example**: Police cannot arrest you without proper warrant or legal reason.`,

        'What is the difference between Fundamental Rights and Duties?': `**Fundamental Rights vs Fundamental Duties:**

**Fundamental Rights (Part III):**
- What the government must provide you
- Enforceable by courts
- Example: Right to equality, freedom of speech

**Fundamental Duties (Article 51A):**
- What you must do as a citizen
- Not directly enforceable by courts
- Example: Respect Constitution, protect environment

**Key Difference:** Rights protect you from government overreach, while duties remind you of your responsibilities to the nation. Both are essential for a healthy democracy.`
      };

      const lowerMessage = message.toLowerCase();
      for (const [key, response] of Object.entries(demoResponses)) {
        if (lowerMessage.includes(key.toLowerCase()) || key.toLowerCase().includes(lowerMessage)) {
          return response;
        }
      }

      // Default demo response for other questions
      return `Thank you for your question about the Indian Constitution! I'm currently in demo mode. 

To get full functionality, please add your Gemini API key to the environment variables:

1. Create a \`.env\` file in the frontend directory
2. Add: VITE_GEMINI_API_KEY=your_api_key_here
3. Get your API key from: https://makersuite.google.com/app/apikey

In the meantime, try asking about:
- Children's rights in the Constitution
- Fundamental Rights
- Article 21 explanation
- Rights vs Duties difference`;
    }

    try {
      // Build conversation context
      let context = SYSTEM_PROMPT + '\n\n';
      
      // Add conversation history for context
      conversationHistory.forEach(msg => {
        if (msg.role === 'user') {
          context += `User: ${msg.content}\n`;
        } else {
          context += `Assistant: ${msg.content}\n`;
        }
      });

      // Add the current message
      const fullPrompt = `${context}User: ${message}\nAssistant:`;

      const result = await this.model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();

      return text.trim();
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Handle specific error cases
      if (error instanceof Error) {
        if (error.message.includes('API key')) {
          throw new Error('Unable to connect. Please check API configuration.');
        } else if (error.message.includes('network')) {
          throw new Error('Check your internet connection.');
        }
      }
      
      throw new Error('Unable to connect. Please try again.');
    }
  }

  getSampleQuestions(): string[] {
    return SAMPLE_QUESTIONS;
  }
}

// Singleton instance
let chatServiceInstance: ChatService | null = null;

export const getChatService = (): ChatService => {
  if (!chatServiceInstance) {
    chatServiceInstance = new ChatService();
  }
  return chatServiceInstance;
};
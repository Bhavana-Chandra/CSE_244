# Constitutional Learning Chatbot

A floating AI-powered chatbot widget that educates users about the Indian Constitution using Google Gemini AI. Built for the Constitutional Learning Platform.

## Features

- 🤖 **AI-Powered Responses**: Uses Google Gemini 2.0 Flash for intelligent constitutional education
- 💬 **Interactive Chat Interface**: Modern, responsive chat window with smooth animations
- 📱 **Mobile Responsive**: Works seamlessly on desktop, tablet, and mobile devices
- 🎯 **Sample Questions**: Quick-start questions to help users get started
- 💾 **Conversation History**: Maintains chat history during the session
- ⚡ **Real-time Responses**: Fast AI responses with loading indicators
- 🎨 **Modern Design**: Clean UI with blue gradient theme matching the platform

## Technical Implementation

### Architecture
- **Frontend**: React with TypeScript
- **AI Model**: Google Gemini 2.5 Flash (`gemini-2.5-flash`)
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React hooks for local state
- **API Integration**: Direct Google AI Studio API calls

### Components

#### `ConstitutionalChatbot.tsx`
Main chatbot component featuring:
- Floating action button with pulse animation
- Expandable chat window with header, messages area, and input
- Sample question cards for quick start
- Responsive design with mobile optimization
- Smooth animations and transitions

#### `chatService.ts`
AI service layer providing:
- Gemini API integration with conversation context
- System prompt for constitutional education focus
- Error handling and fallback responses
- Demo mode for testing without API key
- Sample questions management

### Setup Instructions

1. **Get Gemini API Key**:
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Copy the key for configuration

2. **Configure Environment**:
   ```bash
   # In frontend directory
   cp .env.example .env
   # Edit .env and add your API key
   VITE_GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

### Usage

1. **Opening the Chatbot**:
   - Click the floating blue button in the bottom-right corner
   - The chat window will slide up with a welcome message

2. **Asking Questions**:
   - Type your constitutional question in the input field
   - Press Enter or click the Send button
   - Wait for the AI response (loading indicator shows during processing)

3. **Sample Questions**:
   - Click on any sample question card to auto-fill the input
   - Questions include children's rights, fundamental rights, Article 21, etc.

4. **Conversation Flow**:
   - The chatbot maintains conversation history
   - Each response builds on previous context
   - Clear, educational responses with constitutional citations

### API Integration

The chatbot integrates with Google's Gemini API:

```typescript
// API Endpoint
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent

// Headers
{
  "Content-Type": "application/json",
  "x-goog-api-key": "YOUR_API_KEY"
}

// Request Body
{
  "contents": [{
    "parts": [{"text": "user message"}],
    "role": "user"
  }]
}
```

### System Prompt

The AI is configured with a specialized system prompt:

```
You are a Constitutional Assistant for an Indian civic education platform. 
Educate users about the Indian Constitution in simple, clear language.

Rules:
- Cite specific Articles and Parts (e.g., Article 21A, Part III)
- Use numbered lists for multiple points
- Keep responses 150-250 words
- Give practical examples
- Be friendly and encouraging
- Use simple language suitable for all ages
```

### Demo Mode

When no API key is configured, the chatbot runs in demo mode:
- Provides pre-written responses for common constitutional questions
- Shows helpful instructions for API key setup
- Simulates realistic response timing
- Maintains full UI functionality

### Responsive Design

The chatbot adapts to different screen sizes:

**Desktop (380px × 600px)**:
- Fixed position in bottom-right corner
- Full chat window with all features

**Mobile (100% width × 90vh)**:
- Full-width chat window
- Optimized touch interactions
- Maintained functionality

### Error Handling

Comprehensive error handling includes:
- API connection failures
- Network errors
- Invalid responses
- Graceful fallback messages
- User-friendly error notifications

### Styling Features

- **Blue Gradient Theme**: Matches the platform's design system
- **Smooth Animations**: Fade in/out, slide transitions
- **Loading States**: Three-dot animation during processing
- **High Z-Index**: Ensures chatbot stays above other content
- **Accessibility**: Proper ARIA labels and keyboard navigation

## File Structure

```
src/
├── components/
│   └── ConstitutionalChatbot.tsx    # Main chatbot component
├── services/
│   └── chatService.ts               # AI service and API integration
└── App.tsx                         # Main app with chatbot integration
```

## Testing

The chatbot includes:
- Demo mode for testing without API key
- Sample questions for immediate testing
- Responsive design testing across devices
- Error handling verification

## Deployment Notes

- Ensure `VITE_GEMINI_API_KEY` is set in production environment
- API key should be kept secure and not exposed in client-side code
- Consider implementing rate limiting for production use
- Monitor API usage to stay within Google AI Studio limits

## Future Enhancements

Potential improvements:
- Conversation persistence across sessions
- Multi-language support (Hindi, regional languages)
- Voice input/output integration
- Advanced constitutional search capabilities
- User progress tracking
- Integration with learning modules
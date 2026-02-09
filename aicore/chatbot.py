import os
import google.generativeai as genai

class Chatbot:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            print("Warning: GEMINI_API_KEY not set.")
        else:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-pro')

    async def get_response(self, message: str) -> str:
        if not self.api_key:
            return "Chatbot is not configured. Please check GEMINI_API_KEY."
        
        try:
            response = self.model.generate_content(message)
            return response.text
        except Exception as e:
            return f"Error: {str(e)}"

# Singleton instance
chatbot = Chatbot()

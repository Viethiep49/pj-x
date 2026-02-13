import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

class Chatbot:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.client = None
        
        if not self.api_key:
            print("Warning: GEMINI_API_KEY not set.")
        else:
            try:
                self.client = genai.Client(api_key=self.api_key)
            except Exception as e:
                 print(f"Error initializing Gemini client: {e}")

    async def get_response(self, message: str) -> str:
        if not self.client:
            return "Chatbot is not configured. Please check GEMINI_API_KEY."
        
        try:
            # Using standard model, can be updated to gemini-2.0-flash if available
            response = self.client.models.generate_content(
                model='gemini-2.0-flash', 
                contents=message
            )
            return response.text
        except Exception as e:
            return f"Error: {str(e)}"

# Singleton instance
chatbot = Chatbot()

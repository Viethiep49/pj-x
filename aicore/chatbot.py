import os
import google.generativeai as genai
from dotenv import load_dotenv

env_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(env_path)

SYSTEM_PROMPT = """Bạn là Pawsie 🐾 - AI tư vấn chuyên gia tại Pawsitive Pet Grooming SPA.
Bạn có kiến thức sâu về:
- Các dịch vụ grooming: tắm, sấy, cắt tỉa lông, vệ sinh tai/móng
- Chăm sóc thú cưng theo giống: chó (25 giống), mèo (12 giống) phổ biến
- Gợi ý sản phẩm phù hợp: thức ăn, đồ chơi, chuồng, áo quần, vệ sinh
- Lịch tiêm chủng vaccine cho chó và mèo
- Sức khỏe thú cưng cơ bản

Quy tắc giao tiếp:
- Trả lời thân thiện, ấm áp bằng ngôn ngữ của người hỏi (Việt hoặc Anh)
- Dùng emojis phù hợp 🐶🐱🐾
- Nếu được hỏi giá, hướng dẫn khách đặt lịch hoặc xem trang /services
- Không tư vấn y tế chuyên sâu — khuyên gặp bác sĩ thú y
- Giữ câu trả lời ngắn gọn, dưới 150 từ

Cửa hàng: Pawsitive Pet Grooming SPA | Hotline: 1900-PAWSIT | TP.HCM"""


class Chatbot:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.client_ready = False

        if not self.api_key:
            print("Warning: GEMINI_API_KEY not set.")
        else:
            try:
                genai.configure(api_key=self.api_key)
                self.model = genai.GenerativeModel(
                    model_name='gemini-2.5-flash',
                    system_instruction=SYSTEM_PROMPT
                )
                self.client_ready = True
            except Exception as e:
                print(f"Error initializing Gemini client: {e}")

    async def get_response(self, message: str) -> str:
        if not self.client_ready:
            return "🐾 Chatbot chưa được cấu hình. Vui lòng liên hệ hotline 1900-PAWSIT!"

        try:
            response = self.model.generate_content(message)
            return response.text
        except Exception as e:
            print(f"Gemini API Error: {e}")
            return f"Xin lỗi, tôi đang gặp sự cố. Vui lòng thử lại! 🐾"


# Singleton instance
chatbot = Chatbot()

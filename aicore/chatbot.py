import os
from google import genai
from google.genai import types
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

# Seeded Knowledge Base (Local FAQ) - Used when API key is missing or for common queries
KNOWLEDGE_BASE = [
    {
        "keywords": ["chào", "hi", "hello", "xin chào"],
        "response": "Gâu! Xin chào! Mình là Pawsie 🐾. Mình có thể giúp gì cho bạn trong việc chăm sóc và làm đẹp cho bé cưng hôm nay?"
    },
    {
        "keywords": ["đặt lịch", "booking", "hẹn", "tắm", "cắt tỉa"],
        "response": "Bạn muốn làm đẹp cho bé sao? Tuyệt quá! 🛁 Bạn hãy vào mục **'Dịch vụ'** trên ứng dụng để chọn gói spa phù hợp và đặt lịch hẹn nhé. Đội ngũ Pawsitive luôn sẵn sàng đón tiếp!"
    },
    {
        "keywords": ["bỏ ăn", "mệt mỏi", "nôn", "sức khỏe", "ốm", "bệnh"],
        "response": "Ôi không, bé có vẻ không khỏe sao? 😟 Dựa trên triệu chứng bạn mô tả, bé cún có thể đang gặp vấn đề về tiêu hóa hoặc cảm cúm. **Bạn nên đưa bé đến phòng khám thú y sớm để kiểm tra.** Bạn có thể đặt lịch khám tại Pawsitive để được bác sĩ hỗ trợ nhé! 🐾"
    },
    {
        "keywords": ["mèo con", "ăn gì", "dinh dưỡng", "nhanh lớn", "hạt"],
        "response": "Với mèo con mới về nhà, bạn nên chú trọng thực phẩm giàu Protein và Canxi. Pawsitive gợi ý dòng **Hạt Royal Canin Mother & Babycat** cực kỳ tốt cho hệ tiêu hóa. Bạn có thể ghé 'Cửa hàng' để mua ngay nhé! 🐱"
    },
    {
        "keywords": ["poodle", "thông minh", "giống chó"],
        "response": "Poodle là giống chó cực kỳ thông minh và đặc biệt là không rụng lông, rất phù hợp ở chung cư. Tuy nhiên, Poodle cần được chải lông hằng ngày để tránh bết rối. Đừng quên đặt lịch spa định kỳ cho bé tại Pawsitive nhé! 🐩"
    }
]

class Chatbot:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.client_ready = False

        if not self.api_key:
            print("Warning: GEMINI_API_KEY not set. Using local knowledge base only.")
        else:
            try:
                # Khởi tạo Client theo chuẩn mới
                self.client = genai.Client(api_key=self.api_key)
                self.client_ready = True
            except Exception as e:
                print(f"Error initializing Gemini client: {e}")

    async def get_response(self, message: str) -> str:
        # 1. Try local knowledge base
        message_lower = message.lower()
        for item in KNOWLEDGE_BASE:
            if any(key in message_lower for key in item["keywords"]):
                return item["response"]

        # 2. Try Gemini AI if ready
        if self.client_ready:
            try:
                # Gọi API kiểu mới, đẩy system_instruction vào config
                response = self.client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=message,
                    config=types.GenerateContentConfig(
                        system_instruction=SYSTEM_PROMPT
                    )
                )
                return response.text
            except Exception as e:
                print(f"Gemini API Error: {e}")
                return "Xin lỗi, tôi đang gặp sự cố kết nối AI. Hãy thử hỏi mình về 'đặt lịch' hoặc 'sức khỏe' nhé! 🐾"

        # 3. Final Default Fallback
        return "🐾 Hiện tại mình đang hoạt động ở chế độ ngoại tuyến. Bạn có thể hỏi mình về: đặt lịch hẹn, chăm sóc sức khỏe, hoặc dinh dưỡng cho mèo con nhé!"

# Singleton instance
chatbot = Chatbot()

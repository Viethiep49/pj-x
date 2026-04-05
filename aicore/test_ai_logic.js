import axios from 'axios';

const API_URL = "http://localhost:8000/api/ai/chat";

async function testChat() {
    console.log("🤖 Testing AI Chatbot Logic...");
    try {
        const res = await axios.post(API_URL, { message: "Chào bạn, bé poodle của tôi bị bỏ ăn" });
        if (res.status) {
            console.log("✅ Chatbot Response received!");
            console.log("   💬 Reply:", res.data.response);
            console.log("\n✨ AI Core Logic: SUCCESS");
        } else {
            console.log(`❌ Error: Status Code ${res.status}`);
        }
    } catch (err) {
        console.log(`❌ Connection Error: ${err.message}`);
        console.log("   Hint: Is AI Core running on port 8000?");
    }
}

testChat();

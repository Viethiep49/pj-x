export const aiKnowledgeBase = [
    {
        keywords: ['bỏ ăn', 'mệt mỏi', 'nôn', 'sức khỏe', 'ốm'],
        response: "Chào bạn, dựa trên triệu chứng bạn mô tả, bé cún có thể đang gặp vấn đề về tiêu hóa hoặc dấu hiệu của cảm cúm. **Bạn nên đưa bé đến phòng khám thú y sớm để kiểm tra.** Bạn có thể chủ động đặt lịch khám nhanh tại mục 'Dịch vụ' của Pawsitive để được hỗ trợ tốt nhất nhé! 🐾"
    },
    {
        keywords: ['mèo con', 'ăn gì', 'dinh dưỡng', 'nhanh lớn', 'hạt'],
        response: "Với mèo con mới về nhà, bạn nên chú trọng thực phẩm giàu Protein và Canxi để phát triển xương. Pawsitive hiện có sẵn dòng **Hạt Royal Canin Mother & Babycat** cực kỳ dễ tiêu hóa và đầy đủ dưỡng chất. Bạn có thể ghé qua 'Cửa hàng' của app để đặt mua ngay cho bé nhé! 🐱"
    },
    {
        keywords: ['poodle', 'dễ nuôi', 'thông minh', 'giống chó'],
        response: "Poodle là giống chó cực kỳ thông minh và đặc biệt là không rụng lông, rất phù hợp với các bạn ở chung cư. Tuy nhiên, Poodle cần được chải lông hằng ngày để tránh bết rối. Bạn có thể tra cứu thêm các mẹo chăm sóc Poodle chuyên sâu trong mục 'Cẩm nang' của chúng mình. 🐩"
    }
];

export const getMockAIResponse = (message) => {
    const defaultResponse = "Pawsitive AI đang học hỏi thêm về chủ đề này. Hiện tại mình có thể tư vấn tốt nhất về: Sức khỏe (bỏ ăn/mệt mỏi), Dinh dưỡng mèo con, hoặc Đặc điểm giống chó Poodle. Bạn hãy thử hỏi mình nhé! ✨";
    
    if (!message) return defaultResponse;

    const lowerMsg = message.toLowerCase();
    
    // Find the best matching scenario based on keywords
    const match = aiKnowledgeBase.find(item => 
        item.keywords.some(keyword => lowerMsg.includes(keyword))
    );

    return match ? match.response : defaultResponse;
};

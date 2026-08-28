import knowledgeBase from "./data/chatKnowledge.json";

export const chatFlow = {
  fallback: knowledgeBase.fallback.summary || knowledgeBase.fallback,

  getResponse(message) {
    if (!message) return this.fallback;

    const text = message.toLowerCase();

    // Build dynamic intent map from keywords in JSON
    const intentMap = Object.entries(knowledgeBase).reduce((map, [key, value]) => {
      if (value && typeof value === "object" && Array.isArray(value.keywords)) {
        map[key] = value.keywords.map(k => k.toLowerCase());
      }
      return map;
    }, {});

    // Try keyword-based intent detection
    const matchedIntent = Object.entries(intentMap).find(([intent, keywords]) =>
      keywords.some(word => text.includes(word))
    );

    if (!matchedIntent) {
      return this.fallback;
    }

    const [intent] = matchedIntent;
    const data = knowledgeBase[intent];

    // If category is structured, build a readable response
    if (typeof data === "object") {
      let response = "";

      if (data.title) response += `**${data.title}**\n\n`;
      if (data.summary) response += `${data.summary}\n\n`;

      if (Array.isArray(data.details) && data.details.length > 0) {
        response += `Here are some key points:\n`;
        data.details.forEach(item => {
          response += `• ${item}\n`;
        });
        response += `\n`;
      }

      if (Array.isArray(data.faq) && data.faq.length > 0) {
        response += `Common questions:\n`;
        data.faq.forEach(f => {
          response += `Q: ${f.q}\nA: ${f.a}\n\n`;
        });
      }

      return response.trim();
    }

    // Fallback for legacy string-based entries
    return data || this.fallback;
  }
};

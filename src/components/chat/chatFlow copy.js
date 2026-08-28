// src/components/chat/chatFlow.js
import knowledgeBase from './data/chatKnowledge.json';

export const chatFlow = {
  fallback: knowledgeBase.fallback,

  getResponse: (message) => {
    if (!message) return knowledgeBase.fallback;

    const text = message.toLowerCase();

    const intentMap = {
      hello: ["hi", "hello", "hey"],
      services: ["service", "services", "offer", "provide"],
      security: ["security", "secure", "firewall", "cyber"],
      monitoring: ["monitor", "monitoring", "uptime", "performance"],
      pricing: ["price", "pricing", "cost", "plans"],
      assessment: ["assessment", "audit", "health check"],
      contact: ["contact", "email", "phone", "call"],
      emergency: ["emergency", "urgent", "down", "critical"],
      response: ["response", "sla", "time", "speed"],
      about: ["about", "Syncline it", "dedicated partner", "professional-grade", "infrastructure architect"],
      service_area: ["area", "locations", "vic", "victoria", "coverage", "map", "local it support"],
      custom_it: ["custom", "custom solutions", "bespoke", "tailored", "specialized"]
    };

    // Find first matching intent
    const matchedIntent = Object.entries(intentMap).find(([_, keywords]) =>
      keywords.some(word => text.includes(word))
    );

    if (matchedIntent) {
      const [intent] = matchedIntent;
      return knowledgeBase[intent] || knowledgeBase.fallback;
    }

    return knowledgeBase.fallback;
  }
};

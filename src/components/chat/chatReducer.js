// src/components/chat/chatReducer.js

export const initialState = {
  messages: [
    {
      id: `init-${Date.now()}`,
      type: "bot",
      text: "Welcome to Syncline IT Solutions! I can help you with services, security, monitoring, or contacting our team.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ],
  showNamePrompt: true,
  userName: "",
  userEmailOrPhone: "",
  showContactPrompt: false,
  isTyping: false,
};

export const chatReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER_NAME_INPUT":
      return { ...state, userName: action.payload };

    case "SET_USER_NAME":
      return { 
        ...state, 
        showNamePrompt: false, 
        userName: action.payload, 
        showContactPrompt: true 
      };

    case "SET_USER_CONTACT_INPUT":
      return { ...state, userEmailOrPhone: action.payload };

    case "SET_USER_CONTACT":
      return { 
        ...state, 
        userEmailOrPhone: action.payload, 
        showContactPrompt: false 
      };

    case "USER_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: `${Date.now()}-${Math.random()}`,
            type: "user",
            text: action.payload,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };

    case "BOT_MESSAGE":
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: `${Date.now()}-${Math.random()}`,
            type: "bot",
            text: action.payload,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ],
      };

    case "SET_TYPING":
      return { ...state, isTyping: action.payload };

    case "RESET_CHAT":
      return initialState;

    default:
      return state;
  }
};

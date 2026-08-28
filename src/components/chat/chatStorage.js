const STORAGE_KEY = 'syncline_chat_session';

export const saveChatSession = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save chat:', err);
  }
};

export const loadChatSession = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error('Failed to load chat:', err);
    return null;
  }
};
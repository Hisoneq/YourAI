import { useState } from 'react';

export const useChatState = () => {
  const [isChatStarted, setIsChatStarted] = useState(false);

  const startChat = () => setIsChatStarted(true);

  return {
    isChatStarted,
    startChat,
  };
};
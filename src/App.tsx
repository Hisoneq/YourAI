import GlassBackground from './components/GlassBackground';
import ChatTitle from './components/ChatTitle';
import Input from './components/Input';
import QuickPrompts from './components/QuickPrompts';
import ChatWindow from './components/ChatWindow';
import { useChatState } from './hooks/useChatState';

function App() {
  const { isChatStarted, startChat } = useChatState();

  return (
    <GlassBackground>
      <ChatTitle isVisible={!isChatStarted} />

      {isChatStarted && <ChatWindow />}

      <QuickPrompts onPromptSelect={startChat} isVisible={!isChatStarted} />

      <Input onSendMessage={startChat} />
    </GlassBackground>
  );
}

export default App;

import GlassBackground from './components/GlassBackground';
import ChatTitle from './components/ChatTitle';
import Input from './components/Input';
import QuickPrompts from './components/QuickPrompts';
import ChatWindow from './components/ChatWindow';
import { useChatState } from './hooks/useChatState'

function App() {
  const { isChatStarted, startChat } = useChatState();

  return (
    <GlassBackground>
      {!isChatStarted && <ChatTitle />}
      <ChatWindow />
      {!isChatStarted && <QuickPrompts onPromptSelect={startChat} />}
      <Input onSendMessage={startChat} />
    </GlassBackground>
  );
}

export default App;

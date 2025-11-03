import GlassBackground from './components/GlassBackground';
import ChatTitle from './components/ChatTitle';
import Input from './components/Input';
import QuickPrompts from './components/QuickPrompts';
import ChatWindow from './components/ChatWindow';

function App() {
  return (
    <GlassBackground>
      <ChatTitle />
      <ChatWindow />
      <QuickPrompts />
      <Input />
    </GlassBackground>
  );
}

export default App;

import GlassBackground from './components/GlassBackground';
import ChatTitle from './components/ChatTitle';
import Input from './components/Input';
import QuickPrompts from './components/QuickPrompts';

function App() {
  return (
    <GlassBackground>
      <ChatTitle />
      <QuickPrompts />
      <Input />
    </GlassBackground>
  );
}

export default App;

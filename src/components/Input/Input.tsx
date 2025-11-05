import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setInputValue, clearInputValue } from '../../store/slices/inputSlice';
import { addMessage, setLoading } from '../../store/slices/messagesSlice';
import { sendMessageToAI } from '../../utilits/api';
import styles from './Input.module.css';

const SendIcon = () => (
  <svg 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    style={{ transform: 'translate(-1px, 1px)' }}
  >
    <path 
      d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

interface InputProps {
  onSendMessage?: () => void;
  onNewChat?: () => void;
}

const Input = ({ onSendMessage}: InputProps) => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.input.value);
  const isLoading = useAppSelector((state) => state.messages.isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleSend = async () => {
    if (value.trim() !== '' && !isLoading) {
      const userMessage = value;
      
      // Добавляем user message в store
      dispatch(addMessage({ role: 'user', content: userMessage }));
      dispatch(clearInputValue());
      onSendMessage?.();
      
      // Ставим loading
      dispatch(setLoading(true));

      try {
        const response = await sendMessageToAI(userMessage);
        
        // Добавляем AI response в store
        dispatch(addMessage({ role: 'assistant', content: response }));
      } catch (error) {
        console.error('Ошибка:', error);
        dispatch(addMessage({ 
          role: 'assistant', 
          content: 'Sorry, something went wrong. Please try again.' 
        }));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '' && !isLoading) {
      handleSend();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputWrapper}>
        <input 
          type="text" 
          placeholder="Ask me anything..."
          className={styles.input}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button 
          className={styles.sendButton} 
          aria-label="Send message" 
          onClick={handleSend}
          disabled={isLoading}
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Input;

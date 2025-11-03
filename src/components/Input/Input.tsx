import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { setInputValue, clearInputValue } from '../../store/slices/inputSlice';
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

const Input = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.input.value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setInputValue(e.target.value));
  };

  const handleSend = () => {
    if (value.trim() !== '') {
      console.log(value);
      dispatch(clearInputValue());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim() !== '') {
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
        />
        <button className={styles.sendButton} aria-label="Send message" onClick={handleSend}>
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default Input;

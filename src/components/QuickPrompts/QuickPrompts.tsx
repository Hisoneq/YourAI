import { useAppDispatch } from '../../hooks/useRedux';
import { setInputValue } from '../../store/slices/inputSlice';
import styles from './QuickPrompts.module.css';

const prompts = [
  "What can I ask you to do?",
  "Which one of my projects is performing the best?",
  "What projects should I be concerned about right now?"
];

export default function QuickPrompts() {
  const dispatch = useAppDispatch();

  const handleClick = (prompt: string) => {
    dispatch(setInputValue(prompt));
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>
        Suggestions on what to ask Our AI
      </p>
      
      <div className={styles.promptsGrid}>
        {prompts.map((prompt, index) => (
          <button
            onClick={() => handleClick(prompt)}
            key={index} 
            className={styles.promptCard}
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
}
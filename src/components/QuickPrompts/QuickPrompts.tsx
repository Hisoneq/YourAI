import { useAppDispatch } from '../../hooks/useRedux';
import { setInputValue } from '../../store/slices/inputSlice';
import styles from './QuickPrompts.module.css';

const prompts = [
  "Write a Python script for data analysis",
  "Plan a weekend trip itinerary", 
  "Explain AI to a beginner"
];

interface QuickPromptsProps {
  isVisible?: boolean;
}

export default function QuickPrompts({isVisible = true }: QuickPromptsProps) {
  const dispatch = useAppDispatch();

  const handleClick = (prompt: string) => {
    dispatch(setInputValue(prompt));
  };

  return (
    <div className={`${styles.container} ${!isVisible ? styles.hidden : ''}`}>
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
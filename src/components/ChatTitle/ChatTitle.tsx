import styles from './ChatTitle.module.css';

const SparkleIcon = ({ className }: { className: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" 
      fill="currentColor"
    />
  </svg>
);

interface ChatTitleProps {
  isVisible?: boolean;
}

const ChatTitle = ({ isVisible = true }: ChatTitleProps) => {
  return (
    <div className={`${styles.container} ${!isVisible ? styles.hidden : ''}`}>
      <div className={styles.sparkleGroup}>
        <SparkleIcon className={styles.sparkle1} />
        <SparkleIcon className={styles.sparkle2} />
        <SparkleIcon className={styles.sparkle3} />
      </div>
      
      <h1 className={styles.title}>
        Ask our AI anything
      </h1>
    </div>
  );
};

export default ChatTitle;


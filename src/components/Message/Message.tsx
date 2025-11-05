import type { Message as MessageType } from '../../store/slices/messagesSlice';
import styles from './Message.module.css';

interface MessageProps {
  message: MessageType;
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`${styles.message} ${isUser ? styles.user : styles.assistant}`}>
      <p className={styles.content}>{message.content}</p>
    </div>
  );
};

export default Message;


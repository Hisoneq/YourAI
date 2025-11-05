import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../hooks/useRedux';
import Message from '../Message/Message';
import styles from './ChatWindow.module.css';

const TypingIndicator = () => (
  <div className={styles.typingIndicator}>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
    <span className={styles.dot}></span>
  </div>
);

const ChatWindow = () => {
  const messages = useAppSelector((state) => state.messages.messages);
  const isLoading = useAppSelector((state) => state.messages.isLoading);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [messages.length, isLoading]);

  return (
    <div className={styles.container}>
      <div className={styles.messagesWrapper} ref={containerRef}>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        
        {isLoading && <TypingIndicator />}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;

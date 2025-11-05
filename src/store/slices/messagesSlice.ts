import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

interface MessagesState {
  messages: Message[];
  isLoading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  isLoading: false,
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Omit<Message, 'id' | 'timestamp'>>) => {
      const newMessage: Message = {
        ...action.payload,
        id: Date.now().toString() + Math.random(),
        timestamp: Date.now(),
      };
      state.messages.push(newMessage);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
});

export const { addMessage, setLoading, clearMessages } = messagesSlice.actions;
export default messagesSlice.reducer;


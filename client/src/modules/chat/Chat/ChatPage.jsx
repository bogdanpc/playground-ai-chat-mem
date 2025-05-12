import { useState, useRef, useEffect } from 'react';
import Messages from './Messages';
import { streamEvents } from '@/api/client';
import "./styles.css";
import ChatForm from './ChatForm';
import Wait from './Wait';
import Greetings from './Greetings';

const Chatbot = () => {
  const [isStreaming, setIsStreaming] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const [chatId, setChatId] = useState(null);

  useEffect(() => {
    setChatId(Math.random() + Date.now().toString());
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  const addMessage = (sender, text, isComplete = true) => {
    const newMessage = {
      id: "c_" + Math.random() + Date.now().toString(),
      sender,
      content: text,
      timestamp: new Date().toISOString(),
      isComplete
    };

    setMessages(prev => {
      const updatedMessages = [...prev, newMessage];
      return updatedMessages;
    });

    return newMessage.id;
  };


  const handleSendMessage = (message) => {
    addMessage('user', message.text);
    streamResponse(message.text);
  };

  const updateMessage = (id, data) => {

    setMessages((prev) => {
      if (data.type === "delta") {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg && lastMsg.type === "delta") {
          return [
            ...prev.slice(0, -1),
            { ...lastMsg, content: lastMsg.content + data.content, sender: 'assistant' },
          ];
        }
        return [...prev, { sender: 'assistant', ...data }];
      }
      return [...prev, { sender: 'assistant', ...data }];
    });
  };

  const streamResponse = async (query) => {
    setIsStreaming(true);


    streamEvents('chat',
      {
        body: { id: chatId, assistant: "assistant", query },
        messageId: chatId,
        onMessage: updateMessage,
        onComplete: () => setIsStreaming(false)
      });

  };

  return (
    <div className="relative flex flex-col flex-1 overflow-hidden">
      {messages.length === 0 && <Greetings />}
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 pb-32">
          <Messages messages={messages} isStreaming={isStreaming} />
          <div ref={messagesEndRef} />
        </div>

      </div>
      {isStreaming && <Wait />}
      <ChatForm onSubmit={handleSendMessage} bottom={messages.length !== 0}/>
    </div>
  );
};

export default Chatbot;
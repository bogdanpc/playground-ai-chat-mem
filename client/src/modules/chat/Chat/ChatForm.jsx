import { useState, useRef, useEffect } from 'react';
import SendIcon from '@/assets/icons/send.svg?react';
import ModelsDropdown from './ModelsDropdown';

const ChatForm = ({ onSubmit, isLoading, bottom = false }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
    

    autoResizeTextarea();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    const message = {
      text: input,
    };
    
    onSubmit(message);
    setInput('');
    
    setTimeout(autoResizeTextarea, 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    setTimeout(autoResizeTextarea, 0);
  };

  return (
    <div className={`w-full ${bottom ? 'fixed bottom-0 left-0 right-0' : ''} z-1 pb-4 pt-2 shadow-lg`}>
      <div className="container mx-auto px-4">
        <form ref={formRef} onSubmit={handleSubmit} className="w-full">
          <div className="w-full max-w-4xl mx-auto rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="flex flex-col p-3">
              <div className="flex-1 rounded-xl border border-base-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-colors">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  placeholder="Message AI assistant..."
                  rows="1"
                  disabled={isLoading}
                  className="flex-1 px-4 py-3 bg-transparent border-none rounded-xl resize-none focus:outline-none w-full min-h-12 max-h-48"
                />
              </div>
              <div className="flex justify-between">
                <div />
                <div className="flex gap-2">
                  <ModelsDropdown />
                
                <button
                  type="submit"
                  className="btn btn-sm btn-circle btn-primary"
                  title="Send message"
                  disabled={isLoading || input.trim() === ''}
                >
                  <SendIcon />
                </button>
              </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatForm;
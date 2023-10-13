import React from 'react';
import ChatBot from 'react-simple-chatbot';
import './chatbot.css';

const Chatbot = () => {
  const steps = [
    {
      id: '0',
      message: 'Hey there! How can I help you today?',
      trigger: '1',
    },
    {
      id: '1',
      user: true,
      trigger: '2',
    },
    {
      id: '2',
      message: 'Im happy to help! What would you like to do today?',
      trigger: '3',
    },
    {
      id: '3',
      user: true,
      end: true,
    },
  ];

  const [isOpen, setIsOpen] = React.useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="chatbot-button" onClick={toggleChatbot}>Open Chatbot</button>
      {isOpen && <ChatBot steps={steps} />}
    </div>
  );
};

export default Chatbot;

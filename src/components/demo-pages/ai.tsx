import React, { useState } from 'react';
import { BreadcrumbProps } from 'antd';
import BasePageContainer from '../layout/PageContainer';
import { webRoutes } from '../../routes/web';
import { Link } from 'react-router-dom';
import { FaRobot } from 'react-icons/fa';
import packageJson from '../../../package.json';

const breadcrumb: BreadcrumbProps = {
  items: [
    {
      key: webRoutes.dashboard,
      title: <Link to={webRoutes.dashboard}>Home</Link>,
    },
    {
      key: webRoutes.chatbot,
      title: <Link to={webRoutes.chatbot}>AI Chatbot</Link>,
    },
  ],
};

const Chatbot: React.FC = () => {
  const packageVersion = packageJson.version;
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    if (input.trim()) {
      // Add user message
      setMessages([...messages, `User: ${input}`]);

      // Simulate AI response
      const aiResponse = `AI: You said "${input}". How can I assist you further?`;
      setMessages([...messages, `User: ${input}`, aiResponse]);

      // Clear input field
      setInput('');
    }
  };

  return (
    <BasePageContainer breadcrumb={breadcrumb}>
      <div className="m-5">
        <article>
          <header className="mb-9 space-y-1">
            <h1 className="font-display text-3xl tracking-tight text-slate-900">
              AI Chatbot
            </h1>
          </header>
          <div className="chat-container">
            <div className="mb-4 p-4 border border-slate-200 rounded-lg h-80 overflow-y-auto">
              {messages.map((message, index) => (
                <p key={index} className="text-sm text-slate-700">{message}</p>
              ))}
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="border border-slate-300 rounded-lg p-2 flex-grow"
              />
              <button
                onClick={handleSend}
                className="ml-2 bg-primary text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </article>
      </div>
    </BasePageContainer>
  );
};

export default Chatbot;

import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import ReactEmoji from 'react-emoji';
import '../../styles/components/message.less';

export interface MessageInterface {
  name: string;
  message: string;
  date: string;
}

const Message: React.FC<{ messages: Array<MessageInterface>, userName: string }> = ({ messages, userName }) => {


  const renderMessage = (message: MessageInterface, idx: number) => {
    return (
      <div key={`message-data-${idx}`}>
        {
          userName === message.name
            ? (
              <div className="messageContainer justifyEnd">
                <p className="sentText pr-10">{message.name}</p>
                <div className="messageBox backgroundBlue">
                  <p className="messageText colorWhite">{ReactEmoji.emojify(message.message)}</p>
                </div>
              </div>
            )
            : (
              <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                  <p className="messageText colorDark">{ReactEmoji.emojify(message.message)}</p>
                </div>
                <p className="sentText pl-10 ">{message.name}</p>
              </div>
            )
        }
      </div>
    )
  }
  return (
    <ScrollToBottom className="messages">
      {messages.map(renderMessage)}
    </ScrollToBottom>
  );
};

export default Message;
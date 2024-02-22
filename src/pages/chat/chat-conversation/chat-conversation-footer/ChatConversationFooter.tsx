import React, { useContext, useEffect, useRef, useState } from "react";
import "./ChatConversationFooterStyle.css";
import { chatSocketContext } from "../../../../contexts/sockets";
import ChatContext, { ChatContextType } from "../../ChatContext";
import ConnectedContext from "../../../../ConnectedContext";

interface ChatConversationFooterProps {
  handleMessage: (data: any) => void; // Define the type of handleMessage if possible
}

const ChatConversationFooter: React.FC<ChatConversationFooterProps> = ({ handleMessage }) => {
  const { selectedChat, setSelectedChat } = useContext(ChatContext) as ChatContextType;
  const chatSocket = useContext(chatSocketContext);
  // TODO: USE IT TO HANDLE THE MESSAGE BEFORE SEND IT TO DATBASE
  const [textMessage, setTextMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { connectedUser } = useContext(ConnectedContext);

  const handleSendMessage = (text: string) => {
    const trimmedText = text.trim();
    if (trimmedText === "") return;
    setTextMessage(trimmedText);
    // const data = {
    //   userType: "sender",
    //   username: "Oualid Oulmyr",
    //   timestamp: new Date().toISOString(),
    //   message: textMessage,
    //   image: "./images/avatars/member_1.png",
    // };

    console.log( 'friend_id', selectedChat?.friend_id)
    chatSocket.emit('sendMESSAGE', {
      senderId: connectedUser?.id,
      senderName: connectedUser?.username,
      receiverId: selectedChat?.friend_id || selectedChat?.group_id,
      readed: false,
      message: textMessage, // TODO: hadi kant data.message
      isRoom: selectedChat?.type === "users" ? false : true
  })

    // handleMessage(data);
    console.log("message", textMessage);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  return (
    <div className="chat-conversation-footer">
      <div className="chat-conversation-footer-icon"></div>
      <textarea
        ref={textareaRef}
        name="chat-conversation-footer-input"
        id=""
        className="chat-conversation-footer-input scrollbar"
        placeholder="Enter you message here"
        onChange={(e) => setTextMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSendMessage((e.target as HTMLTextAreaElement).value);
          }
        }}
      />

      <button
        type="button"
        onClick={(e) => {
          // TODO: hadi 7ta hia tzadt
          if (textareaRef.current) {
            handleSendMessage(textareaRef.current.value)}
          }
        }
        className="button"
      >
        Send <i className="fa-solid fa-paper-plane"></i>
      </button>
    </div>
  );
};

export default ChatConversationFooter;

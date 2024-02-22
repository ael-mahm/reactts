import React, { useContext, useEffect, useState } from "react";
import ChatConversationBody from "./chat-conversation-body/ChatConversationBody";
import ChatConversationHeader from "./chat-conversation-Header/ChatConversationHeader";
import ChatConversationFooter from "./chat-conversation-footer/ChatConversationFooter";
import NoConversaationSelected from "./no-conversation-selected/NoConversaationSelected";
import ChatContext from "../ChatContext";
import { chatSocketContext } from "../../../contexts/sockets";
import ConnectedContext from "../../../ConnectedContext";
import { toast } from "react-toastify";
import "./ChatConversationStyle.css";


const ChatConversation: React.FC<any> = ({ chatMessages, conversationInfos, isBanned, isMuted, setChatData}) => {
  const { selectedChat, setSelectedChat, lastMessage, setLastMessage } = useContext(ChatContext) ?? {}; // TODO: more checks
  const chatSocket = useContext(chatSocketContext);
  const type = "person";
  const [messages, setMessages] = useState<any>(null);
  const [newMessages, setNewMessages] = useState<any>(null);
  const { connectedUser } = useContext(ConnectedContext);

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  useEffect(() => {
    chatSocket.on("newMESSAGE", (newMessage) => {
      const data = {
        userType: newMessage.senderId === connectedUser?.id ? 'sender' : 'receiver', 
        username: newMessage.senderName, 
        timestamp: newMessage.timestamp, 
        message: newMessage.message, 
        image: newMessage.senderImage,
        senderId: newMessage.senderId, // TODO: hadi khasseha tzad 3la 7sab ts
        receiverId: newMessage?.receiverId,
        isRoom: newMessage.isRoom
      }
      // console.log('new Message:', newMessage);
      setNewMessages(data);
      if (newMessage.isRoom){
        console.log('isRoom:', newMessage.isRoom)
        if (setLastMessage) {
          setLastMessage({message: data.message, groupId: newMessage.receiverId });
        }
      } else {
        if (setLastMessage) {
          setLastMessage({message: data.message, friendId: connectedUser?.id === newMessage.senderId ? newMessage.receiverId : newMessage.senderId  });
        }
      }
    });


    chatSocket.on('newMESSAGE_ERROR', (newMessageError) => {
      
    });
  }, []) // TODO: hna kant chatSocket

  useEffect(() => {
    const handleYouAreMuted = (roomWhereYouMuted: any) => {
      if (selectedChat?.group_id){
        if ((selectedChat?.group_id === roomWhereYouMuted?.roomId)) {
          setChatData((prevValue: any) => ({...prevValue, isMuted: true}))
          toast.info('You are muted in this room!');
        }
      }
    }

    const handleYouAreUnMuted = (roomWhereYouMuted: any) => {
      if (selectedChat?.group_id){
        if ((selectedChat?.group_id === roomWhereYouMuted?.roomId)) {
          setChatData((prevValue: any) => ({...prevValue, isMuted: false}))
          toast.info('You are unmuted in this room!');
        }
      }
    }
    chatSocket.on('youAreMuted', handleYouAreMuted);
    chatSocket.on('youAreUnMuted', handleYouAreUnMuted);

    // Cleanup function to remove the event listener
    return () => {
      chatSocket.off('youAreMuted', handleYouAreMuted);
      chatSocket.off('youAreUnMuted', handleYouAreUnMuted);
    };
  }, [selectedChat, chatSocket]);
  
  useEffect(() => {
    console.log('selected chat :', selectedChat);
    if (selectedChat && newMessages) {
      
      console.log('new Message => ', newMessages);
      if (selectedChat?.friend_id){
        if ((selectedChat?.friend_id === newMessages?.senderId || selectedChat?.user_id === newMessages?.senderId) && newMessages.isRoom === false) handleMessage(newMessages);
      }
      if (selectedChat?.group_id){
        console.log(selectedChat?.group_id, ":" ,newMessages?.receiverId)
        if ((selectedChat?.group_id === newMessages?.receiverId || selectedChat?.user_id === newMessages?.senderId) && newMessages.isRoom === true) handleMessage(newMessages);
      }
      }
  }, [newMessages]); // TODO: kant whad selectedChat hna

  const handleMessage = (data: any) => {
    setMessages((previousMessages: any) => {
      console.log("previousMessages", previousMessages);
      if (previousMessages) return [...previousMessages, data];
    });
  };


  return (
    <div
      className={`chat-conversation ${
        type === "person"
          ? "chat-conversation-person"
          : "chat-conversation-group"
      }`}
    >
      
      <div className="chat-conversation-content">
      {!selectedChat && <NoConversaationSelected message="No conversation has been selected yet" />}
      {selectedChat && (<><ChatConversationHeader conversationInfos={conversationInfos} selectedChat={selectedChat /* TODO: we romve this setSelectedChat={setSelectedChat} kant bara had l curly brackts*/} /> 
        <ChatConversationBody messages={messages} />
        {isMuted && <div className=" banned-muted-user">You are muted for the moment</div>}

        { ((!isBanned  && !isMuted) ) && <ChatConversationFooter handleMessage={handleMessage} />}</>)}
        
      </div>
    </div>
  );
};

export default ChatConversation;

import React, { useEffect, useState, useContext } from "react";
import useFetch from "../../utils/custom-hooks/useFetch";
import ChatConversation from "./chat-conversation/ChatConversation";
import ChatSidebar from "./chat-sidebar/ChatSidebar";
import ChatContext from "./ChatContext";
import ConnectedContext from '../../ConnectedContext';
import { useParams } from "react-router-dom";
import "./ChatStyle.css";

interface SelectedChat {
  user_id: string | undefined;
  friend_id?: string;
  group_id?: string;
  type: 'users' | 'groups';
}

interface ChatData {
  chatMessages: any[]; // checks
  conversationInfos: any; // checks
  isBanned: boolean;
  isMuted: boolean;
}

const Chat = () => {

const { connectedUser } = useContext(ConnectedContext);
  const [selectedChat, setSelectedChat] = useState<SelectedChat | null>(null);
  const [lastMessage, setLastMessage] = useState<any>(null);
  const [chatData, setChatData] = useState<ChatData | null>(null)
  const [url, setUrl] = useState<string | null>(null);
  const [dependency, setDependency] = useState(null);

  const {id} = useParams();
  useEffect(() => {
    if (id) {
      const friend_id = id;
      setSelectedChat(prevValue => {return {user_id: connectedUser?.id, friend_id, type: 'users'}})
    }
  }, [id]); // hadi khasseha tzad wa9ila , connectedUser?.id

  useEffect(() => {
    if (selectedChat !== null) {
      if (selectedChat?.type === "users") {
        setUrl(`http://localhost:3001/messages/conversation/${selectedChat?.user_id}/${selectedChat?.friend_id}`
        );
      }
      if (selectedChat?.type === "groups") {
        setUrl(`http://localhost:3001/room/messages/${selectedChat?.user_id}/${selectedChat?.group_id}`);

        // TODO: HERE YOU HAVE TO HANDLE THE MUTED AND BANNED MEMBERS LOGIC
      }
    }
  }, [selectedChat]);


  
  
  const { loading, error, value } = useFetch(url, {}, [url]);
  useEffect(() => {

    if (value) {
      setChatData(value)
      console.log('valuee =>', value)}
  }, [url, value])
  return (
    <section className="chat">
      <div className="container">
        <div className="chat-content">
          <ChatContext.Provider value={{ selectedChat, setSelectedChat, lastMessage, setLastMessage }}>
            <ChatSidebar />
              <ChatConversation
                chatMessages={chatData?.chatMessages}
                conversationInfos={chatData?.conversationInfos}
                isBanned={chatData?.isBanned}
                isMuted={chatData?.isMuted}
                setChatData={setChatData}
              />
          </ChatContext.Provider>
        </div>
      </div>
    </section>
  );
};

export default Chat;

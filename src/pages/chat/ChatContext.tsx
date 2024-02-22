import React, { createContext } from "react";

export interface SelectedChat {
    user_id: string | undefined;
    friend_id?: string;
    group_id?: string;
    type: 'users' | 'groups';
}

export interface ChatContextType {
    selectedChat: SelectedChat | null;
    setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
    lastMessage: any; // Define the type of lastMessage if possible
    setLastMessage: React.Dispatch<React.SetStateAction<any>>; // Define the type of setLastMessage if possible
}

const ChatContext = createContext<ChatContextType | null>(null);

export default ChatContext;

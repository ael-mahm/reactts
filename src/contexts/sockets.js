import io from "socket.io-client"
import React from "react";


const userId = 'clsnkyxvr0000uu70vkkepknr';
const chatSocket = io("http://localhost:3001/chat", {
    transportOptions: {
      polling: {
        extraHeaders: {
          'authorization': userId,
        },
      },
    },
  })

export const chatSocketContext = React.createContext(chatSocket);
import io from "socket.io-client"
import React from "react";


const userId = 'clsyxjc6b0000uur8ruivmy4l';
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
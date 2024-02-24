import { createContext, useEffect, useState } from "react";

import useLocalStorage from './utils/custom-hooks/useLocalStorage';

const ConnectedContext = createContext();

export function ConnectedProvider({ children }) {

  /*
  // IF THE JWT CONTAINS JUST THE ID, NOT ALL THE USER DATA
  useEffect(() => {
    // FETCH USER DATA
    setConnectedUser(userData)
  }, [])


  // IF YOU WANT TO UPDATE THE DATA USER
  useEffect(() => {
    // REQUEST UPDATE THE DATA
    fetch('url', ).then()

  }, [connectedUser])
  */

  const [connectedUser, setConnectedUser] = useLocalStorage("connected-user", {
    id: "clsyxjc6b0000uur8ruivmy4l",
    username: "abdo",
    user_status: "online",
    fullname:'John Doe',
    email:'john@mail.com',
    img: 'https://unsplash.com/photos/smiling-man-standing-near-green-tree-MTZTGvDsHFY',
    is_2fa: false,
  });


  return (
    <ConnectedContext.Provider value={{ connectedUser, setConnectedUser }}>
      {children}
    </ConnectedContext.Provider>
  );
}

export default ConnectedContext;

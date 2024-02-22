import { createContext, useEffect, useState } from "react";
import useWindowSize from "./utils/custom-hooks/useWindowSize";


const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalData, setModalData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalJustOpened, setModalJustOpened] = useState(false);
  const [modalConfirmation, setModalConfirmation] = useState(false);
  const [modalParams, setModalParams] = useState([])

  useEffect(() => {
    if(modalOpen) {
      document.body.style.height = '100vh'
      document.body.style.overflowY = 'hidden'
    };
    if(!modalOpen){
      document.body.style.height = 'auto'
      document.body.style.overflow = 'visible'
    };
    setModalJustOpened(true);
  }, [modalOpen]);


  return (
    <ModalContext.Provider
      value={{
        modalData,
        setModalData,
        modalOpen,
        setModalOpen,
        modalJustOpened,
        setModalJustOpened,
        modalConfirmation,
        setModalConfirmation,
        modalParams,
        setModalParams
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export default ModalContext;

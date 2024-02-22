import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/main.css";

import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Homepage from "./pages/homepage/Homepage";
import Profile from "./pages/profile/Profile";
import Chat from "./pages/chat/Chat";
import Group from "./pages/group/Group";
import Leadboard from "./pages/leadboard/Leadboard";
import CommunityHub from "./pages/community-hub/CommunityHub";
import ProfileSettings from "./pages/profile-settings/ProfileSettings";
import TwoFactorValidation from './pages/two-factor-validation/TwoFactorValidation';
import ErrorPage from './pages/error-page/ErrorPage';
import { ConnectedProvider } from "./ConnectedContext";
import GroupSettings from "./pages/group/group-settings/GroupSettings";
import { ModalProvider } from "./ModalContext";

const App: React.FC = () => {
  const isConnected: boolean = true;
  return (
    <ConnectedProvider>
      <ModalProvider>
        <BrowserRouter>
          <Header isConnected={isConnected} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/group/:id" element={<Group />} />
            <Route
              path="/group/create"
              // TODO: members={undefined} admins={undefined} groupInfos={undefined} setData={() => {}} makanosh 9bal
              element={<GroupSettings componentFor="create" members={undefined} admins={undefined} groupInfos={undefined} setData={() => {}} />}
            />
            <Route path="/friends" element={<CommunityHub type="friends" />} />
            <Route path="/groups" element={<CommunityHub type="rooms" />} />
            <Route path="/leadboard" element={<Leadboard />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
            <Route path="/error-page/:code" element={<ErrorPage />} />
            <Route
              path="/two-factor-validation"
              element={<TwoFactorValidation />}
            />
          </Routes>
          <Footer />
          <ToastContainer position="bottom-right" theme="dark" stacked={true} />
        </BrowserRouter>
      </ModalProvider>
    </ConnectedProvider>
  );
};

export default App;
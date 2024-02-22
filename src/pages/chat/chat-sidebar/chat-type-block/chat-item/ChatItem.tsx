import React, { useContext, useEffect, useState } from "react";
import "./ChatItem.css";
import ConnectedContext from "../../../../../ConnectedContext";
import { Link } from "react-router-dom";


interface SelectedChat {
  user_id: string | undefined;
  friend_id?: string;
  group_id?: string;
  type: 'users' | 'groups';
}

interface Friend {
  name: string;
  image: string;
  message: string;
  notifications: number;
}

interface Group {
  name: string;
  images: string[];
  message: string;
}

interface ChatItemProps {
  data: {
    id: string;
    status?: string;
    friend?: Friend;
    members?: any[];
    group?: Group;
    notifications?: number;
  };
  type: 'friend' | 'group';
  selectedChat: SelectedChat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<SelectedChat | null>>;
  lastText: string;
}

const ChatItem : React.FC<any> = ({
  data,
  type, // console.log(groupsMessages);
  selectedChat,
  setSelectedChat,
  // lastMessage, setLastMessage , TODO: hado kano ot7aydo hit unused
  lastText
}) => {
//   const [lastText, setLastText] = useState('');
const { connectedUser } = useContext(ConnectedContext);
  const user_id = connectedUser?.id;



if (type === "friend" && data.friend) { // TODO: && data.friend hadi makantsh hta drt convert l typescript
  const { id, status, friend, notifications } = data;
  console.log('data friend', data)
  if (lastText !== '') friend.message = lastText
    return (
      <li
        className="chat-item"
        data-status={status}
        onClick={(e) =>
          {
            e.preventDefault();
            setSelectedChat({
            user_id: user_id,
            friend_id: id,
            type: "users",
          })
          const target = e.target as HTMLElement;
          target.classList.add('active');
        console.log('chat-item', e.target);
        }
        }
      >
        <Link onClick={(e) => e.preventDefault()} to={""}>
          <div className="friend-infos chat-item-infos">
            <div className="friend-img chat-item-images">
              <img src={process.env.PUBLIC_URL + friend?.image} alt="member-avatar" />
            </div>
            <div className="friend-description chat-item-description">
              <div className="chat-item-title">{friend?.name}</div>
              {/* <p className="chat-item-message">{lastText || friend.message}</p> */}
              <p className="chat-item-message">{friend?.message}</p>
              {/* <p className="chat-item-message">{ !console.log( 'last last:',lastText)  && lastText !== null ? lastText : "siii"}</p> */}
              {/* <p className="chat-item-message">{lastText !== null ? lastText : "siii"}</p> */}

            </div>
          </div>
          {/* <div className="chat-item-notifications"> */}
            {/* <div className="notifications-number">{notifications}</div> */}
          {/* </div> */}
        </Link>
      </li>
    );
  }

  if (type === "group" && data.group) {
    const { id, members, group, notifications } = data;
  if (lastText !== '') group.message = lastText
    return (
      <li
        className="chat-item"
        onClick={() =>
          setSelectedChat({
            user_id: user_id,
            group_id: id,
            type: "groups",
          })
        }
      >
        <Link to={""}>
          <div className="group-infos chat-item-infos">
            <div className="group-img chat-item-images">
              {group.images.map((image: any, index: number) => {
                return <img key={`key-` + index} src={process.env.PUBLIC_URL + image} alt="member avatar" />
              }
              )}
            </div>
            <div className="group-description chat-item-description">
              <div className="chat-item-title">{group.name}</div>
              <p className="chat-item-message">{group.message}</p>
            </div>
          </div>
          {/* <div className="chat-item-notifications"> */}
            {/* <div className="notifications-number">{notifications}</div> */}
          {/* </div> */}
        </Link>
      </li>
    );
  }

  return null;
};

export default ChatItem;

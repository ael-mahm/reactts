import "./ProfileUserInfos.css";

const ProfileUserInfos = () => {
  return (
    <div className="profile-user-infos">
      <div className="profile-user-image">
        <img src="./images/avatars/member_3.png" alt="user image" />
      </div>

      <div className="profile-user-description">
        <div className="profile-user-fullname">oualid oulmyr</div>
        <p className="profile-user-username">ooulmyr</p>
        <p className="profile-user-status"></p>
      </div>

      <div className="profile-user-stats">
        <div className="stats-infos" id="friends">
          <div className="stats-number">50</div>
          <p className="stats-title">Friends</p>
        </div>
        <div className="stats-infos" id="played-games">
          <div className="stats-number">20</div>
          <p className="stats-title">Played games</p>
        </div>
        <div className="stats-infos" id="level">
          <div className="stats-number">3</div>
          <p className="stats-title">Level</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserInfos;

const Role = ({ role }) => {
  return (
    <section className="role">
      <div className="role-title">Owner</div>
      <div>
        <div className="cards-content">
          <div className="card">
            <div className="card-body">
              <div className="card-infos">
                <div className="card-images">
                  <img src="/images/avatars/member_2.png" alt="person image" />
                </div>
                <div className="card-description">
                  <a href="#" className="card-name">
                    {owner.name}
                  </a>
                  <div className="card-status" data-status={owner.status}>
                    {owner.status}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Role;

import Podium from './podium/Podium';
import LeadboardTable from './leadboardTable/LeadboardTable';
import './leadboardStyle.css';

const leadboard = () => {
  return (
    <section className="profile">
      <div className="container">
        <Podium />
        <LeadboardTable />
      </div>
    </section>
  );
};

export default leadboard;

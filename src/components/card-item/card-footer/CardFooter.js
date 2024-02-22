import './CardFooterStyle.css';

const CardFooter = ({ footerButtons }) => {
  return (
    <div className="card-footer">
      <ul className="card-buttons">
        {footerButtons && footerButtons?.map((item) => item)}
      </ul>
    </div>
  );
};

export default CardFooter;

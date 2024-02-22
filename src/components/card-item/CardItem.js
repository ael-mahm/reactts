import { Link } from "react-router-dom";
import CardFooter from "./card-footer/CardFooter";
import "./CardItemStyle.css";
import { useEffect } from "react";

const CardItem = ({ data, footerButtons }) => {

  useEffect(() => {
  }, [])
  
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-infos">
          <div className="card-images">
            {data?.images?.map((image, index) => (
              <img key={`key-${index}`} src={process.env.PUBLIC_URL + image} alt="person avatar" />
            ))}
          </div>
          <div className="card-description">
            <Link to={data?.members ? `/group/${data?.id}` : `/profile/${data?.id}`} className="card-name">
              {data?.name}
            </Link>
            <div className="card-status" data-status={data?.status?.toLowerCase()}>
            {data?.status?.toLowerCase()}
            </div>
          </div>
        </div>
      </div>
      <CardFooter footerButtons={footerButtons} />
    </div>
  );
};

export default CardItem;

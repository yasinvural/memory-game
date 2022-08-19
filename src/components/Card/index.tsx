import { CardType } from "../../types";
import "./style.css";

const className = "card unreveal";

const Card: React.FC<CardType> = ({ value, reveal }) => {
  if (reveal) {
    return <div className="card">{value}</div>;
  }
  return <div className={className}></div>;
};

export default Card;

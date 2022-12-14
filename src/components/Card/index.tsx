import { CardType } from "../../types";
import "./style.css";

const classNameReveal = "card reveal";
const classNameUnreveal = "card unreveal";
const classNameMatched = "card matched";

const Card: React.FC<CardType> = ({
  index,
  value,
  reveal,
  matched,
  cardRevealHandler,
}) => {
  const handleRevealCard = () => {
    cardRevealHandler(index);
  };

  if (reveal) {
    return <div className={classNameReveal}>{value}</div>;
  }
  if (matched) {
    return <div className={classNameMatched}></div>;
  }
  return <div className={classNameUnreveal} onClick={handleRevealCard}></div>;
};

export default Card;

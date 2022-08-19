import "./style.css";

type CardType = {
    value:number
}

const Card: React.FC<CardType> = ({ value }) => {
  return (
    <div className="card">
      {value}
    </div>
  );
};

export default Card;

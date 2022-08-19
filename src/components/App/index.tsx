import { useState, useEffect } from "react";

import "./style.css";
import Card from "../Card";
import { shuffle } from "../../utils";

const App = () => {
  const [cards, setCards] = useState<number[]>([]);

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      const arr = shuffle(Array.from({ length: 18 }, (_, i) => i + 1));
      setCards((prevState) => [...prevState, ...arr]);
    }
  }, []);

  return (
    <div className="playArea">
      <div className="header">Memory Game</div>
      <div className="cardContainer">
        {cards.map((card, index) => (
          <Card key={`${index}-${card}`} value={card} />
        ))}
      </div>
    </div>
  );
};

export default App;

import { useState, useEffect } from "react";

import Card from "../Card";
import { shuffle } from "../../utils";
import { CardType } from "../../types";
import "./style.css";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      const orderedCards = Array.from({ length: 18 }, (_, i) => {
        return {
          value: i + 1,
          reveal: false,
        };
      });
      const shuffled = shuffle(orderedCards);
      setCards((prevState) => [...prevState, ...shuffled]);
    }
  }, []);

  return (
    <div className="playArea">
      <div className="header">Memory Game</div>
      <div className="cardContainer">
        {cards.map(({ value, reveal }, index) => (
          <Card key={`${index}-${value}`} value={value} reveal={reveal} />
        ))}
      </div>
    </div>
  );
};

export default App;

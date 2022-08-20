import { useState, useEffect } from "react";

import Card from "../Card";
import { shuffle } from "../../utils";
import { CardType } from "../../types";
import "./style.css";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isMatched, setIsMatched] = useState(false);

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      const orderedCards = Array.from({ length: 18 }, (_, i) => {
        return {
          value: i + 1,
          reveal: false,
          matched: false,
        };
      });
      const shuffled = shuffle(orderedCards);
      setCards((prevState) => [...prevState, ...shuffled]);
    }
  }, []);

  const handleCardReveal = (index: number) => {
    const revealedCards = cards.map((card, idx) => {
      if (idx === index) {
        return {
          ...card,
          reveal: true,
        };
      }
      return card;
    });
    setCards(revealedCards);
  };

  return (
    <div className="playArea">
      <div className="header">Memory Game</div>
      <div className="cardContainer">
        {cards.map(({ value, reveal, matched }, index) => (
          <Card
            index={index}
            key={`${index}-${value}`}
            value={value}
            reveal={reveal}
            matched={matched}
            cardRevealHandler={handleCardReveal}
          />
        ))}
      </div>
    </div>
  );
};

export default App;

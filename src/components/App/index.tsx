import { useState, useEffect } from "react";

import Card from "../Card";
import { shuffle } from "../../utils";
import { CardType } from "../../types";
import "./style.css";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [revealedCardCount, setRevealedCardCount] = useState(0);

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

  useEffect(() => {
    if (revealedCardCount === 2) {
      handleCardMatch();
    }
  }, [revealedCardCount]);

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
    setRevealedCardCount((prevState) => prevState + 1);
  };

  const handleCardMatch = () => {
    const [card1, card2] = cards.filter((card) => card.reveal && !card.matched);
    if (card1.value === card2.value) {
      setTimeout(() => {
        const updatedCards = cards.map((card) => {
          if (card.reveal) {
            return {
              ...card,
              matched: true,
              reveal: false,
            };
          }
          return card;
        });
        setCards(updatedCards);
      }, 1000);
    } else {
      setTimeout(() => {
        const updatedCards = cards.map((card) => {
          return {
            ...card,
            reveal: false,
          };
        });
        setCards(updatedCards);
      }, 1000);
    }
    setRevealedCardCount(0);
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

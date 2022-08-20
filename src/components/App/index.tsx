import { useState, useEffect } from "react";

import Card from "../Card";
import { shuffle } from "../../utils";
import { CardType } from "../../types";
import "./style.css";

const App = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [revealedCardCount, setRevealedCardCount] = useState(0);

  const initializeTheGame = () => {
    setCards([]);
    setIsGameFinished(false);
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
  };

  useEffect(() => {
    initializeTheGame();
  }, []);

  useEffect(() => {
    if (revealedCardCount === 2) {
      handleCardMatch();
    }
  }, [revealedCardCount]);

  useEffect(() => {
    const gameFinished = cards.length && cards?.every((card) => card.matched);
    if (gameFinished) {
      setIsGameFinished(gameFinished);
    }
  }, [cards]);

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
      {!isGameFinished ? (
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
      ) : (
        <div className="completedContainer">
          <span>Congrats!</span>
          <button onClick={initializeTheGame}>Play again</button>
        </div>
      )}
    </div>
  );
};

export default App;

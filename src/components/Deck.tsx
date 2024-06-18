import { useEffect, useState } from "react";
import Card from "./Card";
import Button from "./Button";
import { DeckIndex, Decks } from "../types";
import { useAppContext } from "../Context";

interface DeckProps {
  decks: typeof Decks.prototype;
}

interface CardControlsProps {
  handleCorrect: () => void;
  handleIncorrect: () => void;
}

interface DeckControlsProps {
  handleNextDeck: () => void;
  handlePreviousDeck: () => void;
  currentDeckIndex: number;
  totalDecks: number;
}

function DeckControls({
  handleNextDeck,
  handlePreviousDeck,
  totalDecks,
  currentDeckIndex,
}: DeckControlsProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm">
      <div>
        Deck {currentDeckIndex + 1} von {totalDecks}
      </div>
      <div className="flex justify-between my-3 w-full">
        <Button
          onClick={handlePreviousDeck}
          buttonSize="small"
          variant="secondary"
          disabled={currentDeckIndex === 0}
        >
          Vorheriges Deck
        </Button>
        <Button
          onClick={handleNextDeck}
          buttonSize="small"
          variant="secondary"
          disabled={currentDeckIndex === totalDecks - 1}
        >
          Nächstes Deck
        </Button>
      </div>
    </div>
  );
}

function CardControls({ handleCorrect, handleIncorrect }: CardControlsProps) {
  return (
    <div className="flex justify-between my-3 w-full max-w-sm">
      <Button onClick={handleIncorrect} buttonSize="large" variant="game-secondary">
        Falsch
      </Button>
      <Button onClick={handleCorrect} buttonSize="large" variant="game-primary">
        Richtig
      </Button>
    </div>
  );
}

export default function Deck({ decks }: DeckProps) {
  const { saveUserState } = useAppContext();
  const [currentDeckIndex, setCurrentDeckIndex] = useState<DeckIndex>(0);
  const [currentCard, setCurrentCard] = useState(decks.getDeck(currentDeckIndex)?.[0]);

  const isLastDeck = currentDeckIndex === decks.length - 1;
  const isFirstDeck = currentDeckIndex === 0;

  const handleCorrect = async () => {
    const removedCard = decks.getDeck(currentDeckIndex)?.shift();
    if (!removedCard) return;

    if (isLastDeck) {
      decks.getDeck(currentDeckIndex)?.push(removedCard);
    } else {
      decks.getDeck((currentDeckIndex + 1) as DeckIndex)?.push(removedCard);
    }
    setCurrentCard(decks.getDeck(currentDeckIndex)?.[0]);
    saveUserState();
  };

  const handleIncorrect = async () => {
    const removedCard = decks.getDeck(currentDeckIndex)?.shift();
    if (!removedCard) return;

    if (isFirstDeck) {
      decks.getDeck(currentDeckIndex)?.push(removedCard);
    } else {
      decks.getDeck((currentDeckIndex - 1) as DeckIndex)?.push(removedCard);
    }
    setCurrentCard(decks.getDeck(currentDeckIndex)?.[0]);
    saveUserState();
  };

  const handleNextDeck = () => {
    if (isLastDeck) return;
    setCurrentDeckIndex((prev) => (prev + 1) as DeckIndex);
    saveUserState();
  };

  const handlePreviousDeck = () => {
    if (isFirstDeck) return;
    setCurrentDeckIndex((prev) => (prev - 1) as DeckIndex);
    saveUserState();
  };

  useEffect(() => {
    setCurrentCard(decks.getDeck(currentDeckIndex)?.[0]);
  }, [currentDeckIndex, decks]);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center">
      <DeckControls
        handleNextDeck={handleNextDeck}
        handlePreviousDeck={handlePreviousDeck}
        currentDeckIndex={currentDeckIndex}
        totalDecks={decks.length}
      />
      <div className="card-container">
        {currentCard ? (
          <Card card={currentCard} />
        ) : (
          <div className="flex justify-center items-center h-full w-full bg-neutral-400 rounded shadow-md text-xl text-center ">
            Keine Karteikarten in diesem Deck
          </div>
        )}
      </div>
      <CardControls handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
    </div>
  );
}

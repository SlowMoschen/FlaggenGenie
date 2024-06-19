import { useEffect, useState } from "react";
import { DeckIndex, Decks } from "../types";
import Button from "../../../shared/components/Button";
import { arrow, cardsIcon, closeCross, decksIcon, doneCheck, emptyIcon } from "../../../assets";
import Card from "./Card";
import { useIndexCardContext } from "../IndexCardsContext";

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
      <div className="flex justify-evenly my-3 w-full">
        <Button
          onClick={handlePreviousDeck}
          buttonSize="icon"
          variant="secondary"
          disabled={currentDeckIndex === 0}
        >
          <img src={arrow} alt="previous" className="h-8 w-8" />
        </Button>
        <Button
          onClick={handleNextDeck}
          buttonSize="icon"
          variant="secondary"
          disabled={currentDeckIndex === totalDecks - 1}
        >
          <img src={arrow} alt="next" className="h-8 w-8 transform rotate-180" />
        </Button>
      </div>
    </div>
  );
}

function CardControls({ handleCorrect, handleIncorrect }: CardControlsProps) {
  return (
    <div className="flex justify-evenly my-3 w-full max-w-sm">
      <Button onClick={handleIncorrect} buttonSize="icon" variant="game-secondary">
        <img src={closeCross} alt="incorrect" className="h-8 w-8" />
      </Button>
      <Button onClick={handleCorrect} buttonSize="icon" variant="game-primary">
        <img src={doneCheck} alt="correct" className="h-8 w-8" />
      </Button>
    </div>
  );
}

export default function Deck({ decks }: DeckProps) {
  const { saveUserState, updateStats } = useIndexCardContext();
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
    updateStats(true);
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
    updateStats(false);
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
    <div className="h-full w-full relative flex flex-col items-center justify-center p-2 py-10">
      <div className="flex items-center justify-center w-full max-w-sm gap-5">
        <div className="flex items-center justify-center mb-3 font-semibold">
          <img src={cardsIcon} alt="cards" className="h-8 w-8 inline-block mr-2" />
          Decks {currentDeckIndex + 1} / {decks.length}
        </div>
        <div className="flex items-center justify-center mb-3 font-semibold">
          <img src={decksIcon} alt="decks" className="h-8 w-8 inline-block mr-2" />
          {decks.getDeck(currentDeckIndex)?.length} Karten
        </div>
      </div>
      <DeckControls
        handleNextDeck={handleNextDeck}
        handlePreviousDeck={handlePreviousDeck}
        currentDeckIndex={currentDeckIndex}
        totalDecks={decks.length}
      />
      <div className="card-container relative h-full w-full max-w-sm bg-slate-300">
        {currentCard ? (
          <Card card={currentCard} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-10 h-full w-full bg-red-200 rounded shadow-md text-xl text-center ">
            <img src={emptyIcon} alt="empty" className="h-28 w-28" />
            <p>Keine Karten in diesem Deck</p>
          </div>
        )}
      </div>
      <CardControls handleCorrect={handleCorrect} handleIncorrect={handleIncorrect} />
    </div>
  );
}

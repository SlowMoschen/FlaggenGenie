import { useTranslation } from "react-i18next";
import { arrow, cardsIcon, closeCross, decksIcon, doneCheck, emptyIcon } from "../../../assets";
import Button from "../../../shared/components/Button";
import { useIndexCardsLogic } from "../useIndexCardLogic";
import { Decks } from "../types";
import Card from "./Card";

interface DeckProps {
  decks: typeof Decks.prototype;
}

interface CardControlsProps {
  handleCorrect: () => void;
  handleIncorrect: () => void;
  disabled?: boolean;
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
          buttonSize="xsmall"
          variant="secondary"
          disabled={currentDeckIndex === 0}
        >
          <img src={arrow} alt="previous" className="h-8 w-8" />
        </Button>
        <Button
          onClick={handleNextDeck}
          buttonSize="xsmall"
          variant="secondary"
          disabled={currentDeckIndex === totalDecks - 1}
        >
          <img src={arrow} alt="next" className="h-8 w-8 transform rotate-180" />
        </Button>
      </div>
    </div>
  );
}

function CardControls({ handleCorrect, handleIncorrect, disabled }: CardControlsProps) {
  return (
    <div className="flex justify-evenly my-3 w-full max-w-sm">
      <Button
        onClick={handleIncorrect}
        buttonSize="medium"
        variant="game-secondary"
        disabled={disabled}
      >
        <img src={closeCross} alt="incorrect" className="h-8 w-8" />
      </Button>
      <Button
        onClick={handleCorrect}
        buttonSize="medium"
        variant="game-primary"
        disabled={disabled}
      >
        <img src={doneCheck} alt="correct" className="h-8 w-8" />
      </Button>
    </div>
  );
}

export default function Deck({ decks }: DeckProps) {
  const { t } = useTranslation("indexCards");
  const { handleCorrect, handleIncorrect, handleNextDeck, handlePreviousDeck, currentCard, deckIndex } = useIndexCardsLogic(decks);

  return (
    <div className="h-full w-full relative flex flex-col items-center justify-center p-2 py-10">
      <div className="flex items-center justify-center w-full max-w-sm gap-5">
        <div className="flex items-center justify-center mb-3 font-semibold">
          <img src={cardsIcon} alt="cards" className="h-8 w-8 inline-block mr-2" />
          Decks {deckIndex + 1} / {decks.length}
        </div>
        <div className="flex items-center justify-center mb-3 font-semibold">
          <img src={decksIcon} alt="decks" className="h-8 w-8 inline-block mr-2" />
          {decks.getDeck(deckIndex)?.length} {t("cards")}
        </div>
      </div>
      <DeckControls
        handleNextDeck={handleNextDeck}
        handlePreviousDeck={handlePreviousDeck}
        currentDeckIndex={deckIndex}
        totalDecks={decks.length}
      />
      <div className="card-container relative h-full w-full max-w-sm bg-slate-300">
        {currentCard ? (
          <Card card={currentCard} onRightSwipe={handleCorrect} onLeftSwipe={handleIncorrect} />
        ) : (
          <div className="flex flex-col justify-center items-center gap-10 h-full w-full bg-red-200 rounded shadow-md text-xl text-center ">
            <img src={emptyIcon} alt="empty" className="h-28 w-28" />
            <p>Keine Karten in diesem Deck</p>
          </div>
        )}
      </div>
      <CardControls
        handleCorrect={handleCorrect}
        handleIncorrect={handleIncorrect}
        disabled={decks.getDeck(deckIndex)?.length === 0}
      />
    </div>
  );
}

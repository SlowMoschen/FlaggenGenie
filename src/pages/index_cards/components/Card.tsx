import { forwardRef, useEffect, useRef, useState } from "react";
import { ICard } from "../types";
import { useTranslation } from "react-i18next";

interface ICardProps extends React.HTMLProps<HTMLDivElement> {
  card: ICard;
  onRightSwipe?: () => void;
  onLeftSwipe?: () => void;
}

const Card = forwardRef<HTMLDivElement, ICardProps>(({ card, onRightSwipe, onLeftSwipe }, ref) => {
  const { front, back, type } = card;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [frontDisplay, setFrontDisplay] = useState(front);
  const [backDisplay, setBackDisplay] = useState(back);
  const [touchStartX, setTouchStartX] = useState(0);
  const { t } = useTranslation("countries");

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const card = cardRef.current;
    if (!card) return;

    card.classList.toggle("flipped");
  };

  const unFlip = () => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("flipped");
  };

  const animateSwipe = (direction: "left" | "right") => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.add(`${direction}-swipe`);

    setTimeout(() => {
      card.classList.remove(`${direction}-swipe`);
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { clientX } = e.changedTouches[0];

    const touchDiff = touchStartX - clientX;
    const isSwipe = Math.abs(touchDiff) > 50;
    if (!isSwipe) return;

    const isTouchEndOnCard = e.changedTouches[0].target === card;
    const extraWidth = 50;
    const rightCardEdge = card.getBoundingClientRect().right;
    const leftCardEdge = card.getBoundingClientRect().left;
    const isRightSwipe = clientX > rightCardEdge + extraWidth;
    const isLeftSwipe = clientX < leftCardEdge - extraWidth;

    if (!isTouchEndOnCard) {
      if (isRightSwipe) {
        animateSwipe("right");
        onRightSwipe && onRightSwipe();
      } else if (isLeftSwipe) {
        animateSwipe("left");
        onLeftSwipe && onLeftSwipe();
      }
    }
    unFlip();
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    unFlip();
    setTimeout(() => {
      setFrontDisplay(front);
      setBackDisplay(back);
    }, 170);
  }, [front, back]);

  if (type === "image") {
    return (
      <div
        className="swiper"
        ref={ref}
        onTouchEndCapture={(e) => handleSwipe(e)}
        onTouchStart={(e) => handleTouchStart(e)}
        onClick={(e) => handleClick(e)}
      >
        <div className="card" ref={cardRef}>
          <div className="front">
            <img src={frontDisplay} alt="front" draggable={false} />
          </div>
          <div className="back">
            <h1 className="text-4xl font-bold">{t(`${backDisplay}.name`)}</h1>
            <div className="flex flex-col text-2xl my-4 bg-background-800 rounded p-4 w-full">
              <div className="flex flex-col justify-between my-2">
                <p className="underline font-semibold">{t("capital")}:</p>
                <p>{t(`${backDisplay}.capital`)}</p>
              </div>
              <div className="flex flex-col justify-between my-2">
                <p className="underline font-semibold">{t("region")}:</p>
                <p>{t(`${backDisplay}.region`)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="swiper" ref={ref}>
      <div className="card" onClick={(e) => handleClick(e)} ref={cardRef}>
        <div className="front">{frontDisplay}</div>
        <div className="back">{backDisplay}</div>
      </div>
    </div>
  );
});

export default Card;

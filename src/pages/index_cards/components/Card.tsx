import { forwardRef, useEffect, useRef, useState } from "react";
import { ICard } from "../types";
import { useTranslation } from "react-i18next";

interface ICardProps extends React.HTMLProps<HTMLDivElement> {
  card: ICard;
}

const Card = forwardRef<HTMLDivElement, ICardProps>(({ card }, ref) => {
  const { front, back, type } = card;
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [frontDisplay, setFrontDisplay] = useState(front);
  const [backDisplay, setBackDisplay] = useState(back);
  const { t } = useTranslation('countries');

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.currentTarget.classList.toggle("flipped");
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.classList.remove("flipped");
    setTimeout(() => {
      setFrontDisplay(front);
      setBackDisplay(back);
    }, 170);
  }, [front, back]);

  if (type === "image") {
    return (
      <div className="swiper" ref={ref}>
        <div className="card" onClick={(e) => handleClick(e)} ref={cardRef}>
          <div className="front">
            <img src={frontDisplay} alt="front" draggable={false}/>
          </div>
          <div className="back">{t(`${backDisplay}.name`)}</div>
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

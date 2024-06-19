import { useEffect, useState } from "react";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import Deck from "./components/Deck";
import DotMenu from "./components/DotMenu";
import Header from "../../shared/components/Header";
import { useIndexCardContext } from "./IndexCardsContext";

function IndexCards() {
  const { decks } = useIndexCardContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }, []);

  if (!isLoaded) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Header title="Karteikarten" dotMenu={<DotMenu />} redirectHome/>
      <Deck decks={decks} />
    </>
  );
}

export default IndexCards;

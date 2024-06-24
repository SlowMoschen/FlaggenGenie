import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../shared/components/Header";
import { LoadingScreen } from "../../shared/components/LoadingScreen";
import { useAppStorage } from "../../shared/hooks/useAppStorage";
import Deck from "./components/Deck";
import DotMenu from "./components/DotMenu";
import { Decks } from "./types";

function IndexCards() {
  const { getStoredItem } = useAppStorage();
  const [isLoaded, setIsLoaded] = useState(false);
  const { t } = useTranslation('indexCards');

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
      <Header title={t('header')} dotMenu={<DotMenu />} redirectHome/>
      <Deck decks={new Decks(getStoredItem('states')!.indexCards.allDecks)} />
    </>
  );
}

export default IndexCards;

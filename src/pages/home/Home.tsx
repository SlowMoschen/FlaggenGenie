import { changeLanguage } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { indexCards, quiz, regions, list } from "../../assets";
import Header from "../../shared/components/Header";
import { REDIRECTS } from "../../shared/configs/redirectLinks";
import { useAppStorage } from "../../shared/hooks/useLocalStorage";
import MainDotMenu from "./components/DotMenu";
import GameCard from "./components/GameCard";

export default function Home() {
  const { t } = useTranslation("home");
  const { getStoredState } = useAppStorage();

  useEffect(() => {
    const storedState = getStoredState();
    changeLanguage(storedState?.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Home" dotMenu={<MainDotMenu />} />
      <main className="grid grid-cols-2 gap-4 p-4 overflow-y-auto max-w-xl w-full place-content-center">
        <GameCard
          icon={indexCards}
          linkTo={REDIRECTS.INDEX_CARDS}
          gameType={t("indexCards")}
          title={t("allCards")}
          className="col-span-full"
        />
        <GameCard
          icon={quiz}
          linkTo={REDIRECTS.INDEX_CARDS}
          gameType={t("quiz")}
          title={t("quizTitle")}
          className="col-span-full"
        />
        <GameCard
          icon={regions}
          linkTo={REDIRECTS.INDEX_CARDS}
          gameType={""}
          title={t("regions")}
        />
        <GameCard
          icon={list}
          linkTo={REDIRECTS.LIST}
          gameType={""}
          title={t("list")}
        />
      </main>
    </>
  );
}

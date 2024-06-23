import { changeLanguage } from "i18next";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { indexCards, list, quiz, regions } from "../../assets";
import Header from "../../shared/components/Header";
import { REDIRECTS } from "../../shared/configs/redirectLinks";
import { useUserProps } from "../../shared/hooks/useUserProps";
import MainDotMenu from "./components/DotMenu";
import GameCard from "./components/GameCard";
import UserCard from "./components/UserCard";

export default function Home() {
  const { t } = useTranslation("home");
  const { language } = useUserProps();

  useEffect(() => {
    if (language) changeLanguage(language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Home" dotMenu={<MainDotMenu />} />
      <main className="grid grid-cols-2 gap-4 p-4 overflow-y-auto max-w-xl w-full">
        <UserCard className="col-span-full" />
        <GameCard
          icon={indexCards}
          linkTo={REDIRECTS.INDEX_CARDS}
          title={t("indexCards")}
          className="col-span-full"
        />
        <GameCard
          icon={quiz}
          linkTo={REDIRECTS.INDEX_CARDS}
          title={t("quiz")}
          className="col-span-full"
        />
        <GameCard icon={regions} linkTo={REDIRECTS.INDEX_CARDS} title={t("regions")} />
        <GameCard icon={list} linkTo={REDIRECTS.LIST} title={t("list")} />
      </main>
    </>
  );
}

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import { REDIRECTS } from "../../shared/configs/redirectLinks";
import MainDotMenu from "./components/DotMenu";
import { useEffect } from "react";
import { useAppStorage } from "../../shared/hooks/useLocalStorage";
import { changeLanguage } from "i18next";

export default function Home() {
  const redirect = useNavigate();
  const { t } = useTranslation();
  const { getStoredState } = useAppStorage();

  useEffect(() => {
    const storedState = getStoredState();
    if (!storedState) redirect(REDIRECTS.LANDING);

    changeLanguage(storedState?.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header title="Home" dotMenu={<MainDotMenu />} />
      <button onClick={() => redirect(REDIRECTS.INDEX_CARDS)}>Index Cards</button>
    </>
  );
}

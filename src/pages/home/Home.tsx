import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Header from "../../shared/components/Header";
import { REDIRECTS } from "../../shared/configs/redirectLinks";
import MainDotMenu from "./components/DotMenu";

export default function Home() {
  const redirect = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Header title="Home" dotMenu={<MainDotMenu />} />
      <button onClick={() => redirect(REDIRECTS.INDEX_CARDS)}>Index Cards</button>
    </>
  );
}

import { changeLanguage } from "i18next";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import DotMenu from "../../../shared/components/DotMenu";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useAppStorage } from "../../../shared/hooks/useAppStorage";

function LanguageSettings() {
  const { t } = useTranslation("home");
  const { storeItem } = useAppStorage();

  const handleLanguageChange = (language: string) => {
    storeItem("language", language);
    changeLanguage(language);
  };

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <div className="mt-4 h-full flex flex-col gap-4">
        <h3 className="text-2xl font-semibold text-center">{t("settings.language")}</h3>
        <p className="mt-2">{t("settings.chooseLanguage")}</p>
        <Button buttonSize="medium" variant="secondary" onClick={() => handleLanguageChange('de')}>
          Deutsch
        </Button>
        <Button buttonSize="medium" variant="secondary" onClick={() => handleLanguageChange('en')}>
          English
        </Button>
      </div>
    </div>
  );
}

function AboutUs() {
  const { t } = useTranslation("home");

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl text-center font-semibold">{t("about.title")}</h2>
      <p>{t("about.text")}</p>
      <div>
        <h3 className="text-2xl font-semibold text-center">{t("about.contact")}</h3>
        <p>
          {t("about.contactText")}

          <a href="mailto:philipp.millner@outlook.com" className="text-primary-500">
            {t("about.email")}
          </a>
        </p>

        <h3 className="text-2xl font-semibold text-center mt-4">{t("about.github")}</h3>
        <p>{t("about.githubText")}</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/SlowMoschen/FlaggenGenie/issues" target="_blank">
            <img
              src="https://img.shields.io/github/issues/SlowMoschen/FlaggenGenie?style=social"
              alt="github issues"
            />
          </a>
          <a href="https://github.com/SlowMoschen/FlaggenGenie" target="_blank">
            <img
              src="https://img.shields.io/github/forks/SlowMoschen/FlaggenGenie?style=social"
              alt="github forks"
            />
          </a>
          <a href="https://github.com/SlowMoschen/FlaggenGenie" target="_blank">
            <img
              src="https://img.shields.io/github/stars/SlowMoschen/FlaggenGenie?style=social"
              alt="github stars"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MainDotMenu() {
  const { isDialogOpen, openDialog, closeDialog, dialogContent } = useDialogContext();
  const { t } = useTranslation("home");

  return (
    <DotMenu>
      <Dialog isOpen={isDialogOpen} onClose={() => closeDialog()}>
        {dialogContent}
      </Dialog>
      <Button onClick={() => openDialog(<LanguageSettings />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.settings")}
      </Button>
      <Button onClick={() => openDialog(<AboutUs />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.about")}
      </Button>
    </DotMenu>
  );
}

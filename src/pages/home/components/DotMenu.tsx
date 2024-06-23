import { changeLanguage } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import DotMenu from "../../../shared/components/DotMenu";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useAppStorage } from "../../../shared/hooks/useAppStorage";
import { useDebouncedCallback } from "use-debounce";

function MainSettings() {
  const { t } = useTranslation("home");
  const { getStoredItem, storeItem } = useAppStorage();
  const [userName, setUserName] = useState<string>(getStoredItem("name") || "");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const selectedLanguage = e.target.value;
    storeItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  };

  const debouncedStoreUsername = useDebouncedCallback((value: string) => {
    storeItem("name", value);
  }, 300);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;

    if (!username) return setUserName("");

    setUserName(username);
    debouncedStoreUsername(username);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl text-center font-semibold">{t("dotMenu.settings")}</h2>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-center">{t("settings.language")}</h3>
        <p className="mt-2">{t("settings.chooseLanguage")}</p>
        <select
          className="w-full p-2 mt-2 outline-background-800"
          onChange={(e) => handleLanguageChange(e)}
          value={getStoredItem("language") || "en"}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <h2 className="text-2xl text-center font-semibold mt-4">{t("settings.username")}</h2>
      <div>
        <p>{t("settings.chooseUsername")}</p>
        <input
          type="text"
          placeholder={t("settings.username")}
          value={userName}
          onChange={(e) => {
            handleUsernameChange(e);
          }}
          className="w-full p-2 mt-2 outline-background-800"
        />
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
      <Button onClick={() => openDialog(<MainSettings />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.settings")}
      </Button>
      <Button onClick={() => openDialog(<AboutUs />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.about")}
      </Button>
    </DotMenu>
  );
}

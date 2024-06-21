import { changeLanguage } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import DotMenu from "../../../shared/components/DotMenu";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useAppStorage } from "../../../shared/hooks/useLocalStorage";
import { useDebouncedCallback } from "use-debounce";

function MainSettings() {
  const { t } = useTranslation();
  const { getStoredItem, storeItem } = useAppStorage();
  const [userName, setUserName] = useState<string>(getStoredItem("username") || "");

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    const selectedLanguage = e.target.value;
    storeItem("language", selectedLanguage);
    changeLanguage(selectedLanguage);
  };

  const debouncedStoreUsername = useDebouncedCallback((value: string) => {
    storeItem("username", value);
    console.log("stored username", value);
  }, 1000);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value;

    if (!username) return setUserName("");

    setUserName(username);
    debouncedStoreUsername(username);
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h2 className="text-3xl text-center font-semibold">{t("settings")}</h2>
      <div className="mt-4">
        <h3 className="text-2xl font-semibold text-center">{t("language")}</h3>
        <p className="mt-2">{t("chooseLanguage")}</p>
        <select
          className="w-full p-2 mt-2 outline-background-800"
          onChange={(e) => handleLanguageChange(e)}
          value={getStoredItem("language") || "en"}
        >
          <option value="en">English</option>
          <option value="de">Deutsch</option>
        </select>
      </div>

      <h2 className="text-2xl text-center font-semibold mt-4">{t("username")}</h2>
      <div>
        <p>{t("chooseUsername")}</p>
        <input
          type="text"
          placeholder={t("username")}
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

export default function MainDotMenu() {
  const { isDialogOpen, openDialog, closeDialog, dialogContent } = useDialogContext();
  const { t } = useTranslation();

  return (
    <DotMenu>
      <Dialog isOpen={isDialogOpen} onClose={() => closeDialog()}>
        {dialogContent}
      </Dialog>
      <Button onClick={() => openDialog(<MainSettings />)} buttonSize="medium" variant="secondary">
        {t("settings")}
      </Button>
    </DotMenu>
  );
}

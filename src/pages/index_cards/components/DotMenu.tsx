import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../../shared/components/Button";
import Dialog from "../../../shared/components/Dialog";
import DotMenu from "../../../shared/components/DotMenu";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useAppStorage } from "../../../shared/hooks/useAppStorage";

const HelpDialog = () => {
  const { t } = useTranslation("indexCards");

  return (
    <div className="py-5">
      <div>
        <h3 className="text-2xl font-semibold text-center">{t("help.why")}</h3>
        <p className="mt-5">{t("help.whyContent")}</p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center mt-5">{t("help.how")}</h3>
        <p className="mt-5">{t("help.howContent.cardClick")}</p>
        <p className="mt-5">{t("help.howContent.goNext")}</p>
        <p className="mt-5">{t("help.howContent.cardMove")}</p>
        <p className="mt-5">{t("help.howContent.reset")}</p>
      </div>
    </div>
  );
};

const StatsDialog = () => {
  const { getStoredItem } = useAppStorage();
  const { t } = useTranslation("indexCards");
  const [stats, _] = useState(getStoredItem("stats")!.indexCards!);

  return (
    <div className="py-5">
      <h3 className="text-3xl font-bold text-center">{t("stats.header")}</h3>
      <div className="flex flex-col gap-2 mt-5 px-5">
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.correct")}:</span>
          <span>{stats.correct}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.wrong")}:</span>
          <span>{stats.incorrect}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.total")}:</span>
          <span>{stats.total}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.correctStreak")}:</span>
          <span>{stats.correctStreak}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.correctStreakBest")}:</span>
          <span>{stats.maxCorrectStreak}</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.correctPercent")}:</span>
          <span>{stats.correctPercentage}%</span>
        </p>
        <p className="flex justify-between">
          <span className="font-bold">{t("stats.wrongPercent")}:</span>
          <span>{stats.incorrectPercentage}%</span>
        </p>
      </div>
    </div>
  );
};

export default function IndexCardsDotMenu() {
  const { resetStoredStats, resetStoredStates } = useAppStorage();
  const { isDialogOpen, openDialog, dialogContent, closeDialog } = useDialogContext();
  const { t } = useTranslation("indexCards");

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetStoredStats("indexCards");
      resetStoredStates("indexCards");
      window.location.reload();
    }
  };

  return (
    <DotMenu>
      <Dialog isOpen={isDialogOpen} onClose={() => closeDialog()}>
        {dialogContent}
      </Dialog>
      <Button onClick={handleReset} buttonSize="medium" variant="secondary">
        {t("dotMenu.reset")}
      </Button>
      <Button onClick={() => openDialog(<StatsDialog />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.stats")}
      </Button>
      <Button onClick={() => openDialog(<HelpDialog />)} buttonSize="medium" variant="secondary">
        {t("dotMenu.help")}
      </Button>
    </DotMenu>
  );
}

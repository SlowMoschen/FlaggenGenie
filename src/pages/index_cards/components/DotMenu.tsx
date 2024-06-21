import { useTranslation } from "react-i18next";
import Dialog from "../../../shared/components/Dialog";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useIndexCardContext } from "../IndexCardsContext";
import Button from "../../../shared/components/Button";
import DotMenu from "../../../shared/components/DotMenu";

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
  const { stats } = useIndexCardContext();
  const { t } = useTranslation("indexCards");

  return (
    <div className="py-5">
      <h3 className="text-3xl font-bold text-center">{t("stats.header")}</h3>
      {/* <div className="grid grid-cols-2 gap-5 mt-5 px-3">
        <div className="font-bold flex flex-col gap-2">
          <p>{t("stats.correct")}</p>
          <p>{t("stats.wrong")}</p>
          <p>{t("stats.total")}</p>
          <p>{t("stats.correctStreak")}</p>
          <p>{t("stats.correctStreakBest")}</p>
          <p>{t("stats.correctPercent")}</p>
          <p>{t("stats.wrongPercent")}</p>
        </div>
        <div className="flex flex-col gap-2 items-end justify-end">
          <p>{stats.correct}</p>
          <p>{stats.incorrect}</p>
          <p>{stats.total}</p>
          <p>{stats.correctStreak}</p>
          <p>{stats.maxCorrectStreak}</p>
          <p>{stats.correctPercentage}%</p>
          <p>{stats.incorrectPercentage}%</p>
        </div>
      </div> */}
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
  const { resetUserState } = useIndexCardContext();
  const { isDialogOpen, openDialog, dialogContent, closeDialog } = useDialogContext();
  const { t } = useTranslation("indexCards");

  const handleReset = () => {
    if (window.confirm(t("resetConfirm"))) {
      resetUserState();
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

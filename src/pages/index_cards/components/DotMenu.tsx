import { useTranslation } from "react-i18next";
import Dialog from "../../../shared/components/Dialog";
import { useDialogContext } from "../../../shared/context/DialogContext";
import { useIndexCardContext } from "../IndexCardsContext";

const HelpDialog = () => {
  const { t } = useTranslation("indexCards");

  return (
    <div className="py-5">
      <div>
        <h3 className="text-2xl font-semibold text-center">{t('help.why')}</h3>
        <p className="mt-5">
          {t('help.whyContent')}
        </p>
      </div>
      <div>
        <h3 className="text-2xl font-semibold text-center mt-5">Wie funktioniert es ?</h3>
        <p className="mt-5">
          {t('help.howContent.cardClick')}
        </p>
        <p className="mt-5">
          {t('help.howContent.goNext')}
        </p>
        <p className="mt-5">
          {t('help.howContent.cardMove')}
        </p>
        <p className="mt-5">
          {t('help.howContent.reset')}
        </p>
      </div>
    </div>
  );
}

const StatsDialog = () => {
  const { stats } = useIndexCardContext();
  const { t } = useTranslation("indexCards");

  return (
    <div className="py-5">
      <h3 className="text-3xl font-bold text-center">{t('stats.header')}</h3>
      <div className="grid grid-cols-2 gap-5 mt-5 px-3">
        <div className="font-bold flex flex-col gap-2">
          <p>{t("stats.correct")}</p>
          <p>{t("stats.wrong")}</p>
          <p>{t("stats.total")}</p>
          <p>{t("stats.correctStreak")}</p>
          <p>{t("stats.correctStreakBest")}</p>
          <p>{t("stats.correctPercent")}</p>
          <p>{t("stats.wrongPercent")}</p>
        </div>
        <div className="flex flex-col gap-2 items-end">
          <p>{stats.correct}</p>
          <p>{stats.incorrect}</p>
          <p>{stats.total}</p>
          <p>{stats.correctStreak}</p>
          <p>{stats.maxCorrectStreak}</p>
          <p>{stats.correctPercentage}%</p>
          <p>{stats.incorrectPercentage}%</p>
        </div>
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
    <div className={`dot-menu flex flex-col absolute z-50 top-16 right-3 bg-slate-300 p-2 rounded`}>
      <Dialog isOpen={isDialogOpen} onClose={() => closeDialog()}>
        {dialogContent}
      </Dialog>
      <button onClick={handleReset} className="hover:bg-slate-400 p-2 rounded-md">
        {t("dotMenu.reset")}
      </button>
      <button onClick={() => openDialog(<StatsDialog/>)} className="hover:bg-slate-400 p-2 rounded-md">
        {t("dotMenu.stats")}
      </button>
      <button onClick={() => openDialog(<HelpDialog/>)} className="hover:bg-slate-400 p-2 rounded-md">
        {t("dotMenu.help")}
      </button>
    </div>
  );
}

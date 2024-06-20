import Dialog from "../../../shared/components/Dialog";
import { useDialogContext } from "../../../shared/context/DialogContext";

function MainSettings() {
    return (
        <div className="p-4">
            <h2>Einstellungen</h2>
            <p>Wähle deine bevorzugte Sprache:</p>
            <select>
                <option value="de">Deutsch</option>
                <option value="en">Englisch</option>
            </select>
        </div>
    )

}

export default function MainDotMenu() {
    const { isDialogOpen, openDialog, closeDialog, dialogContent } = useDialogContext();

    return (
        <div className={`dot-menu flex flex-col absolute z-50 top-16 right-3 bg-slate-300 p-2 rounded`}>
            <Dialog isOpen={isDialogOpen} onClose={() => closeDialog()}>
                {dialogContent}
            </Dialog>
            <button className="hover:bg-slate-400 p-2 rounded-md" onClick={() => openDialog(<MainSettings />)}>
                Einstellungen
            </button>
        </div>
    )
}
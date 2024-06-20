import { createContext, useContext, useState } from "react";

interface DialogContextType {
    isDialogOpen: boolean;
    dialogContent: React.ReactNode;
    openDialog: (content: React.ReactNode) => void;
    closeDialog: () => void;
}

const DialogContext = createContext<DialogContextType>({
    isDialogOpen: false,
    dialogContent: null,
    openDialog: () => {},
    closeDialog: () => {},
});

function DialogContextProvider({ children }: { children: React.ReactNode }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

    const openDialog = (content: React.ReactNode) => {
        setDialogContent(content);
        setIsDialogOpen(true);
    }

    const closeDialog = () => {	
        setIsDialogOpen(false);	
        setDialogContent(null);	
    }

    return (
        <DialogContext.Provider value={{ isDialogOpen, dialogContent, openDialog, closeDialog }}>
            {children}
        </DialogContext.Provider>
    );
}

const useDialogContext = () => {
    const context = useContext(DialogContext);
    if (!context) {
        throw new Error("useDialogContext must be used within a DialogContextProvider");
    }
    return context;
}

// eslint-disable-next-line react-refresh/only-export-components
export { DialogContextProvider, useDialogContext, DialogContext };
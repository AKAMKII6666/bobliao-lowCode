import type { AlertColor } from '@mui/material';

interface IsettingsContext {
    collapsed: boolean;
    direction: string;
    mode: string;
    open: boolean;
    changeCollapsed: (collapsed: boolean) => void;
    changeDirection: (direction: 'ltr' | 'rtl') => void;
    changeMode: (mode: string) => void;
    toggleDrawer: () => void;
}

interface IsnackbarContextInterface {
    popMessage: (type: AlertColor, newMessage: string) => void;
}

import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import * as serviceWorker from '../serviceWorker';

const UseServiceWorker = () => {
    const [Open, setOpen] = React.useState(false);
    const [Message, setMessage] = React.useState("asdasdasd");
    serviceWorker.register({
        onOpen: () => {
            setMessage("Offline Mode Available!");
            setOpen(true);
        },
        //onUpdate: reg => store.dispatch({ type: SW_UPDATE, payload: reg }),
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    setTimeout(setOpen, 5000, true);
    const transition = (props) => <Slide {...props} direction="up" />;
    return (
        <Snackbar
            open={Open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={transition}>
            <Alert onClose={handleClose} severity="success">
                {Message}
                <Button color="secondary" size="small" onClick={handleClose}> UNDO </Button>
            </Alert>
        </Snackbar>
    );
};

export default UseServiceWorker;
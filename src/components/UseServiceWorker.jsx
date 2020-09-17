import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import * as serviceWorker from '../serviceWorker';

const UseServiceWorker = () => {
    const [Open, setOpen] = React.useState(false);
    const [Message, setMessage] = React.useState("");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);
    serviceWorker.register({
        onOpen: () => {
            setMessage("OFFLINE");
            setOpen(true);
        },
        onUpdate: registration => {
            setWaitingServiceWorker(registration.waiting);
            setMessage("UPDATE");
            setOpen(true);
        },
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUpdate = () => {
        if (waitingServiceWorker) {
            // We send the SKIP_WAITING message to tell the Service Worker
            // to update its cache and flush the old one
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
        setOpen(false);
    };



    React.useEffect(() => {
        // We setup an event listener to automatically reload the page
        // after the Service Worker has been updated, this will trigger
        // on all the open tabs of our application, so that we don't leave
        // any tab in an incosistent state
        waitingServiceWorker.addEventListener('statechange', event => {
            if (event.target.state === 'activated') {
                window.location.reload();
            }
        });
    }, [waitingServiceWorker]);

    React.useEffect(() => setTimeout(setOpen, 5000, true), []);

    const transition = (props) => <Slide {...props} direction="up" />;
    return (
        <Snackbar
            open={Open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={transition}>
            {Message === "OFFLINE" ?
                <Alert onClose={handleClose} severity="success"> Offline Mode Available! </Alert>
                :
                <Alert onClose={handleClose} severity="success">
                    Update Available!
                    <Button color="secondary" size="small" onClick={handleUpdate}> UPDATE </Button>
                </Alert>
            }
        </Snackbar>
    );
};

export default UseServiceWorker;
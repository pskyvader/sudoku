import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import * as serviceWorker from '../serviceWorker';



const Snackbaralert = (props) => {
    const { Message, setMessage, waitingServiceWorker, installPrompt } = props;
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage("");
    };

    const handleUpdate = () => {
        if (waitingServiceWorker) {
            // We send the SKIP_WAITING message to tell the Service Worker
            // to update its cache and flush the old one
            waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
        }
        setMessage("");
    };
    const handleInstall = () => {
        if (installPrompt) {
            installPrompt.prompt();
            // Wait for the user to respond to the prompt
            installPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
            });
        }
        setMessage("");
    };

    if (Message === "UPDATE") {
        return (
            <Alert elevation={6} variant="filled" severity="info"
                action={
                    <React.Fragment>
                        <Button color="inherit" size="small" onClick={handleUpdate}> UPDATE </Button>
                        <IconButton color="inherit" size="small" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            >
                Update Available!
            </Alert>
        )
    }
    if (Message === "OFFLINE") {
        return (
            <Alert elevation={6} variant="filled" severity="success" onClose={handleClose} >
                Offline Mode Available! Now you can play even if you're offline.
            </Alert>
        )
    }
    return null;
}





const UseServiceWorker = () => {
    const [Message, setMessage] = React.useState("");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);
    const [installPrompt, setinstallPrompt] = React.useState(null);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage("");
    };

    React.useEffect(() => {
        serviceWorker.register({
            onOpen: () => {
                if (Message === "") {
                    setMessage("OFFLINE");
                }
            },
            onUpdate: registration => {
                setWaitingServiceWorker(registration.waiting);
                setMessage("UPDATE");
            },
        });
    }, [Message]);


    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setinstallPrompt(e);
            if (Message !== "UPDATE") {
                setMessage("INSTALL");
            }
        });
    }, [Message]);

    React.useEffect(() => {
        // We setup an event listener to automatically reload the page
        // after the Service Worker has been updated, this will trigger
        // on all the open tabs of our application, so that we don't leave
        // any tab in an incosistent state
        if (waitingServiceWorker) {
            waitingServiceWorker.addEventListener('statechange', event => {
                if (event.target.state === 'activated') {
                    window.location.reload();
                }
            });
        }
    }, [waitingServiceWorker]);



    const transition = (props) => <Slide {...props} direction="up" />;
    return (
        <Snackbar
            open={Message !== ""}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={transition}>
            <Snackbaralert Message={Message} setMessage={setMessage} waitingServiceWorker={waitingServiceWorker} installPrompt={installPrompt} />
        </Snackbar>
    );
};

export default UseServiceWorker;
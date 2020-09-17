import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import * as serviceWorker from '../serviceWorker';

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


    React.useEffect(() => {
        serviceWorker.register({
            onOpen: () => {
                setMessage("OFFLINE");
            },
            onUpdate: registration => {
                setWaitingServiceWorker(registration.waiting);
                setMessage("UPDATE");
            },
        });
    }, []);

    React.useEffect(() => {
        // We setup an event listener to automatically reload the page
        // after the Service Worker has been updated, this will trigger
        // on all the open tabs of our application, so that we don't leave
        // any tab in an incosistent state
        if (waitingServiceWorker) {
            console.log("exists", waitingServiceWorker);
            waitingServiceWorker.addEventListener('statechange', event => {
                if (event.target.state === 'activated') {
                    window.location.reload();
                }
            });
        }
    }, [waitingServiceWorker]);

    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent the mini-infobar from appearing on mobile
            e.preventDefault();
            // Stash the event so it can be triggered later.
            setinstallPrompt(e);
        });
    }, []);



    const transition = (props) => <Slide {...props} direction="up" />;
    return (
        <Snackbar
            open={Message !== ""}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={transition}>
            {Message === "OFFLINE" ?
                <Alert elevation={6} variant="filled" severity="success"
                    action={
                        <React.Fragment>
                            {installPrompt && <Button color="inherit" size="small" onClick={handleInstall}> INSTALL </Button>}
                            <IconButton color="inherit" size="small" onClick={handleClose}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    Offline Mode Available! Now you can play even if you're offline.
                </Alert>
                :
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
            }
        </Snackbar>
    );
};

export default UseServiceWorker;
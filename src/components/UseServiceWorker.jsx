import React from 'react';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';


import * as serviceWorker from '../serviceWorker';

const UseServiceWorker = () => {
    const [Message, setMessage] = React.useState("UPDATE");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);
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

    const transition = (props) => <Slide {...props} direction="up" />;
    return (
        <Snackbar
            open={Message !== ""}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            TransitionComponent={transition}>
            {Message === "OFFLINE" ?
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="success"> Offline Mode Available! </Alert>
                :
                <Alert elevation={6} variant="filled" onClose={handleClose} severity="info"
                    action={
                        <React.Fragment>
                        <Button color="inherit" size="small" onClick={handleUpdate}> UPDATE </Button>
                        <Button color="inherit" size="small" onClick={handleClose}> CLOSE </Button>
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
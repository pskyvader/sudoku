import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import Text from '../../languages/Language';
import { ServiceWorkerContext } from '../../ContextProviders/ServiceWorkerContext';


const handleUpdate = (props) => {
    const { setMessage, waitingServiceWorker } = props;
    if (waitingServiceWorker) {
        // We send the SKIP_WAITING message to tell the Service Worker
        // to update its cache and flush the old one
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setMessage("");
};

const handleInstall = (props) => {
    const { setMessage, installPrompt } = props;
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


const ServiceWorkerSnackbar = () => {
    const context = React.useContext(ServiceWorkerContext);
    const { Message } = context;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
    };
    let alertmessage = {};
    if (Message === "INSTALL") {
        return null;
        // alertmessage = {
        //     severity: "success",
        //     action: () => handleInstall(context),
        //     button: Text("install"),
        //     text: Text("app-available")
        // }
    } else if (Message === "UPDATE") {
        alertmessage = {
            severity: "info",
            action: () => handleUpdate(context),
            button: Text("update"),
            text: Text("update-available")
        }
    } else if (Message === "OFFLINE") {
        alertmessage = {
            severity: "success",
            action: null,
            button: null,
            text: Text("offline-available")
        }
    }

    const transition = (props) => <Slide {...props} direction="up" />;
    return <Snackbar
        open={Message !== ""}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={transition}
    >
        <Alert elevation={6} variant="filled" severity={alertmessage.severity}
            action={alertmessage.action !== null &&
                <React.Fragment>
                    <Button color="inherit" size="small" onClick={alertmessage.action}>  {alertmessage.button} </Button>
                    <IconButton color="inherit" size="small" onClick={handleClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            } >
            {alertmessage.text}
        </Alert>
    </Snackbar>
}



const ServiceWorkerList = () => {
    const context = React.useContext(ServiceWorkerContext);
    const { Message } = context;
    let alertmessage = {};

    if (Message === "INSTALL") {
        alertmessage = {
            action: () => handleInstall(context),
            text: Text("install"),
        }
    } else if (Message === "UPDATE") {
        alertmessage = {
            action: () => handleUpdate(context),
            text: Text("update"),
        }
    }

    return (Message !== "OFFLINE" && Message !== "") ?
        (
            <ListItem button key={alertmessage.text} onClick={alertmessage.action} >
                <ListItemText primary={alertmessage.text} />
            </ListItem>
        )
        : null
}



const ServiceWorker = ({ mode = "snackbar" }) => {
    if (mode === "snackbar") {
        return <ServiceWorkerSnackbar />;
    } else {
        return <ServiceWorkerList />;
    }
};

export default ServiceWorker;
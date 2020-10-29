import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


import { ServiceWorkerContext } from '../../ServiceWorkerContext/ServiceWorkerContext';
import LocalStorage from "../../logic/LocalStorage";



const ServiceWorkerSnackbar = (props) => {
    const { Message, setMessage, waitingServiceWorker, installPrompt, setInstalled } = React.useContext(ServiceWorkerContext);
    // const { Message, setMessage, waitingServiceWorker, installPrompt, setInstalled } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setMessage("");
    };
    const handleInstallClose = () => {
        setInstalled(true);
        LocalStorage.set("installed", true);
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
                    setInstalled(true);
                    LocalStorage.set("installed", true);
                    console.log('User dismissed the install prompt');
                }
            });
        }
        setMessage("");
    };
    let alertmessage = <div />;
    if (Message === "INSTALL") {
        alertmessage = <Alert elevation={6} variant="filled" severity="success"
            action={
                <React.Fragment>
                    <Button color="inherit" size="small" onClick={handleInstall}> {Text("install")} </Button>
                    <IconButton color="inherit" size="small" onClick={handleInstallClose}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                </React.Fragment>
            } >
            {Text("app-available")}
        </Alert>

    }

    if (Message === "UPDATE") {
        alertmessage = (
            <Alert elevation={6} variant="filled" severity="info"
                action={
                    <React.Fragment>
                        <Button color="inherit" size="small" onClick={handleUpdate}>  {Text("update")} </Button>
                        <IconButton color="inherit" size="small" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                } >
                {Text("update-available")}
            </Alert>
        )
    }
    if (Message === "OFFLINE") {
        alertmessage = (
            <Alert elevation={6} variant="filled" severity="success" onClose={handleClose} >
                {Text("offline-available")}
            </Alert>
        )
    }

    const transition = (props2) => <Slide {...props2} direction="up" />;
    return <Snackbar
        open={Message !== ""}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        TransitionComponent={transition}
    >
        {alertmessage}
    </Snackbar>
}



const ServiceWorkerList=()=>{
    const { Message } = React.useContext(ServiceWorkerContext);

    return <ListItem button key={Message} onClick={() => console.log("uwu")} >
        <ListItemText primary={Message} />
    </ListItem>

}



const ServiceWorker = ({mode="snackbar"}) => {
    if(mode==="snackbar"){
        return ServiceWorkerSnackbar;
    }else{
        return ServiceWorkerList;
    }
};

export default ServiceWorker;
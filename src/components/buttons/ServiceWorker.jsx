import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slide from '@material-ui/core/Slide';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/core/Alert';
import CloseIcon from '@material-ui/icons/Close';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

import GetAppIcon from '@material-ui/icons/GetApp';
import RefreshIcon from '@material-ui/icons/Refresh';


import Text from '../../languages/Language';
import { ServiceWorkerContext } from '../../ContextProviders/ServiceWorkerContext';



const useStyles = makeStyles((theme) => ({
    update: {
        backgroundColor:theme.palette.info.main,
        color:theme.palette.info.contrastText,
        "&:hover":{
            backgroundColor:theme.palette.info.light,
        }
    },
    install: {
        backgroundColor:theme.palette.success.main,
        color:theme.palette.success.contrastText,
        "&:hover":{
            backgroundColor:theme.palette.success.light,
        }
    },
}
));



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
    const [open, setOpen] = React.useState(true);
    if(Message==="" || Message==="INSTALL") return null;


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    let alertmessage = {};
    // if (Message === "INSTALL") {
        // alertmessage = {
        //     severity: "success",
        //     action: () => handleInstall(context),
        //     button: Text("install"),
        //     text: Text("app-available")
        // }
    // }
    if (Message === "UPDATE") {
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
        open={open}
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
    const classes = useStyles();
    const context = React.useContext(ServiceWorkerContext);
    const { Message } = context;
    let alertmessage = {};

    if (Message === "INSTALL") {
        alertmessage = {
            action: () => handleInstall(context),
            text: Text("install"),
            icon: GetAppIcon,
            color: classes.install
        }
    } else if (Message === "UPDATE") {
        alertmessage = {
            action: () => handleUpdate(context),
            text: Text("update"),
            icon: RefreshIcon,
            color: classes.update
        }
    }

    return (Message !== "OFFLINE" && Message !== "") ?
        (
            <ListItem button key={alertmessage.text} onClick={alertmessage.action} className={alertmessage.color} >
                <ListItemIcon> <alertmessage.icon /> </ListItemIcon>
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
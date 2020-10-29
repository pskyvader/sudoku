import React from 'react';
// import * as serviceWorker from '../../serviceWorker';
import LocalStorage from '../../logic/LocalStorage';
import SnakbarServiceWorker from "./SnakbarServiceWorker";


import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


const UseServiceWorker = ({ mode = "snackbar", Message, setMessage,waitingServiceWorker }) => {
    const [installPrompt, setinstallPrompt] = React.useState(null);
    const [Installed, setInstalled] = React.useState(LocalStorage.get("installed", false));





    React.useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            if (localStorage) {
                // Prevent the mini-infobar from appearing on mobile
                e.preventDefault();
                // Stash the event so it can be triggered later.
                setinstallPrompt(e);
                if (Message !== "UPDATE" && !Installed) {
                    setMessage("INSTALL");
                }
            }
        });
    }, [Message, Installed]);

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


    if (mode === "snackbar") {
        return <SnakbarServiceWorker setInstalled={setInstalled} Message={Message} setMessage={setMessage} waitingServiceWorker={waitingServiceWorker} installPrompt={installPrompt} />
    } else {
        return <ListItem button key={Message} onClick={() => console.log("uwu")} >
            <ListItemText primary={Message} />
        </ListItem>
    }
};

export default UseServiceWorker;
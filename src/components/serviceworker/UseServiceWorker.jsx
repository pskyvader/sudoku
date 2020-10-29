import React from 'react';
import * as serviceWorker from '../../serviceWorker';
import LocalStorage from '../../logic/LocalStorage';
import SnakbarServiceWorker from "./SnakbarServiceWorker";


const UseServiceWorker = ({ mode = "snackbar" }) => {
    const [Message, setMessage] = React.useState("");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);
    const [installPrompt, setinstallPrompt] = React.useState(null);
    const [Installed, setInstalled] = React.useState(LocalStorage.get("installed", false));



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
        return "uwu";
    }
};

export default UseServiceWorker;
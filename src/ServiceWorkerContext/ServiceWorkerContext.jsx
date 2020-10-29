import React, { createContext } from 'react';
import * as serviceWorker from '../serviceWorker';
import LocalStorage from "../logic/LocalStorage";


export const ServiceWorkerContext = createContext({});


export default function ServiceWorkerProvider({ children }) {
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
    }, [Message,setMessage, Installed,waitingServiceWorker]);


    const provider = {
        Message,
        setMessage,
        installPrompt,
        setInstalled,
        waitingServiceWorker
    };

    return (
        <ServiceWorkerContext.Provider value={provider}>
            {children}
        </ServiceWorkerContext.Provider>
    );
}



export const handleUpdate = (props) => {
    const { setMessage, waitingServiceWorker } = useContext(ServiceWorkerContext);
    if (waitingServiceWorker) {
        // We send the SKIP_WAITING message to tell the Service Worker
        // to update its cache and flush the old one
        waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
    setMessage("");
};

export const handleInstall = () => {
    const { setMessage, installPrompt, setInstalled } = useContext(ServiceWorkerContext);
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
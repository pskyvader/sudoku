import React, { createContext } from 'react';
import * as serviceWorker from '../serviceWorker';


export const ServiceWorkerContext = createContext({});


export default function ServiceWorkerProvider({ children }) {
    const [Message, setMessage] = React.useState("");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);
    const [installPrompt, setinstallPrompt] = React.useState(null);

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
                if (Message !== "UPDATE") {
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
    }, [Message,setMessage,waitingServiceWorker]);


    const provider = {
        Message,
        setMessage,
        installPrompt,
        waitingServiceWorker
    };

    return (
        <ServiceWorkerContext.Provider value={provider}>
            {children}
        </ServiceWorkerContext.Provider>
    );
}
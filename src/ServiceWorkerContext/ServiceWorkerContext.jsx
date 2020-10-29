import React, { createContext } from 'react';
import * as serviceWorker from '../serviceWorker';


export const ServiceWorkerContext = createContext({});


export default function ServiceWorkerProvider({ children }) {
    const [Message, setMessage] = React.useState("");
    const [waitingServiceWorker, setWaitingServiceWorker] = React.useState(null);

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


    const provider = {
        Message,
        setMessage,
        waitingServiceWorker
    };

    return (
        <ServiceWorkerContext.Provider value={provider}>
            {children}
        </ServiceWorkerContext.Provider>
    );
}


// // get text according to id & current language
// export default function Text(tid) {
//     const ServiceWorkerContext = useContext(ServiceWorkerContext);
//     return ServiceWorkerContext.dictionary[tid] || tid + "-TEXT";
// }
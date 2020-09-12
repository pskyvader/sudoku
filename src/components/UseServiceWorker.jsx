import * as serviceWorker from '../serviceWorker';

const UseServiceWorker = () => {

    serviceWorker.register({
        onSuccess: () => {
            console.log("success");
        },
        //onUpdate: reg => store.dispatch({ type: SW_UPDATE, payload: reg }),
    });

    return null;
};

export default UseServiceWorker;
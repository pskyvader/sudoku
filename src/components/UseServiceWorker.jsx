import React from 'react';
import Alert from '@material-ui/lab/Alert';

import * as serviceWorker from '../serviceWorker';

const UseServiceWorker = () => {
    const [Success, setSuccess] = React.useState(false);
    serviceWorker.register({
        onSuccess: () => {
            setSuccess(true);
        },
        //onUpdate: reg => store.dispatch({ type: SW_UPDATE, payload: reg }),
    });

    return (
        <React.Fragment>
            {Success && <Alert severity="success">This is a success alert — check it out!</Alert>}
        </React.Fragment>
    );
};

export default UseServiceWorker;
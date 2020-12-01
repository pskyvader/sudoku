import React, { useContext } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Tooltip from '@material-ui/core/Tooltip';

import { TimerContext } from '../../ContextProviders/TimerContext';
import Text from '../../languages/Language';

const useStyles = makeStyles((theme) => {
    return {
        timerbutton: {
            color: theme.palette.info.contrastText,
            padding: theme.spacing(1)
        },
        icon: {
            fontSize: theme.spacing(4)
        }
    }
});


const TimerButton = ({ mode = "button" }) => {
    const { Time, IsTimerActive, ToggleTimer } = useContext(TimerContext);
    const classes = useStyles();

    return <Tooltip title={IsTimerActive ? Text('pause') : Text('play')}>
        <div>
            <IconButton className={classes.timerbutton} onClick={ToggleTimer}>
                {IsTimerActive ? <PauseCircleOutlineIcon className={classes.icon} /> : <PlayCircleOutlineIcon className={classes.icon} />}
            </IconButton>
            <Time />
        </div>
    </Tooltip>

}

export default TimerButton;
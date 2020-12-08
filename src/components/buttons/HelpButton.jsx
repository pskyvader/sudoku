import React, { useContext } from 'react';
import HelpIcon from '@material-ui/icons/Help';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Switch from '@material-ui/core/Switch';

import Text from '../../languages/Language';
import { BoardContext } from '../../ContextProviders/BoardContext';
import LocalStorage from '../../logic/LocalStorage';


const HelpButton = ({ mode = "button" }) => {
    const { HelpActive, setHelpActive } = useContext(BoardContext);
    const handleToggle = () => {
        LocalStorage.set("help_active",!HelpActive , 365);
        setHelpActive(!HelpActive);
    }

    return <ListItem button key={Text('helpactive')} onClick={() => handleToggle()}>
        <ListItemIcon>
            <HelpIcon />
        </ListItemIcon>
        <ListItemText primary={Text('helpactive')} />
        <Switch
            edge="end"
            onChange={handleToggle}
            checked={HelpActive}
            inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
        />
    </ListItem>

}

export default HelpButton;
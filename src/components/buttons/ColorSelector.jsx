import React, { useContext } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import PaletteIcon from '@material-ui/icons/Palette';

import {
    amber, blue, blueGrey, brown, cyan,
    deepOrange, deepPurple, green, grey, indigo,
    lightBlue, lightGreen, lime, orange,
    pink, purple, red, teal, yellow
} from '@material-ui/core/colors';


import { ColorPalette } from 'material-ui-color';

// import LocalStorage from '../../logic/LocalStorage';
import Text from '../../languages/Language';
import { ThemeContext } from '../../ContextProviders/ThemeContext';




const colors = {
    amber: amber,
    blue: blue,
    blueGrey: blueGrey,
    brown: brown,
    cyan: cyan,
    deepOrange: deepOrange,
    deepPurple: deepPurple,
    green: green,
    grey: grey,
    indigo: indigo,
    lightBlue: lightBlue,
    lightGreen: lightGreen,
    lime: lime,
    orange: orange,
    pink: pink,
    purple: purple,
    red: red,
    teal: teal,
    yellow: yellow
};

const getColor = (hue) => {
    var palette = {};
    for (const [key, value] of Object.entries(colors)) {
        palette[key] = value[hue];
    }
    return palette;
}


export default function ColorSelector({ mode = "primary" }) {
    const { SetColor, ResetColor } = useContext(ThemeContext);

    // set selected language by calling context method
    const handleMenuItemClick = (key) => {
        const selectedcolor = {
            light: colors[key][600],
            dark: colors[key][800]
        }
        SetColor(selectedcolor, mode === "primary");
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickList = () => {
        setOpen(!open);
    };
    const palette = getColor(600);



    return <React.Fragment>
        <ListItem button onClick={handleClickList}>
            <ListItemIcon>
                <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary={Text("selectcolor" + mode)} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ColorPalette palette={palette} onSelect={handleMenuItemClick} size={32} />
                <ListItem key={"resetcolor"} button onClick={(event) => ResetColor(mode==="primary")}>
                    <ListItemText primary={Text("resetcolor")} />
                </ListItem>
            </List>
        </Collapse>
    </React.Fragment>

}
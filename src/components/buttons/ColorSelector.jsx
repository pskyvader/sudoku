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

import Text from '../../languages/Language';
import { ThemeContext } from '../../ContextProviders/ThemeContext';




const colors = {
    red: red,
    pink: pink,
    purple: purple,
    deepPurple: deepPurple,
    indigo: indigo,
    blue: blue,
    lightBlue: lightBlue,
    cyan: cyan,
    teal: teal,
    green: green,
    lightGreen: lightGreen,
    lime: lime,
    yellow: yellow,
    amber: amber,
    orange: orange,
    deepOrange: deepOrange,
    brown: brown,
    grey: grey,
    blueGrey: blueGrey,
};

const getColor = (hue) => {
    var palette = {};
    for (const [key, value] of Object.entries(colors)) {
        palette[key] = value[hue];
    }
    return palette;
}


export default function ColorSelector({ mode = "primary" }) {
    const { SetColor, ResetColor,DarkMode } = useContext(ThemeContext);

    // set selected language by calling context method
    const handleMenuItemClick = (key) => {
        setOpen(false);
        const selectedcolor = {
            light: colors[key][600],
            dark: colors[key][900]
        }
        SetColor(selectedcolor, mode === "primary");
    }
    const Reset=()=>{
        setOpen(false);
        ResetColor(mode === "primary");
    }

    const [open, setOpen] = React.useState(false);

    const handleClickList = () => {
        setOpen(!open);
    };
    const palette = (DarkMode)? getColor(900): getColor(600);



    return <React.Fragment>
        <ListItem button onClick={handleClickList}>
            <ListItemIcon>
                <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary={Text("selectcolor" + mode)} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" >
                <ListItem key={"selectcolor"} button onClick={handleClickList}>
                    <ColorPalette palette={palette} onSelect={handleMenuItemClick} size={36} />
                </ListItem>
                <ListItem key={"resetcolor"} button onClick={Reset}>
                    <ListItemText inset primary={Text("resetcolor")} />
                </ListItem>
            </List>
        </Collapse>
    </React.Fragment>

}
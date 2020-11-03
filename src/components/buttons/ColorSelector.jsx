import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

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



const useStyles = makeStyles((theme) => ({
    select: {
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(1, 0)
    },
    icon: {
        margin: theme.spacing(1),
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));


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

const getColor=(hue)=>{
    console.log(Object.entries(colors));
    
    var palette = {};
      return palette;
}


export default function LanguageSelector({ mode = "button" }) {
    const classes = useStyles();
    // const { userLanguage, userLanguageChange } = useContext(LanguageContext);
    const selectedcolor = "red";

    // set selected language by calling context method
    const handleMenuItemClick = (key,value) => {

        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickList = () => {
        setOpen(!open);
    };
    const palette=getColor(800);



    return <React.Fragment>
        <ListItem button onClick={handleClickList}>
            <ListItemIcon>
                <PaletteIcon />
            </ListItemIcon>
            <ListItemText primary={Text("selectcolor")} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ColorPalette palette={palette} className={classes.nested} onSelect={handleMenuItemClick} size={32} />
                {/* {Object.entries(palette).map(([id, name]) => (
                    <ListItem key={id} selected={id === selectedcolor} button className={classes.nested} onClick={(event) => handleMenuItemClick(event, id)}>
                        <ListItemIcon>
                            {id}
                        </ListItemIcon>
                        <ListItemText primary={name} />
                    </ListItem>
                ))} */}
            </List>
        </Collapse>
    </React.Fragment>

}
import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LanguageIcon from '@material-ui/icons/Language';

import {
    amber, blue, blueGrey, brown, common, cyan,
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



export default function LanguageSelector({ mode = "button" }) {
    const classes = useStyles();
    // const { userLanguage, userLanguageChange } = useContext(LanguageContext);
    const selectedcolor = "red";

    // set selected language by calling context method
    const handleMenuItemClick = (e, id) => {
        console.log(e);
        setOpen(false);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickList = () => {
        setOpen(!open);
    };
    const palette = {
        amber: amber[800],
        blue: blue[800],
        blueGrey: blueGrey[800],
        brown: brown[800],
        cyan: cyan[800],
        deepOrange: deepOrange[800],
        deepPurple: deepPurple[800],
        green: green[800],
        grey: grey[800],
        indigo: indigo[800],
        lightBlue: lightBlue[800],
        lightGreen: lightGreen[800],
        lime: lime[800],
        orange: orange[800],
        pink: pink[800],
        purple: purple[800],
        red: red[800],
        teal: teal[800],
        yellow: yellow[800]
    };
    return <React.Fragment>
        <ListItem button onClick={handleClickList}>
            <ListItemIcon>
                <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={Text("selectcolor")} />
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ColorPalette palette={palette} className={classes.nested} onSelect={(event) => handleMenuItemClick(event)} />
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
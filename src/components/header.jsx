import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

import { DifficultyButtons,DarkModeButton } from './Buttons';



const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    menuButton: { marginRight: theme.spacing(2), },
    title: { flexGrow: 1, }
}));


export default function ButtonAppBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <DarkModeButton {...props}/>
                    <Typography variant="h6" className={classes.title}> Sudoku 
                    </Typography>
                    

                    <DifficultyButtons {...props} />
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

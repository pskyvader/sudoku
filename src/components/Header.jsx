import React, { lazy, Suspense } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

// import { DifficultyButtons, DarkModeButton } from './Buttons';
const DifficultyButtons = lazy(() => import('./buttons/DifficultyButtons'));
const DarkModeButton = lazy(() => import('./buttons/DarkModeButton'));
const LanguageSelector = lazy(() => import('./buttons/LanguageSelector'));



const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    margin: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(0.5),
        },
    }
}));

const renderLoader = () => null;

export default function ButtonAppBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Hidden smUp>
                        <div className={classes.root}></div>
                    </Hidden>
                    <Hidden xsDown>
                        <Typography variant="h6" className={classes.root}> Sudoku </Typography>
                    </Hidden>
                    <Suspense fallback={renderLoader()}>
                        <div className={classes.margin}>
                            <LanguageSelector />
                        </div>
                    </Suspense>
                    <Suspense fallback={renderLoader()}>
                        <div className={classes.margin}>
                            <DarkModeButton {...props} />
                        </div>
                    </Suspense>
                    <Suspense fallback={renderLoader()}>
                        <div className={classes.margin}>
                            <DifficultyButtons {...props} />
                        </div>
                    </Suspense>
                </Toolbar>
            </AppBar>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

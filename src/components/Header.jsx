import React, { lazy, Suspense } from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';

const DifficultyButtons = lazy(() => import('./buttons/DifficultyButtons'));
const DarkModeButton = lazy(() => import('./buttons/DarkModeButton'));
const LanguageSelector = lazy(() => import('./buttons/LanguageSelector'));
const Drawer = lazy(() => import('./Drawer'));



const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    margin: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            marginRight: theme.spacing(0.5),
        },
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
    },
}));

const renderLoader = () => "LOADING...";

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
        if (desktopOpen) {
            setdesktopOpen(!desktopOpen);
        }
    };
    const [desktopOpen, setdesktopOpen] = React.useState(false);
    const handleDesktopDrawerToggle = () => {
        setdesktopOpen(!desktopOpen);
        setTimeout(function () { window.dispatchEvent(new Event('resize')) }, theme.transitions.duration.enteringScreen);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" className={clsx(classes.appBar, {
                [classes.appBarShift]: desktopOpen,
            })}>
                <Toolbar>
                    <Hidden smUp >
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden xsDown>
                        <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDesktopDrawerToggle}>
                            <MenuIcon />
                        </IconButton>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={classes.root}></div>
                    </Hidden>
                    <Hidden smDown>
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
                    <div className={classes.margin}>
                        <Suspense fallback={renderLoader()}>
                            <DifficultyButtons {...props} />
                        </Suspense>
                    </div>
                </Toolbar>
            </AppBar>
            <Suspense fallback={renderLoader()}>
                <Drawer handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} handleDesktopDrawerToggle={handleDesktopDrawerToggle} desktopOpen={desktopOpen}>
                    <Container>
                        {props.children}
                    </Container>
                </Drawer>
            </Suspense>
        </div>
    );
}

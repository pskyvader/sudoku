import React, { lazy, Suspense } from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const DarkModeButton = lazy(() => import('./buttons/DarkModeButton'));
const LanguageSelector = lazy(() => import('./buttons/LanguageSelector'));
const DifficultyButtons = lazy(() => import('./buttons/DifficultyButtons'));
const ServiceWorker = lazy(() => import('./buttons/ServiceWorker'));
const ColorSelector = lazy(() => import('./buttons/ColorSelector'));



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
        backgroundColor:theme.palette.background.paper
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: -drawerWidth,
        },
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        [theme.breakpoints.up('sm')]: {
            marginLeft: 0,
        },
    },
}));


const renderLoader = () => null;

function ResponsiveDrawer(props) {
    const {
        children,
        handleDrawerToggle,
        mobileOpen,
        handleDesktopDrawerToggle,
        desktopOpen
    } = props;

    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            {navigator.language +","+navigator.userLanguage}
            <Divider />
            <List>
                <Suspense fallback={renderLoader()}>
                    <DarkModeButton mode="list" />
                </Suspense>
                <Suspense fallback={renderLoader()}>
                    <LanguageSelector mode="list" />
                </Suspense>
            </List>
            <Divider />
            <Suspense fallback={renderLoader()}>
                <DifficultyButtons mode="list" />
            </Suspense>
            <Divider />
            <Suspense fallback={renderLoader()}>
                <ColorSelector mode="primary" />
                <ColorSelector mode="secondary" />
            </Suspense>
            <Divider />
            <Suspense fallback={renderLoader()}>
                <ServiceWorker mode="list" />
            </Suspense>
        </div>
    );


    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper, }}
                        ModalProps={{ keepMounted: true, /* Better open performance on mobile.*/ }} >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        className={classes.drawer}
                        classes={{ paper: classes.drawerPaper, }}
                        variant="persistent"
                        open={desktopOpen}
                        onClose={handleDesktopDrawerToggle} >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={clsx(classes.content, { [classes.contentShift]: desktopOpen, })}>
                {children}
            </main>
        </div>
    );
}


export default ResponsiveDrawer;

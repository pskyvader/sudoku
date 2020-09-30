import React, { lazy, Suspense } from 'react';
import clsx from 'clsx';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const DarkModeButton = lazy(() => import('./buttons/DarkModeButton'));
const LanguageSelector = lazy(() => import('./buttons/LanguageSelector'));

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


const renderLoader = () => "LOADING...";

function ResponsiveDrawer(props) {
    const { window, children, handleDrawerToggle, mobileOpen, handleDesktopDrawerToggle, desktopOpen } = props;
    const classes = useStyles();
    const theme = useTheme();

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />

            <List>
                <Suspense fallback={renderLoader()}>
                    <DarkModeButton {...props} mode="list" />
                </Suspense>
                <Suspense fallback={renderLoader()}>
                    <LanguageSelector mode="list" />
                </Suspense>


                {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{ paper: classes.drawerPaper, }}
                        ModalProps={{ keepMounted: true, /* Better open performance on mobile.*/ }} >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
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

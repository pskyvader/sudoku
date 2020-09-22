import React, { lazy, Suspense } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';

// import { DifficultyButtons, DarkModeButton } from './Buttons';
const DifficultyButtons = lazy(() => import('./buttons/DifficultyButtons'));
const DarkModeButton = lazy(() => import('./buttons/DarkModeButton'));
const LanguageSelector = lazy(() => import('../languages/Language'));



const useStyles = makeStyles((theme) => ({
    root: { flexGrow: 1, },
    menuButton: { marginRight: theme.spacing(2), },
    title: { flexGrow: 1, }
}));

const renderLoader = () => null;

export default function ButtonAppBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}>Sudoku </Typography>
                    <Suspense fallback={renderLoader()}>
                        <LanguageSelector />
                    </Suspense>
                    <Suspense fallback={renderLoader()}>
                        <DarkModeButton {...props} />
                    </Suspense>
                    <Suspense fallback={renderLoader()}>
                        <DifficultyButtons {...props} />
                    </Suspense>
                </Toolbar>
            </AppBar>
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

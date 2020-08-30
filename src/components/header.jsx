import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import SudokuResolver from "../logic/SudokuResolver";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar(props) {
    const classes = useStyles();
    const { setBoard } = props;
    function handleClick(e) {
        e.preventDefault();
        const newboard=new SudokuResolver(45);
        setBoard(null);
        setBoard(newboard);
    }
    return (
        <div className={classes.root}>
            <AppBar position="fixed">
                <Toolbar>
                    {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton> */}
                    <Typography variant="h6" className={classes.title}> Sudoku </Typography>
                    <Button color="inherit" onClick={handleClick}>Reset</Button>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container>
                {props.children}
            </Container>
        </div>
    );
}

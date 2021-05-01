import React, { Component} from 'react';
import './assets/img/css/admin.css';

import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

//Drawer imports
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

import Sidebar from './Common/Sidebar';

const drawerWidth = 240;
const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24
    },
    appBarSpace: theme.mixins.toolbar,
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        /*transistion: theme.transistions.create(['width', 'margin'], {
            easing: theme.transistions.easing.sharp,
            duration: theme.transistions.duration.leavingScreen,
        }),*/
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        /*transistion: theme.transistions.create(['width', 'margin'], {
            easing: theme.transistions.easing.sharp,
            duration: theme.transistions.duration.enteringScreen,
        }),*/
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        /*transistion: theme.transistions.create('width', {
            easing: theme.transistions.easing.sharp,
            duration: theme.transistions.duration.enteringScreen
        }),*/
    },
    drawerpaperClose: {
        overflowX: 'hidden',
        width: theme.spacing.unit * 7,// leaves space showing the icon
        /*transistion: theme.transistions.create('width', {
            easing: theme.transistions.easing.sharp,
            duration: theme.transistions.duration.enteringScreen
        }),*/
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "flex-end",
        flexDirection: "column",
        jutifyContent: "flex-end",
        padding: '8px 8px',
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto'
    },
})


class AdminWrapper extends Component {
    constructor(props){
        super(props);

        this.state = {
            open: true
        }
    }

    handleDrawerOpen = (e) => {
        this.setState({open: true});
    }

    handleDrawerClose = (e) => {
        this.setState({open: false});
    }


    render(){
        const {classes} = this.props;
        return (
            <div id='admin-page' className={classes.root}>
                <AppBar className={clsx(classes.appBar, this.state.open && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerOpen}>
                            <MenuIcon />
                        </IconButton>
                        <Typography 
                            component='h1'
                            variant='h6'
                            color='inherit'
                            noWrap
                        >Admin</Typography>
                    </Toolbar>
                </AppBar>

                <Drawer
                    classes={{
                        paper: clsx(classes.drawerPaper, !this.state.open && classes.drawerpaperClose)
                    }}
                    variant='permanent'
                    open={true}
                    >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={this.handleDrawerClose}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    {/*<List>
                        <ListItem>Dashboard</ListItem>
                    </List>*/}
                    <Sidebar />
                </Drawer>
                
                <main className={classes.content}>{/*className={classes.content}*/}
                    <div className={classes.appBarSpace} />{/*used to give spacing btw appbar and contents*/}
                    {this.props.children}
                </main>

            </div>
        );
    }
}

export default withStyles(styles)(AdminWrapper);
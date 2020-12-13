import React, { useContext } from 'react';
import { Link } from '@reach/router'
import { UserContext } from '../contexts/User'
import AvatarDisplay from './AvatarDisplay'

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        flexShrink: 1,
        marginBottom: '30px',
        background: '#392f47',
        color: '#FFFFFF',
        // height: '64px',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    appBar: {
        background: '#392f47',
    },
    title: {
        flexGrow: 1,
        flexShrink: 1,
        fontSize: '30px',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'left',
    },
    loginToggle: {
        width: '100px',
        marginTop: '60px',
        marginLeft: 'auto',
        marginRight: '40px',
    }
}));

export default function Header() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const { loggedInUser, logout, login } = useContext(UserContext)

    const handleChange = (event) => {
        setAuth(event.target.checked);
        (auth ? logout() : login('cooljmessy'))

    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h1" className={classes.title}>
                        <Link to='/' style={{ textDecoration: 'none' }} id='HEADER'>Mr Men News</Link>
                    </Typography>


                    {auth && (
                        <div id='user-info-in-appbar'>
                            <div>
                                <p>Logged in as </p><p>{loggedInUser}</p></div>

                            <Link to={`/users/${loggedInUser}`} style={{ textDecoration: 'none' }}>
                                <AvatarDisplay author={loggedInUser} /></Link>


                        </div>
                    )}

                </Toolbar>
            </AppBar>
            <FormGroup className={classes.loginToggle}>
                <FormControlLabel
                    label={auth ? 'Logout' : 'Login'}
                    labelPlacement="start"
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                />
            </FormGroup>
        </div >
    );
}

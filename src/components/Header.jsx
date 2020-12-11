import React, { useContext } from 'react';
import { Link } from '@reach/router'
import { UserContext } from '../contexts/User'
import AvatarDisplay from './AvatarDisplay'

// const Header = () => {
//     const { loggedInUser, logout, login } = useContext(UserContext)
//     return (
//         <header>
//             <Link to="/" style={{ textDecoration: 'none' }}>
//                 <h1>Mr Men News</h1>
//             </Link>
//             {loggedInUser ? (
//                 <div>
//                     <p>Welcome {loggedInUser}</p>
//                     <button onClick={logout}>Logout</button>
//                 </div>
//             ) : (
//                     <div>
//                         <button onClick={() => { login('cooljmessy') }}>Login</button>
//                     </div>
//                 )}
//         </header>
//     );
// };

// export default Header;

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//         marginBottom: '30px',
//         justifyContent: 'space between',
//     },
//     title: {
//         flexGrow: 1,
//     },
// }));

// export default function Header() {
//     const classes = useStyles();
//     const { loggedInUser, logout, login } = useContext(UserContext)

//     return (
//         <div className={classes.root}>
//             <AppBar position="static">
//                 <Toolbar>
//                     <Typography className={classes.title}>
//                         <Link to="/" style={{ textDecoration: 'none' }}>
//                             <h1>Mr Men News</h1>
//                         </Link>
//                     </Typography>
//                     {loggedInUser ? (
//                         <div>
//                             <p>Welcome {loggedInUser}</p>
//                             <Button onClick={logout}>Logout</Button>
//                         </div>
//                     ) : (
//                             <div>
//                                 <Button onClick={() => { login('cooljmessy') }}>Login</Button>
//                             </div>
//                         )}
//                 </Toolbar>
//             </AppBar>
//         </div>
//     );
// }

// import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: '30px',
        background: '#668406',//'#392f47',
        color: '#FFFFFF',

    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        color: '#FFFFFF',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'left',
    },
    loginToggle: {
        width: '100px',
        textAlign: 'right',
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
        { auth ? logout() : login('cooljmessy') }

    };

    return (
        <div className={classes.root}>

            {/* <AppBar position="static"> */}
            <Toolbar>
                <Typography variant="h3" className={classes.title}>
                    <Link to='/' style={{ textDecoration: 'none' }}>Mr Men News</Link>
                </Typography>


                {auth && (
                    <div id='user-info-in-appbar'>
                        <p>Logged in as {loggedInUser}</p>

                        <Link to={`/users/${loggedInUser}`} style={{ textDecoration: 'none' }}>
                            <AvatarDisplay author={loggedInUser} /></Link>


                    </div>
                )}

            </Toolbar>
            {/* </AppBar> */}
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

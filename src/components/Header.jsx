import React, { useContext } from 'react';
import { Link } from '@reach/router'
import { UserContext } from '../contexts/User'

const Header = () => {
    const { loggedInUser, logout, login } = useContext(UserContext)
    return (
        <header>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h1>Mr Men News</h1>
            </Link>
            {loggedInUser ? (
                <div>
                    <p>Welcome {loggedInUser}</p>
                    <button onClick={logout}>Logout</button>
                </div>
            ) : (
                    <div>
                        <button onClick={() => { login('cooljmessy') }}>Login</button>
                    </div>
                )}
        </header>
    );
};

export default Header;
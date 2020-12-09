import React from 'react';
import { Link } from '@reach/router'

const Header = () => {
    return (
        <Link to="/" style={{ textDecoration: 'none' }}>
            <h1>Mr Men News</h1>
        </Link>
    );
};

export default Header;
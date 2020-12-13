import { React } from "react";

import Nav from "./Nav/Nav";

import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <h1 className="header__site-name">Fake Shop</h1>
            <Nav />
        </header>
    )
}

export default Header;
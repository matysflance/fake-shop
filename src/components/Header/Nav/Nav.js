import { React } from "react";
import { useGlobalContext } from '../../../context';

import './Nav.css';

const Nav = () => {
    const { isNavOpen, toggleNav } = useGlobalContext();

    return (
        <nav className="header__nav nav">
            <a href="/basket" className="nav__basket-mobile">
                Basket Icon
                <span className="nav__basket-count">0</span>
            </a>
            <ul className={`nav__list ${isNavOpen ? 'nav__list--open' : ''}`}>
                <li className="nav__item">
                    <a href="/home" className="nav__link">
                        Home
                    </a>
                </li>
                <li className="nav__item">
                    <a href="/home" className="nav__link">
                        Home
                    </a>
                </li>
                <li className="nav__item">
                    <a href="/home" className="nav__link">
                        Home
                    </a>
                </li>
                <li className="nav__item">
                    <a href="/home" className="nav__link">
                        Home
                    </a>
                </li>
                <li className="nav__basket-desktop">
                    <a href="/home" className="nav__link">
                        Basket (0)
                    </a>
                </li>
            </ul>
            <button className="nav__menu-toggler" onClick={toggleNav}>Toggler</button>
        </nav>
    )
}

export default Nav;
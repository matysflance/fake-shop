import React from "react";
import { useGlobalContext } from '../../../context';

import './Nav.css';

const Nav = () => {
    const { isNavOpen, toggleNav, categories } = useGlobalContext();

    return (
        <nav className="header__nav nav">
            <a href="/basket" className="nav__basket-mobile">
                Basket Icon
                <span className="nav__basket-count">0</span>
            </a>
            <ul className={`nav__list ${isNavOpen ? 'nav__list--open' : ''}`}>
                {categories.length && categories.map((category, index) => {
                    return <li className="nav__item" key={index}>
                        <a href="/home" className="nav__link">
                            {category}
                        </a>
                    </li>
                })}

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
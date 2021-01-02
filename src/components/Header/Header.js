import React, { useState } from "react";
import { NavLink } from 'react-router-dom';
import { useBasketContext } from '../../context/BasketContextProvider';

import './Header.css';

export const Header = ({ isLoadingCategories, categories }) => {
    const { basketCount } = useBasketContext();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(prevState => !prevState);

    return (
        <header className="header">
            <h1 className="header__site-name">Fake Shop</h1>

            <nav className="header__nav nav">
                <NavLink to="/basket" className="nav__basket-mobile">
                    Basket Icon
                    <span className="nav__basket-count">{basketCount}<span className="sr-only">{basketCount === 0 || basketCount > 1 ? 'items' : 'item'} in the basket</span></span>
                </NavLink>
                <ul className={`nav__list ${isNavOpen ? 'nav__list--open' : ''}`}>
                    <li className="nav__item">
                        <NavLink to="/" className="nav__link" exact>
                            Home
                        </NavLink>
                    </li>

                    {isLoadingCategories ? (
                        <span>loading categories...</span>
                    ) : (
                            categories.map((category) => {
                                const { name, slug } = category;
                                /* in this case, categories are unique, therefore can be used as key */
                                return <li className="nav__item" key={slug}>
                                    <NavLink to={`/category/${slug}`} className="nav__link">
                                        {name}
                                    </NavLink>
                                </li>
                            })
                        )}

                    <li className="nav__basket-desktop">
                        <NavLink to="/basket" className="nav__link">
                            Basket ({basketCount}<span className="sr-only">{basketCount > 1 ? 'items' : 'item'} in the basket</span>)
                        </NavLink>
                    </li>
                </ul>
                <button className="nav__menu-toggler" onClick={toggleNav}>Toggler</button>
            </nav>
        </header>
    )
}
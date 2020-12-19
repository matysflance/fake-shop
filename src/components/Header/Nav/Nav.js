import React from "react";
import { useGlobalContext } from '../../../context';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
    const { isNavOpen, toggleNav, categories, basketCount, products, setProducts } = useGlobalContext();
    console.log(categories);

    const handleFilterByCategory = (category) => {
        // need to do it some other way, as when I filter products, state changes and "extractCategories()" in App.js that generates categories generates only one category, because all products in current state come from one category
        //setProducts(products.filter(product => product.category === category));
        console.log(category);
    }

    return (
        <nav className="header__nav nav">
            <Link to="/basket" className="nav__basket-mobile">
                Basket Icon
                <span className="nav__basket-count">{basketCount}</span>
            </Link>
            <ul className={`nav__list ${isNavOpen ? 'nav__list--open' : ''}`}>
                <li className="nav__item">
                    <Link to="/" className="nav__link">
                        Home
                    </Link>
                </li>

                {categories.length && categories.map((category, index) => {
                    return <li className="nav__item" key={index}>
                        <button className="nav__link" onClick={() => handleFilterByCategory(category)}>
                            {category}
                        </button>
                    </li>
                })}

                <li className="nav__basket-desktop">
                    <Link to="/basket" className="nav__link">
                        Basket ({basketCount})
                    </Link>
                </li>
            </ul>
            <button className="nav__menu-toggler" onClick={toggleNav}>Toggler</button>
        </nav>
    )
}

export default Nav;
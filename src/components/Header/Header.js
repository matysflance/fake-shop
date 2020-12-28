import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context';

import './Header.css';

const Header = ({ isLoadingCategories, categories }) => {
    const { basket } = useGlobalContext();
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => setIsNavOpen(prevState => !prevState);

    // const handleFilterByCategory = (category) => {
    //     // need to do it some other way, as when I filter products, state changes and "extractCategories()" in App.js that generates categories generates only one category, because all products in current state come from one category
    //     console.log(category);
    //     if (category === 'all') {
    //         setProducts(allProducts);
    //         return;
    //     }

    //     const filteredProducts = allProducts.filter(product => product.category === category);
    //     setProducts(filteredProducts);
    // }

    return (
        <header className="header">
            <h1 className="header__site-name">Fake Shop</h1>

            <nav className="header__nav nav">
                <Link to="/basket" className="nav__basket-mobile">
                    Basket Icon
                    <span className="nav__basket-count">{basket.count}</span>
                </Link>
                <ul className={`nav__list ${isNavOpen ? 'nav__list--open' : ''}`}>
                    <li className="nav__item">
                        <Link to="/" className="nav__link">
                            Home
                        </Link>
                    </li>

                    {isLoadingCategories ? (
                        <span>loading categories...</span>
                    ) : (
                            categories.map((category, index) => {
                                return <li className="nav__item" key={index}>
                                    {/* <Link to="/" className="nav__link" onClick={() => handleFilterByCategory(category)}> */}
                                    <Link to="/" className="nav__link">
                                        {category}
                                    </Link>
                                </li>
                            })
                        )}

                    <li className="nav__basket-desktop">
                        <Link to="/basket" className="nav__link">
                            Basket ({basket.count})
                        </Link>
                    </li>
                </ul>
                <button className="nav__menu-toggler" onClick={toggleNav}>Toggler</button>
            </nav>
        </header>
    )
}

export default Header;
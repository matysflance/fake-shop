import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useBasketContext } from '../../context';

import './Header.css';

export const Header = ({ isLoadingCategories, categories }) => {
    const { basketCount } = useBasketContext();
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
                    <span className="nav__basket-count">{basketCount}</span>
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
                            categories.map((category) => {
                                const { name, slug } = category;
                                /* in this case, categories are unique, therefore can be used as key */
                                return <li className="nav__item" key={slug}>
                                    {/* <Link to="/" className="nav__link" onClick={() => handleFilterByCategory(category)}> */}
                                    <Link to={`/category/${slug}`} className="nav__link">
                                        {name}
                                    </Link>
                                </li>
                            })
                        )}

                    <li className="nav__basket-desktop">
                        <Link to="/basket" className="nav__link">
                            Basket ({basketCount})
                        </Link>
                    </li>
                </ul>
                <button className="nav__menu-toggler" onClick={toggleNav}>Toggler</button>
            </nav>
        </header>
    )
}
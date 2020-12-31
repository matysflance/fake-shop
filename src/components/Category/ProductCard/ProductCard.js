import React, { useState } from "react";
import { useAlertContext, useBasketContext } from '../../../context';
import { formatPrice } from '../../../util';

import './ProductCard.css';

export const ProductCard = ({ product }) => {
    const { category, description, id, image, price, title } = product;

    const { displayAlert } = useAlertContext();
    const { addProductToBasket } = useBasketContext();
    const [quantity, setQuantity] = useState(1);

    const handleAddToBasket = (e) => {
        e.preventDefault();
        addProductToBasket({...product, quantity});
        setQuantity(1);
        displayAlert(true, 'success', 'Product added to the basket!');
    }

    return (
        <article className="home__product product">
            <div className="product__image-wrapper">
                <img src={image} alt={title} className="product__image" />
            </div>
            <div className="product__info">
                <p className="product__category">{category}</p>
                <h2 className="product__name">{title}</h2>
                <div className="product__description">
                    {description}
                </div>
                <footer className="product__footer">
                    <div className="product__price"><span className="sr-only">Product price:</span>&pound;{formatPrice(price)}</div>
                    <form className="product__form" onSubmit={(e) => handleAddToBasket(e)}>
                        <span className="sr-only">Select quantity:</span>
                        <select id={`qty_${id}`} value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button className="btn btn-primary">Add to Basket</button>
                    </form>
                </footer>
            </div>
        </article>
    )
}
import React from 'react';
import { useBasketContext } from '../../../context';
import { formatPrice } from '../../../util';

import './BasketItem.css';

const BasketItem = ({ item: {id, title, image, quantity, price} }) => {
    const {increaseQuantity, decreaseQuantity, removeItemFromBasket} = useBasketContext();

    const handleIncreaseQuantity = () => {
        increaseQuantity(id);
    }
    const handleDecreaseQuantity = () => {
        if (quantity <= 1) {
            removeItemFromBasket(id);
        } else {
            decreaseQuantity(id);
        }
    }
    const handleRemoveItem = () => {
        removeItemFromBasket(id);
    }

    return (
        <li className="basket__item basket-item">
            <div className="basket-item__info">
                <img src={image} alt={title} className="basket-item__image" />
                {title} (£{formatPrice(price)})
            </div>
            <div className="basket-item__qty">
                <form className="basket-item__qty-form">
                    <button type="button" onClick={handleDecreaseQuantity}>-</button>
                    <input type="number" className="basket-item__qty-field" name={`qty_${id}`} id={`qty_${id}`} value={quantity} />
                    <button type="button" onClick={handleIncreaseQuantity}>+</button>
                </form>
                <button onClick={handleRemoveItem}>X</button>
            </div>
        </li>
    )
}

export default BasketItem;
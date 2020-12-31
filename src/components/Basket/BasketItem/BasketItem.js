import React from 'react';
import { useBasketContext } from '../../../context';
import { formatPrice } from '../../../util';

import './BasketItem.css';

const calculateSubtotal = (price, quantity) => price * quantity;

export const BasketItem = ({ item: { id, title, image, quantity, price } }) => {
    const { increaseQuantity, decreaseQuantity, updateQuantity, removeItemFromBasket } = useBasketContext();

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

    const handleChangeQuantity = (e) => {
        updateQuantity(id, parseInt(e.target.value));
    }

    const handleRemoveItem = () => {
        removeItemFromBasket(id);
    }

    return (
        <li className="basket__item basket-item">
            <div className="basket-item__info-wrapper">
                <div className="basket-item__info">
                    <img src={image} alt={title} className="basket-item__image" />
                    <p>{title}</p> (<span className="sr-only">Product price:</span>&pound;{formatPrice(price)})
                </div>
                <div className="basket-item__subtotal">
                    Subtotal: &pound;{formatPrice(calculateSubtotal(price, quantity))}
                </div>
            </div>
            <div className="basket-item__qty">
                <span className="sr-only">Quantity:</span>
                <form className="basket-item__qty-form" onSubmit={(e) => e.preventDefault()}>
                    <button type="button" onClick={handleDecreaseQuantity}>-</button>
                    <input type="number" className="basket-item__qty-field" name={`qty_${id}`} id={`qty_${id}`} value={quantity} onChange={(e) => handleChangeQuantity(e)}/>
                    <button type="button" onClick={handleIncreaseQuantity}>+</button>
                </form>
                <button onClick={handleRemoveItem}>X</button>
            </div>
        </li>
    )
}
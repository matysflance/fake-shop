import React, { useState } from 'react';
// import useGlobalContext from '../../../context';

import './BasketItem.css';

const BasketItem = ({ item }) => {
    // const { basket, setBasket, setBasketCount } = useGlobalContext();

    const [quantity, setQuantity] = useState(item.quantity);

    //todo: 
    //1. when same product is added to the basket, merge quantity instead of adding another item
    //2. when using setBasket, use setBasketCount - this will eliminate a bit of repetetiveness
    //3. if quantity is 0, just remove product from basket
    const decreaseQuantity = () => {
        let newQty = validateQuantity(quantity - 1);
        setQuantity(newQty);
    }
    const increaseQuantity = () => {
        let newQty = validateQuantity(quantity + 1);
        setQuantity(newQty);
    }

    const validateQuantity = (quantityToBe) => {
        if (quantityToBe < 0) {
            return 0;
        }
        return quantityToBe;
    }

    return (
        <li className="basket__item basket-item">
            <div className="basket-item__info">
                <img src={item.image} alt={item.title} className="basket-item__image" />
                {item.title}
            </div>
            <div className="basket-item__qty">
                <form className="basket-item__qty-form">
                    <button type="button" onClick={decreaseQuantity}>-</button>
                    <input type="number" name={`qty_${item.id}`} id={`qty_${item.id}`} value={quantity} />
                    <button type="button" onClick={increaseQuantity}>+</button>
                </form>
            </div>
        </li>
    )
}

export default BasketItem;
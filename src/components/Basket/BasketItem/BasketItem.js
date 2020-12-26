import React, { useState } from 'react';
import { useGlobalContext } from '../../../context';

import './BasketItem.css';

const BasketItem = ({ item }) => {
    const { basket, setBasket } = useGlobalContext();

    const [quantity, setQuantity] = useState(item.quantity);

    const decreaseQuantity = (id) => {
        const newQty = validateQuantity(quantity - 1);
        const newBasket = generateUpdatedBasket(id, newQty);
        setBasket(newBasket);
        setQuantity(newQty);
    }
    const increaseQuantity = (id) => {
        const newQty = validateQuantity(quantity + 1);
        const newBasket = generateUpdatedBasket(id, newQty);
        setBasket(newBasket);
        setQuantity(newQty);
    }

    const removeItemFromBasket = (id) => {
        const newBasket = generateUpdatedBasket(id, 0);
        setBasket(newBasket);
    }

    const validateQuantity = (quantityToBe) => {
        if (quantityToBe < 0) {
            return 0;
        }
        return quantityToBe;
    }

    const generateUpdatedBasket = (productId, newQuantity) => {
        const tempBasket = { ...basket };
        const itemToUpdateKey = tempBasket.products.findIndex(item => item.id === productId);
        const productToUpdate = tempBasket.products[itemToUpdateKey];
        //if new quantity is 0, it simply means that we need to remove item from basket and adjust basket totals
        if (newQuantity === 0) {
            tempBasket.count -= productToUpdate.quantity;
            tempBasket.total -= parseFloat(productToUpdate.price * productToUpdate.quantity);
            tempBasket.products.splice(itemToUpdateKey, 1);
        } else {
            // when quantity difference will be less than 0 - we're decreasing quantity, else if it's more than 0, we're increasing quantity
            // also, make sure to make any changes if there actually was a quantity update (when diff is not 0)
            const quantityDifference = newQuantity - quantity;
            if (quantityDifference !== 0) {
                productToUpdate.quantity = newQuantity;
                tempBasket.count += quantityDifference;
                tempBasket.total += parseFloat(quantityDifference * productToUpdate.price);
            }
        }

        return tempBasket;
    }

    return (
        <li className="basket__item basket-item">
            <div className="basket-item__info">
                <img src={item.image} alt={item.title} className="basket-item__image" />
                {item.title} (£{item.price.toFixed(2)})
            </div>
            <div className="basket-item__qty">
                <form className="basket-item__qty-form">
                    <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <input type="number" className="basket-item__qty-field" name={`qty_${item.id}`} id={`qty_${item.id}`} value={quantity} />
                    <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
                </form>
                <button onClick={() => removeItemFromBasket(item.id)}>X</button>
            </div>
        </li>
    )
}

export default BasketItem;
import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context';

import './BasketItem.css';

const BasketItem = ({ item }) => {
    const { basket, setBasket, setBasketCount } = useGlobalContext();

    const [quantity, setQuantity] = useState(item.quantity);

    //todo: 
    //1. when same product is added to the basket, merge quantity instead of adding another item - will work on next (not in this component though)

    //2. when using setBasket, use setBasketCount - this will eliminate a bit of repetetiveness - DONE
    useEffect(() => {
        let totalBasketCount = 0;
        basket.forEach(item => totalBasketCount += item.quantity);
        setBasketCount(totalBasketCount);
    }, [basket, setBasket])

    const decreaseQuantity = (id) => {
        let newQty = validateQuantity(quantity - 1);
        //3. if quantity is 0, just remove product from basket - DONE
        if (newQty === 0) {
            removeItemFromBasket(id);
        } else {
            const tempBasket = [...basket];
            const itemToUpdateKey = basket.findIndex(item => item.id === id);
            tempBasket[itemToUpdateKey].quantity = newQty;
            setQuantity(newQty);
            setBasket(tempBasket);
        }
    }
    const increaseQuantity = (id) => {
        let newQty = validateQuantity(quantity + 1);
        const tempBasket = [...basket];
        const itemToUpdateKey = basket.findIndex(item => item.id === id);
        tempBasket[itemToUpdateKey].quantity = newQty;
        setQuantity(newQty);
        setBasket(tempBasket);
    }

    const validateQuantity = (quantityToBe) => {
        if (quantityToBe < 0) {
            return 0;
        }
        return quantityToBe;
    }

    const removeItemFromBasket = (productId) => {
        const tempBasket = [...basket];
        const itemToDeleteKey = basket.findIndex(item => item.id === productId);
        tempBasket.splice(itemToDeleteKey, 1);

        setBasket(tempBasket);
    }

    return (
        <li className="basket__item basket-item">
            <div className="basket-item__info">
                <img src={item.image} alt={item.title} className="basket-item__image" />
                {item.title}
            </div>
            <div className="basket-item__qty">
                <form className="basket-item__qty-form">
                    <button type="button" onClick={() => decreaseQuantity(item.id)}>-</button>
                    <input type="number" className="basket-item__qty-field" name={`qty_${item.id}`} id={`qty_${item.id}`} value={quantity} />
                    <button type="button" onClick={() => increaseQuantity(item.id)}>+</button>
                </form>
            </div>
        </li>
    )
}

export default BasketItem;
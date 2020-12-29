import React from 'react';

import BasketItem from './BasketItem/BasketItem';

import { useBasketContext } from '../../context';
import './Basket.css';

const Basket = () => {
    const { basket, basketTotal } = useBasketContext();

    // const decreaseQuantity = (id) => {
    //     const newQty = validateQuantity(quantity - 1);
    //     const newBasket = generateUpdatedBasket(id, newQty);
    //     setBasket(newBasket);
    //     setQuantity(newQty);
    // }
    // const increaseQuantity = (id) => {
    //     const newQty = validateQuantity(quantity + 1);
    //     const newBasket = generateUpdatedBasket(id, newQty);
    //     setBasket(newBasket);
    //     setQuantity(newQty);
    // }

    // const removeItemFromBasket = (id) => {
    //     const newBasket = generateUpdatedBasket(id, 0);
    //     setBasket(newBasket);
    // }

    // const validateQuantity = (quantityToBe) => {
    //     if (quantityToBe < 0) {
    //         return 0;
    //     }
    //     return quantityToBe;
    // }

    // const generateUpdatedBasket = (productId, newQuantity) => {
    //     const tempBasket = { ...basket };
    //     const itemToUpdateKey = tempBasket.findIndex(item => item.id === productId);
    //     //if new quantity is 0, it simply means that we need to remove item from basket and adjust basket totals
    //     if (newQuantity === 0) {
    //         tempBasket.splice(itemToUpdateKey, 1);
    //     }

    //     return tempBasket;
    // }

    return (
        <>
            <h1 className="page-title">Basket</h1>
            <div className="basket">
                {basket.length ? (
                    <>
                        <div className="basket__info">
                            <h2>Your Items</h2>
                            <ul className="basket__items">
                                {basket.map(item => {
                                    return <BasketItem key={item.id} item={item} />
                                })}
                            </ul>
                        </div>
                        <div className="basket__summary">
                            <h2>Order Summary</h2>
                            <p>total: £{parseFloat(basketTotal).toFixed(2)}</p>
                            <button>Checkout</button>
                        </div>
                    </>
                ) : (
                        <h3 className="page-title">Your basket is empty</h3>
                    )}


            </div>
        </>
    )
}

export default Basket;
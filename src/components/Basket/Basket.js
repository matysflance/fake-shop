import React from 'react';

import { BasketItem } from './BasketItem/BasketItem';

import { useBasketContext } from '../../context/BasketContextProvider';
import { formatPrice } from '../../util';

import './Basket.css';

export const Basket = () => {
    const { basket, basketTotal } = useBasketContext();

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
                            <p>total: £{formatPrice(basketTotal)}</p>
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
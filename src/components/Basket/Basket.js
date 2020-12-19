import React from 'react';

import BasketItems from './BasketItems/BasketItems';

import { useGlobalContext } from '../../context';
import './Basket.css';

const Basket = () => {
    const { basket } = useGlobalContext();
    console.log({ basket });
    return (
        <>
            <h1 className="page-title">Basket</h1>
            <div className="basket">
                {basket.length ? (
                    <>
                        <div className="basket__info">
                            <h2>Your Items</h2>
                            <BasketItems basket={basket} />
                        </div>
                        <div className="basket__summary">
                            <h2>Order Summary</h2>
                            <p>total: £111.11</p>
                            <button>Checkout</button>
                        </div>
                    </>
                ) : (
                        <h3 className="text-center">Your basket is empty</h3>
                    )}


            </div>
        </>
    )
}

export default Basket;
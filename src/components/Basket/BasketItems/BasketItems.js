import React from 'react';

import BasketItem from '../BasketItem/BasketItem';

import './BasketItems.css';

const BasketItems = ({ basket }) => {
    return (
        <ul className="basket__items">
            {basket.map(item => {
                return <BasketItem key={item.id} item={item} />
            })}
        </ul>
    )
}

export default BasketItems;
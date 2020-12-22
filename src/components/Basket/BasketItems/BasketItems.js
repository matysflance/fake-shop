import React from 'react';

import BasketItem from '../BasketItem/BasketItem';

import './BasketItems.css';

const BasketItems = ({ items }) => {
    return (
        <ul className="basket__items">
            {items.map(item => {
                return <BasketItem key={item.id} item={item} />
            })}
        </ul>
    )
}

export default BasketItems;
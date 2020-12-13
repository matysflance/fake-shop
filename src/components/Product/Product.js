import React, { useState } from "react";
import { useGlobalContext } from '../../context';

import './Product.css';

const Product = ({ category, description, id, image, price, title }) => {
    const { basket, setBasket, setBasketCount } = useGlobalContext();
    let { basketCount } = useGlobalContext();
    const [quantity, setQuantity] = useState(1);

    const handleAddToBasket = (e) => {
        e.preventDefault();
        const newItem = {
            category, description, id, image, price, title, quantity
        }
        const newBasket = [...basket, newItem];
        setBasket(newBasket);
        setBasketCount(basketCount += quantity);
    }

    console.log(basketCount);


    return (
        <article className="home__product product">
            <figure className="product__image-wrapper">
                <img src={image} alt={title} className="product__image" />
            </figure>
            <div className="product__info">
                <p className="product__category">{category}</p>
                <h2 className="product__name">{title}</h2>
                <div className="product__description">
                    {description}
                </div>
                <footer className="product__footer">
                    <div className="product__price">£{price.toFixed(2)}</div>
                    <form className="product__form" onSubmit={(e) => handleAddToBasket(e)}>
                        <select id="" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button className="btn btn-primary">Add to Basket</button>
                    </form>
                </footer>
            </div>
        </article>
    )
}

export default Product;
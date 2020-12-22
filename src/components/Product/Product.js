import React, { useEffect, useState } from "react";
import { useGlobalContext } from '../../context';

import './Product.css';

const Product = ({ category, description, id, image, price, title }) => {
    const { basket, setBasket, showAlert, setShowAlert, setAlertSettings } = useGlobalContext();
    const [quantity, setQuantity] = useState(1);

    const displayAlert = (show = false, type = '', message = '') => {
        setShowAlert(show);
        setAlertSettings({ type, message });
    }

    const handleAddToBasket = (e) => {
        e.preventDefault();
        
        //1. when same product is added to the basket, merge quantity instead of adding another item - DONE
        const currentBasketItemKey = basket.products.findIndex(item => item.id === id);
        console.log({currentBasketItemKey});
        if (currentBasketItemKey !== -1) {
            const currentQuantity = basket.products[currentBasketItemKey].quantity;
            const newQuantity = currentQuantity + quantity;
            console.log({newQuantity});
            const newBasket = [...basket];
            newBasket.products[currentBasketItemKey].quantity = newQuantity;
            setBasket(newBasket);
        } else {
            const newItem = {
                category, description, id, image, price, title, quantity
            }
            const newBasket = {
                ...basket, 
                products: [...basket.products, newItem], 
                count: basket.count+=quantity,
                total: basket.total+=price * quantity
            };
            setBasket(newBasket);
        }

        setQuantity(1);
        displayAlert(true, 'success', 'Product added to the basket!');
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [showAlert])

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
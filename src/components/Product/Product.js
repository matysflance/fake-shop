import { React } from "react";

import './Product.css';

const Product = ({ category, description, id, image, price, title }) => {
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
                    <button className="btn btn-primary">Buy now</button>
                </footer>
            </div>
        </article>
    )
}

export default Product;
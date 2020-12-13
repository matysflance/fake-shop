import { React } from "react";

import './Product.css';

const Product = () => {
    return (
        <article className="home__product product">
            <img src="https://placeimg.com/400/400/tech" alt="Product image" className="product__image" />
            <p className="product__category">Laptops</p>
            <h2 className="product__name">Name</h2>
            <div className="product__description">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti, minus.
            </div>
            <footer className="product__footer">
                <div className="product__price">£123.00</div>
                <button className="btn btn-primary">Buy now</button>
            </footer>
        </article>
    )
}

export default Product;
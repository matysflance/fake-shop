import { React } from "react";
import './Home.css';
import Product from '../Product/Product'

const Home = () => {
    return (
        <div className="home">
            <section className="home__products">
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
            </section>
        </div>
    )
}

export default Home;
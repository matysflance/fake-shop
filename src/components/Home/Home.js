import React, { useState, useEffect } from "react";
import './Home.css';
import Product from '../Product/Product';
import Loader from '../Loader';
import { useGlobalContext } from '../../context';
import { fetchProducts } from '../../api';

const Home = () => {
    const { products, setProducts } = useGlobalContext();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            setIsLoading(true);
            setProducts(await fetchProducts());
            setIsLoading(false);
        }

        fetchAPI();
    }, []);


    console.log(products);
    console.log({ isLoading });

    return (
        <div className="home">
            <section className="home__products">
                {isLoading ? (
                    <Loader />
                ) : (
                        products.length && products.map((product) => {
                            return <Product key={product.id} {...product} />
                        })
                    )}

            </section>
        </div>
    )
}

export default Home;
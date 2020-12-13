import './Home.css';
import Product from '../Product/Product';
import Loader from '../Loader';
import { useGlobalContext } from '../../context';

const Home = () => {
    const { products, isLoading } = useGlobalContext();

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
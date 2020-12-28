import './Home.css';
import Product from '../Product/Product';
import Loader from '../Loader';

const Home = ({isLoadingProducts, products}) => {

    return (
        <div className="home">
            <section className="home__products">
                {isLoadingProducts ? (
                    <Loader />
                ) : (
                        products.map((product) => {
                            return <Product key={product.id} {...product} />
                        })
                    )}

            </section>
        </div>
    )
}

export default Home;
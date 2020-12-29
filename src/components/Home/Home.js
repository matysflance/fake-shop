import './Home.css';
import { Product } from '../Product/Product';
import { Loader } from '../Loader';

export const Home = ({isLoadingProducts, products}) => {

    return (
        <div className="home">
            <div className="home__products">
                {isLoadingProducts ? (
                    <Loader />
                ) : (
                        products.map((product) => {
                            return <Product key={product.id} product={product} />
                        })
                    )}

            </div>
        </div>
    )
}
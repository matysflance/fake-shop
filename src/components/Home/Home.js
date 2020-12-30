import './Home.css';
import { Product } from '../Product/Product';
import { Loader } from '../Loader';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';

export const Home = ({isLoadingProducts, products}) => {
    const { slug } = useParams();

    const getProducts = (catSlug) => {
        if (catSlug && catSlug !== 'all') {
            return products.filter(product => slugify(product.category) === catSlug);
        }
        return products;
    }

    const productsToShow = getProducts(slug);

    return (
        <div className="home">
            <div className="home__products">
                {isLoadingProducts ? (
                    <Loader />
                ) : (
                    productsToShow.map((product) => {
                        return <Product key={product.id} product={product} />
                    })
                )}

            </div>
        </div>
    )
}
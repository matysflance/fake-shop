import './Category.css';
import { ProductCard } from './ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';

export const Category = ({ isLoadingProducts, products }) => {
    const { slug } = useParams();

    const getProducts = (catSlug) => {
        if (catSlug && catSlug !== 'all') {
            return products.filter(product => slugify(product.category) === catSlug);
        }
        return products;
    }

    const productsToShow = getProducts(slug);

    return (
        <div className="category">
            <div className="category__products">
                {isLoadingProducts ? (
                    <Loader />
                ) : (
                        productsToShow.length ? (
                            productsToShow.map((product) => {
                                return <ProductCard key={product.id} product={product} />
                            })
                        ) : (
                                <h2>No products to show</h2>
                            )
                    )}

            </div>
        </div>
    )
}
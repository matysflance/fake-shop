import { ProductCard } from './ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import styles from './Category.module.css';
import { getCategoryNameBySlug } from '../../util';

export const Category = ({ isLoadingProducts, products, categories }) => {
    const { slug } = useParams();

    const getProducts = (catSlug) => {
        if (catSlug && catSlug !== 'all') {
            return products.filter(product => slugify(product.category) === catSlug);
        }
        return products;
    }

    const productsToShow = getProducts(slug, categories);

    return (
        <div className="container">
            <div className={styles.titleWrapper}>
                <h2 className={styles.title}>{getCategoryNameBySlug(slug, categories)}</h2>
            </div>
            
            <div className={styles.category}>
                <div className={styles.products}>
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
        </div>
    )
}
import { ProductCard } from './ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import styles from './Category.module.css';
import { getCategoryNameBySlug, compareArrayOfObjectsByKey } from '../../util';

import clsx from 'clsx';
import { useState } from 'react';

const sortProductsByKeyAndOrder = (products, sortBy) => {
    // since I cannot use object in select value, I have to pass a string and extract key and order from it
    const [sortByKey, sortByOrder] = sortBy.split('_');
    
    //if for any reason key or order are not set (e.g. wrong string passed from select value) - return same products as passed
    return !sortByKey || !sortByOrder
    ? products
    : [...products].sort(compareArrayOfObjectsByKey(sortByKey, sortByOrder));
}

export const Category = ({ isLoadingProducts, products, categories }) => {
    const { slug } = useParams();
    const [sortBy, setSortBy] = useState('title_ASC');

    const getProducts = (catSlug) => {
        if (catSlug && catSlug !== 'all') {
            return products.filter(product => slugify(product.category) === catSlug);
        }
        return products;
    }

    const productsToShow = sortProductsByKeyAndOrder(getProducts(slug, categories), sortBy);


    return (
        <section className="container">
            {categories.length ? (
                <>
                    <div className={styles.titleWrapper}>
                        <h2 className={styles.title}>{getCategoryNameBySlug(slug, categories)}</h2>
                    </div>
                    <form>
                        <div className={styles.formGroup}>
                            <label htmlFor="sortBySelect" className={styles.formLabel}>Sort by:</label>
                            <select 
                                className={clsx(styles.formControl, styles.selectFormControl)} 
                                id="sortBySelect" 
                                onChange={(e) => setSortBy(e.target.value)}
                                value={sortBy}
                            >
                                <option value="price_ASC">Price (Low-High)</option>
                                <option value="price_DESC">Price (High-Low)</option>
                                <option value="title_ASC">Name (A-Z)</option>
                                <option value="title_DESC">Name (Z-A)</option>
                            </select>
                        </div>
                    </form>
                </>
            ) : null}
            
            
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
        </section>
    )
}
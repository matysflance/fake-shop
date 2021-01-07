import { ProductCard } from './ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { useParams } from 'react-router-dom';
import slugify from 'slugify';
import styles from './Category.module.css';
import { getCategoryNameBySlug, compareArrayOfObjectsByKey } from '../../util';

import clsx from 'clsx';
import { useState } from 'react';

const sortProducts = (products, sortBy) => {
    let compareKey, order;
    switch (sortBy) {
        case 'priceASC':
            compareKey = 'price';
            order = 'ASC';
            break;
        case 'priceDESC':
            compareKey = 'price';
            order = 'DESC';
            break;
        case 'nameASC':
            compareKey = 'title';
            order = 'ASC';
            break;
        case 'nameDESC':
            compareKey = 'title';
            order = 'DESC';
            break;
        default:
            break;
    }
    
    return [...products].sort(compareArrayOfObjectsByKey(compareKey, order));
}

export const Category = ({ isLoadingProducts, products, categories }) => {
    const { slug } = useParams();
    const [sortBy, setSortBy] = useState('nameASC');

    const getProducts = (catSlug) => {
        if (catSlug && catSlug !== 'all') {
            return products.filter(product => slugify(product.category) === catSlug);
        }
        return products;
    }

    const productsToShow = sortProducts(getProducts(slug, categories), sortBy);


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
                                <option value="priceASC">Price (Low-High)</option>
                                <option value="priceDESC">Price (High-Low)</option>
                                <option value="nameASC">Name (A-Z)</option>
                                <option value="nameDESC">Name (Z-A)</option>
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
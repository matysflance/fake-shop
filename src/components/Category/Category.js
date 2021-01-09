import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import slugify from "slugify";
import clsx from "clsx";
import { ProductCard } from "./ProductCard/ProductCard";
import { Loader } from "../Loader/Loader";
import { PageHeading } from "../PageHeading/PageHeading";
import styles from "./Category.module.css";
import { getCategoryNameBySlug, sortObjectsByKey, filterObjectsByKey } from "../../util";
import { useAlertContext } from '../../context/AlertContextProvider';
import { fetchProducts } from '../../api';


export const Category = ({ isLoadingProducts, products, setProducts, setIsLoadingProducts, categories }) => {
  const { displayAlert } = useAlertContext();
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState("title_ASC");
  const [search, setSearch] = useState('');
  const [productsPerPage, setProductsPerPage] = useState(10);
  const categoryName = getCategoryNameBySlug(slug, categories);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        displayAlert(true, 'danger', 'Could not load the products. Please refresh and try again.');
      }

      setIsLoadingProducts(false);
    }

    getProducts();
  }, []);

  const handleSort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  }

  const handlePaginateResults = (e) => {
    e.preventDefault();
    setProductsPerPage(e.target.value ? parseInt(e.target.value) : '');
    // ## TODO ##
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }

  const getProductsToShow = (catSlug) => {
    if (catSlug && catSlug !== "all") {
      return products.filter(
        (product) => slugify(product.category) === catSlug
      );
    }
    return products;
  }

  const productsToShow = sortObjectsByKey(filterObjectsByKey(getProductsToShow(slug), 'title', search), sortBy);

  const productsHTML = productsToShow.length ? (
    <div className={styles.products}>
      {productsToShow.map((product) => (
          <ProductCard key={product.id} product={product} />
      ))}
    </div>
  ) : (
    <h3 className="text-center my-1">No products to show</h3>
  );

  return (
    <section className="container">
      {categories.length > 0 && categoryName &&
        <PageHeading>
          {categoryName}
        </PageHeading>
      }
      
      {!isLoadingProducts && 
        <form className={styles.filterForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <label htmlFor="sortBySelect" className={styles.formLabel}>
              Sort by:
            </label>
            <select
              className={clsx(styles.formControl, styles.selectFormControl)}
              id="sortBySelect"
              onChange={(e) => handleSort(e)}
              value={sortBy}
            >
              <option value="price_ASC">Price (Low-High)</option>
              <option value="price_DESC">Price (High-Low)</option>
              <option value="title_ASC">Name (A-Z)</option>
              <option value="title_DESC">Name (Z-A)</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="limitResults" className={styles.formLabel}>Results per page</label>
            <select
              className={clsx(styles.formControl, styles.selectFormControl)}
              id="limitResults"
              onChange={(e) => handlePaginateResults(e)}
              value={productsPerPage}
            >
              <option value="">All</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="nameFilter" className={styles.formLabel}>Search</label>
            <input className={styles.formControl} type="text" placeholder="Start typing..." name="nameFilter" id="nameFilter" onChange={(e) => handleSearch(e)}/>
          </div>
        </form>
      }
      
      {isLoadingProducts ? <Loader /> : productsHTML}
    </section>
  );
};

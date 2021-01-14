import { useState, useEffect } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import slugify from 'slugify';
import { ProductCard } from './ProductCard/ProductCard';
import { Loader } from '../Loader/Loader';
import { PageHeading } from '../PageHeading/PageHeading';
import { Filters } from './Filters/Filters';
import styles from './Category.module.css';
import {
  getCategoryNameBySlug,
  sortObjectsByKey,
  filterObjectsByKey,
  capitalize,
  createSlugsForCategories,
} from '../../util';
import { useAlertContext } from '../../context/AlertContextProvider';
import { fetchProducts, fetchCategories } from '../../api';

export const Category = withRouter(({ history }) => {
  const { displayAlert } = useAlertContext();
  const { slug } = useParams();
  const [sortBy, setSortBy] = useState('title_ASC');
  const [search, setSearch] = useState('');
  const [ProductsLimit, setProductsLimit] = useState(5);
  const [selectedCategory, setSelectedCategory] = useState(slug);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(createSlugsForCategories(['all', ...categories]));
      } catch (error) {
        displayAlert(
          true,
          'danger',
          'Could not load the categories. Please refresh and try again.',
        );
      }
    };

    const getProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const products = await fetchProducts();
        setProducts(products);
      } catch (error) {
        displayAlert(true, 'danger', 'Could not load the products. Please refresh and try again.');
      }

      setIsLoadingProducts(false);
    };

    getCategories();
    getProducts();
  }, [displayAlert]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await fetchCategories();
        setCategories(createSlugsForCategories(['all', ...categories]));
      } catch (error) {
        displayAlert(
          true,
          'danger',
          'Could not load the categories. Please refresh and try again.',
        );
      }
    };

    getCategories();
  }, [displayAlert, setCategories]);

  const handleSort = (e) => {
    e.preventDefault();
    setSortBy(e.target.value);
  };

  // const handleLimitChange = (e) => {
  //   e.preventDefault();
  //   setProductsLimit(e.target.value ? parseInt(e.target.value) : '');
  //   // ## TODO ##
  // };

  const handleCategoryFilter = (e) => {
    e.preventDefault();
    history.push(`/category/${e.target.value}`);
    setSelectedCategory(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const getProductsToShow = (catSlug) => {
    if (catSlug && catSlug !== 'all') {
      return products.filter((product) => slugify(product.category) === catSlug);
    }
    return products;
  };

  const productsToShow = sortObjectsByKey(
    filterObjectsByKey(getProductsToShow(slug), 'title', search),
    sortBy,
  );

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
      {categories ? (
        <PageHeading>{capitalize(getCategoryNameBySlug(slug, categories))}</PageHeading>
      ) : null}

      {!isLoadingProducts && categories ? (
        <Filters
          handleCategoryFilter={handleCategoryFilter}
          handleSort={handleSort}
          handleSearch={handleSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          sortBy={sortBy}
          // handleLimitChange={handleLimitChange}
        />
      ) : null}

      {isLoadingProducts ? <Loader /> : productsHTML}
    </section>
  );
});

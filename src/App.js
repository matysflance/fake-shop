import React, { useEffect, useState } from "react";

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Alert } from './components/Alert/Alert';
import { Basket } from './components/Basket/Basket';
import { ErrorPage } from './components/ErrorPage';

import { useAlertContext } from './context'
import { fetchProducts } from './api';
import slugify from 'slugify';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const getUniqueCategories = (products) => {
  const allCategories = getAllCategories(products);
  return allCategories.filter(({name}, index) => allCategories.findIndex(el => el.name === name) === index);
}

// looks a bit ugly, but when I tried making it a 1-liner it was hard to understand what it's doing
// basically, it generates all categories in form of array of objects containing name and slug of category (used for pretty URLs)
const getAllCategories = (products) => {
  return [
    {
      name: 'all',
      slug: 'all'
    },
    ...products.map(product => {
      return {
        name: product.category,
        slug: slugify(product.category)
      }
    })
  ]
};

export const App = () => {
  const { showAlert, alertSettings } = useAlertContext();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      setIsLoadingProducts(true);
      setIsLoadingCategories(true);

      const products = await fetchProducts();
      setProducts(products);
      setCategories(getUniqueCategories(products));

      setIsLoadingProducts(false);
      setIsLoadingCategories(false);
    }

    fetchProductsFromAPI();
  }, []);

  console.log({ products });

  return (
    <Router>
      <div className="site-wrapper">
        {showAlert ? <Alert {...alertSettings} /> : null}
        <Header
          isLoadingCategories={isLoadingCategories}
          categories={categories}
        />
        <main>
          <Switch>
            <Route exact path='/'>
              <Home
                isLoadingProducts={isLoadingProducts}
                products={products}
              />
            </Route>
            <Route 
              path='/category/:slug'
              children={
                <Home
                  isLoadingProducts={isLoadingProducts}
                  products={products}
                />
              }
            />
            <Route exact path='/basket'>
              <Basket />
            </Route>
            <Route path='*'>
              <ErrorPage />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
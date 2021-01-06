import React, { useEffect, useState } from "react";

import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Home } from '../Home/Home';
import { Category } from '../Category/Category';
import { Basket } from '../Basket/Basket';

import { useAlertContext } from '../../context/AlertContextProvider'
import { fetchProducts } from '../../api';
import { getUniqueCategories } from '../../util';

import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';

export const App = () => {
  const { displayAlert } = useAlertContext();

  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      setIsLoadingProducts(true);
      setIsLoadingCategories(true);
      console.log('fetchProductsFromAPI');
      try {
        const products = await fetchProducts();
        setProducts(products);
        setCategories(getUniqueCategories(products));
      } catch (error) {
        displayAlert(true, 'danger', 'Could not load the products. Please refresh and try again.');
      }

      setIsLoadingProducts(false);
      setIsLoadingCategories(false);
    }

    fetchProductsFromAPI();
  }, []);

  return (
    <Router>
      <div className="site-wrapper">
        <Header
          isLoadingCategories={isLoadingCategories}
          categories={categories}
        />
        <main>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route 
              path='/category/:slug'
              children={
                <Category
                  isLoadingProducts={isLoadingProducts}
                  products={products}
                  categories={categories}
                />
              }
            />
            <Route exact path="/category">
                <Redirect to="/category/all" />
            </Route>
            <Route exact path='/basket'>
              <Basket />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
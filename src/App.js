import React, { useEffect, useState } from "react";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Alert from './components/Alert/Alert';
import Basket from './components/Basket/Basket';
import ErrorPage from './components/ErrorPage';

import { useGlobalContext } from './context'
import { fetchProducts } from './api';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

const getUniqueCategories = (products) => [...new Set(getAllCategories(products))];
const getAllCategories = (products) => ['all', ...products.map(product => product.category)];

const App = () => {
  const { showAlert, alertSettings } = useGlobalContext();

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

export default App;

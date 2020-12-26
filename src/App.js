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

function App() {
  const { products, setProducts, setAllProducts, setCategories, showAlert, alertSettings } = useGlobalContext();

  const [isLoading, setIsLoading] = useState(true);

  const extractCategories = (products) => {
    const categories = products.map(product => {
      return product.category;
    });
    console.log(categories);
    const uniqueCategories = categories.filter((category, index, categoriesArr) => categoriesArr.indexOf(category) === index);
    return uniqueCategories;
  }

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      const products = await fetchProducts();
      const uniqueCategories = extractCategories(products);
      setCategories(['all', ...uniqueCategories]);
      setProducts(products);
      setAllProducts(products);
      setIsLoading(false);
    }

    fetchAPI();
  }, []);

  console.log(products);
  console.log({ isLoading });

  return (
    <Router>
      <div className="site-wrapper">
        {showAlert ? <Alert {...alertSettings} /> : null}
        <Header />
        <main>
          <Switch>
            <Route exact path='/'>
              <Home isLoading={isLoading} />
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

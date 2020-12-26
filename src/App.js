import React, { useEffect, useState } from "react";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Alert from './components/Alert/Alert';
import Basket from './components/Basket/Basket';

import { useGlobalContext } from './context'
import { fetchProducts } from './api';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

function App() {
  const { products, setProducts, setCategories, showAlert, alertSettings } = useGlobalContext();

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
      setProducts(await fetchProducts());
      setIsLoading(false);
    }

    fetchAPI();
  }, []);

  //there was a bug, I think caused by async/await, where products array wasn't available for "extractCategories" function. I couldn't add "products" as dependency to above useFetch as it was causing an infinite loop
  // Therefore, I had to run a separate useEffect
  useEffect(() => {
    const uniqueCategories = extractCategories(products);
    setCategories(uniqueCategories);
  }, [products]);


  console.log(products);
  console.log({ isLoading });

  return (
    <Router>
      <div className="site-wrapper">
        {showAlert ? <Alert {...alertSettings} /> : null}
        <Header />
        <main>
          <Route exact path='/'>
            <Home isLoading={isLoading} />
          </Route>
          <Route exact path='/basket'>
            <Basket />
          </Route>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

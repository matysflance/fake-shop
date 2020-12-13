import React, { useEffect } from "react";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Alert from './components/Alert/Alert';

import { useGlobalContext } from './context'
import { fetchProducts } from './api';

import './App.css';

function App() {
  const { products, setProducts, setCategories, isLoading, setIsLoading, showAlert, alertSettings } = useGlobalContext();

  const extractCategories = (products) => {
    const categories = products.map(product => {
      return product.category;
    });
    console.log(categories);
    const uniqueCategories = categories.filter((category, index, categoriesArr) => categoriesArr.indexOf(category) === index);
    setCategories(uniqueCategories);
  }

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setProducts(await fetchProducts());
      extractCategories(products);
      setIsLoading(false);
    }

    fetchAPI();
  }, []);


  console.log(products);
  console.log({ isLoading });

  return (
    <div className="site-wrapper">
      {showAlert ? <Alert {...alertSettings} /> : null}
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;

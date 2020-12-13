import React, { useEffect } from "react";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';

import { useGlobalContext } from './context'
import { fetchProducts } from './api';

import './App.css';

function App() {
  const { products, setProducts, isLoading, setIsLoading } = useGlobalContext();

  useEffect(() => {
    const fetchAPI = async () => {
      setIsLoading(true);
      setProducts(await fetchProducts());
      setIsLoading(false);
    }

    fetchAPI();
  }, []);


  console.log(products);
  console.log({ isLoading });

  return (
    <div className="site-wrapper">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
    </div>
  );
}

export default App;

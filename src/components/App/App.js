import { useState, memo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Category } from '../Category/Category';
import { Basket } from '../Basket/Basket';
import './App.css';

export const App = memo(() => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  return (
    <Router>
      <div className="site-wrapper">
        <Header categories={categories} setCategories={setCategories} />
        <main className="main-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/category/all" />
            </Route>
            <Route
              path="/category/:slug"
              children={
                <Category
                  isLoadingProducts={isLoadingProducts}
                  products={products}
                  setProducts={setProducts}
                  setIsLoadingProducts={setIsLoadingProducts}
                  categories={categories}
                />
              }
            />
            <Route exact path="/category">
              <Redirect to="/category/all" />
            </Route>
            <Route exact path="/basket">
              <Basket />
            </Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </Router>
  );
});

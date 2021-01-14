import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Category } from '../Category/Category';
import { Basket } from '../Basket/Basket';
import { createSlugsForCategories } from '../../util';
import { fetchCategories } from '../../api';
import { useAlertContext } from '../../context/AlertContextProvider';

export const App = () => {
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const { displayAlert } = useAlertContext();

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

  return (
    <Router>
      <div className="site-wrapper">
        <Header />
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
};

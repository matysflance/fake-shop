import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Category } from '../Category/Category';
import { Basket } from '../Basket/Basket';

export const App = () => {
  return (
    <Router>
      <div className="site-wrapper">
        <Header />
        <main className="main-content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/category/all" />
            </Route>
            <Route path="/category/:slug" children={<Category />} />
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

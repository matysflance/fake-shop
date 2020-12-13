import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './components/Home';

import './App.css';

function App() {
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

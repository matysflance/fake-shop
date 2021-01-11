import { memo } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

export const ErrorPage = memo(() => {
  return (
    <div className="site-wrapper">
      <Header isLoadingCategories={false} categories={[]} />
      <main>
        <h2>Something went wrong</h2>
      </main>
      <Footer />
    </div>
  );
});

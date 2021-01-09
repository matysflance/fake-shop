import React from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="site-wrapper">
      <Header isLoadingCategories={false} categories={[]} />
      <main>
        <h2>Something went wrong</h2>
      </main>
      <Footer />
    </div>
  );
};

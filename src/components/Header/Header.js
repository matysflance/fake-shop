import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo/Logo';
import { Nav } from './Nav/Nav';
import styles from './Header.module.css';

export const Header = ({ categories, setCategories }) => {
  return (
    <header className={styles.header} role="banner">
      <Link to="/" className={styles.logoLink}>
        <Logo />
      </Link>
      <Nav categories={categories} setCategories={setCategories} />
    </header>
  );
};

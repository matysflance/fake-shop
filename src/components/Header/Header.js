import React from 'react';
import { Logo } from './Logo/Logo';
import { Nav } from './Nav/Nav';
import styles from './Header.module.css';

export const Header = ({ categories, setCategories }) => {
  return (
    <header className={styles.header} role="banner">
      <Logo />
      <Nav categories={categories} setCategories={setCategories} />
    </header>
  );
};

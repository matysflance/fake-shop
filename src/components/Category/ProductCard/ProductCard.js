import React, { useState } from 'react';
import { useAlertContext } from '../../../context/AlertContextProvider';
import { useBasketContext } from '../../../context/BasketContextProvider';
import { formatPrice } from '../../../util';
import { Button } from '../../Button/Button';
import clsx from 'clsx';

import styles from './ProductCard.module.css';

const calculateProductTotal = (price, quantity) => price * quantity;

export const ProductCard = ({ product }) => {
  const { category, description, id, image, price, title } = product;

  const { displayAlert } = useAlertContext();
  const { addProductToBasket } = useBasketContext();
  const [quantity, setQuantity] = useState(1);

  const handleAddToBasket = (e) => {
    e.preventDefault();
    addProductToBasket({ ...product, quantity });
    setQuantity(1);
    displayAlert(true, 'success', 'Product added to the basket!');
  };

  return (
    <article className={styles.product} aria-label="Product card">
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.cardBody}>
        <p className={styles.category}>{category}</p>
        <h3 className={styles.name}>{title}</h3>
        <div className={styles.description}>{description.substr(0, 100)}...</div>
      </div>
      <footer className={styles.cardFooter}>
        <div className={styles.price}>
          <span className="sr-only">Product price:</span>
          &pound;{formatPrice(calculateProductTotal(price, quantity))}
        </div>
        <form onSubmit={(e) => handleAddToBasket(e)}>
          <div className={styles.formGroup}>
            <label htmlFor={`qty_${id}`} className={styles.formLabel}>
              Select quantity:
            </label>
            <select
              className={clsx(styles.formControl, styles.selectFormControl)}
              id={`qty_${id}`}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              autoComplete="off"
              aria-label="Select quantity field"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <Button fullWidth type="submit">
            Add to Basket
          </Button>
        </form>
      </footer>
    </article>
  );
};

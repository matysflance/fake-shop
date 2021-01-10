import React from 'react';
import { useBasketContext } from '../../../context/BasketContextProvider';
import { formatPrice } from '../../../util';

import { Button } from '../../Button/Button';

import styles from './BasketItem.module.css';

const calculateSubtotal = (price, quantity) => price * quantity;

export const BasketItem = ({ item: { id, title, image, quantity, price } }) => {
  const {
    increaseQuantity,
    decreaseQuantity,
    updateQuantity,
    removeItemFromBasket,
  } = useBasketContext();

  const handleIncreaseQuantity = () => {
    increaseQuantity(id);
  };
  const handleDecreaseQuantity = () => {
    if (quantity <= 1) {
      removeItemFromBasket(id);
    } else {
      decreaseQuantity(id);
    }
  };

  const handleChangeQuantity = (e) => {
    updateQuantity(id, parseInt(e.target.value));
  };

  const handleRemoveItem = () => {
    removeItemFromBasket(id);
  };
  console.log('BasketItem render');
  return (
    <li className={styles.basketItem}>
      <div className={styles.infoWrapper}>
        <h4 className={styles.name}>{title}</h4>
        <p className={styles.unitPrice}>
          Product price: <span className={styles.price}>&pound;{formatPrice(price)}</span>
        </p>
        <form className={styles.qtyForm} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.formGroup}>
            <Button
              type="button"
              additionalClasses={styles.qtyButton}
              handleClick={handleDecreaseQuantity}
              aria-label="Decrease quantity"
            >
              -
            </Button>
            <span className="sr-only">Quantity:</span>
            <input
              type="number"
              className={styles.qtyField}
              name={`qty_${id}`}
              id={`qty_${id}`}
              value={quantity}
              onChange={(e) => handleChangeQuantity(e)}
              autoComplete="off"
            />
            <Button
              type="button"
              additionalClasses={styles.qtyButton}
              handleClick={handleIncreaseQuantity}
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
        </form>
        <p className={styles.subtotal}>
          Subtotal:
          <span className={styles.price}>
            &pound;{formatPrice(calculateSubtotal(price, quantity))}
          </span>
        </p>
      </div>
      <div className={styles.thumbnailWrapper}>
        <img src={image} alt={title} className={styles.thumbnail} />
      </div>
      <Button
        type="button"
        handleClick={handleRemoveItem}
        additionalClasses={[styles.deleteBtn]}
        aria-label="Remove item from basket"
      >
        X
      </Button>
    </li>
  );
};

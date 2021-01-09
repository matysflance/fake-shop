import React from 'react';

import { BasketItem } from './BasketItem/BasketItem';
import { PageHeading } from '../PageHeading/PageHeading';
import { Button } from '../Button/Button';

import { useBasketContext } from '../../context/BasketContextProvider';
import { formatPrice } from '../../util';

import styles from './Basket.module.css';

export const Basket = () => {
  const { basket, basketTotal } = useBasketContext();

  const handleCheckout = () => {
    alert('Start checkout process');
  };

  return (
    <section className="container">
      <PageHeading>Basket</PageHeading>
      <div className={styles.basket}>
        {basket.length ? (
          <>
            <span className="sr-only">Items in your basket</span>
            <div className={styles.products}>
              {/* <h3 className={styles.sectionHeading}>Your Items</h3> */}
              <ul className={styles.productList}>
                {basket.map((item) => {
                  return <BasketItem key={item.id} item={item} />;
                })}
              </ul>
            </div>
            <div className={styles.summary}>
              <h3 className={styles.sectionHeading}>Order Summary</h3>
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Total:</span>
                <span className={styles.summaryValue}>&pound;{formatPrice(basketTotal)}</span>
              </div>
              <Button
                type="button"
                fullWidth
                additionalClasses={[styles.checkoutBtn]}
                handleClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <h3 className={styles.sectionHeading}>Your basket is empty</h3>
        )}
      </div>
    </section>
  );
};

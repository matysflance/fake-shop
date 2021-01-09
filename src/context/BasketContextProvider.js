import React, { useState, useEffect, useContext } from 'react';

const BasketContext = React.createContext();

const calculateBasketCount = (basket) =>
  basket.reduce((currentCount, item) => item.quantity + currentCount, 0);
const calculateBasketTotal = (basket) =>
  basket.reduce(
    (currentTotal, item) => parseFloat((item.price * item.quantity + currentTotal).toFixed(2)),
    0,
  );

export const BasketContextProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);
  const [basketCount, setBasketCount] = useState(0);
  const [basketTotal, setBasketTotal] = useState(0);

  // basket logic
  const addProductToBasket = (product) => {
    const { id, quantity } = product;
    const existingBasketItem = basket.some((item) => item.id === id);

    if (existingBasketItem) {
      const newBasket = basket.map((item) => {
        return item.id === id ? { ...item, quantity: item.quantity + quantity } : item;
      });
      setBasket(newBasket);
    } else {
      const newBasket = [...basket, { ...product }];
      setBasket(newBasket);
    }
  };

  const increaseQuantity = (productId) => {
    const newBasket = basket.map((item) => {
      return item.id === productId ? { ...item, quantity: item.quantity + 1 } : item;
    });

    setBasket(newBasket);
  };

  const decreaseQuantity = (productId) => {
    const newBasket = basket.map((item) => {
      return item.id === productId ? { ...item, quantity: item.quantity - 1 } : item;
    });

    setBasket(newBasket);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      const newBasket = basket.map((item) => {
        return item.id === productId ? { ...item, quantity: newQuantity } : item;
      });
      setBasket(newBasket);
    } else {
      const newBasket = basket.filter((item) => item.id !== productId);
      setBasket(newBasket);
    }
  };

  const removeItemFromBasket = (productId) => {
    setBasket(basket.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    setBasketCount(calculateBasketCount(basket));
    setBasketTotal(calculateBasketTotal(basket));
  }, [basket]);

  return (
    <BasketContext.Provider
      value={{
        basket,
        setBasket,
        basketCount,
        basketTotal,
        addProductToBasket,
        increaseQuantity,
        decreaseQuantity,
        updateQuantity,
        removeItemFromBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasketContext = () => {
  return useContext(BasketContext);
};

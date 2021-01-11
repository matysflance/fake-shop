import { useState, useEffect, useContext, createContext, memo, useCallback } from 'react';

const BasketContext = createContext();

const calculateBasketCount = (basket) =>
  basket.reduce((currentCount, item) => item.quantity + currentCount, 0);
const calculateBasketTotal = (basket) =>
  basket.reduce(
    (currentTotal, item) => parseFloat((item.price * item.quantity + currentTotal).toFixed(2)),
    0,
  );

export const BasketContextProvider = memo(({ children }) => {
  const [basket, setBasket] = useState([]);
  const basketCount = calculateBasketCount(basket);
  const basketTotal = calculateBasketTotal(basket);

  // basket logic
  const addProductToBasket = useCallback((product) => {
    const { id, quantity } = product;
    setBasket((prev) => {
      const existingBasketItem = prev.some((item) => item.id === id);
      if (existingBasketItem) {
        return prev.map((item) => {
          return item.id === id ? { ...item, quantity: item.quantity + quantity } : item;
        });
      } else {
        return [...prev, { ...product }];
      }
    });
  }, []);

  const increaseQuantity = useCallback((productId) => {
    setBasket((prev) =>
      prev.map((item) => {
        return item.id === productId ? { ...item, quantity: item.quantity + 1 } : item;
      }),
    );
  }, []);

  const decreaseQuantity = useCallback((productId) => {
    setBasket((prev) =>
      prev.map((item) => {
        return item.id === productId ? { ...item, quantity: item.quantity - 1 } : item;
      }),
    );
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity > 0) {
      setBasket((prev) =>
        prev.map((item) => {
          return item.id === productId ? { ...item, quantity: newQuantity } : item;
        }),
      );
    } else {
      setBasket((prev) => prev.filter((item) => item.id !== productId));
    }
  }, []);

  const removeItemFromBasket = useCallback((productId) => {
    setBasket((prev) => prev.filter((item) => item.id !== productId));
  }, []);

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
});

export const useBasketContext = () => {
  return useContext(BasketContext);
};

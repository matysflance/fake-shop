import React, { useState, useContext, useEffect } from 'react';

const AlertContext = React.createContext();
const BasketContext = React.createContext();

const calculateBasketCount = basket => basket.reduce((currentCount, item) => item.quantity + currentCount, 0);
const calculateBasketTotal = basket => basket.reduce((currentTotal, item) => parseFloat(((item.price * item.quantity) + currentTotal).toFixed(2)), 0);

export const AppProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);
    const [basketCount, setBasketCount] = useState(0);
    const [basketTotal, setBasketTotal] = useState(0);

    const [showAlert, setShowAlert] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    // basket logic
    const addProductToBasket = (product) => {
        const { id, quantity } = product;
        const existingBasketItem = basket.some(item => item.id === id);

        if (existingBasketItem) {
            const newBasket = basket.map(item => {
                return item.id === id 
                ? {...item, quantity: item.quantity + quantity} 
                : item;
            });
            setBasket(newBasket);
        } else {
            const newBasket = [...basket, {...product}];
            setBasket(newBasket);
        }
    }

    const increaseQuantity = (productId) => {
        const newBasket = basket.map(item => {
            return item.id === productId 
            ? {...item, quantity: item.quantity++}
            : item;
        });

        setBasket(newBasket);
    }

    const decreaseQuantity = (productId) => {
        const newBasket = basket.map(item => {
            return item.id === productId 
            ? {...item, quantity: item.quantity--}
            : item;
        });

        setBasket(newBasket);
    }

    const removeItemFromBasket = (productId) => {
        setBasket(basket.filter(item => item.id !== productId));
    }
    
    useEffect(() => {
        setBasketCount(calculateBasketCount(basket));
        setBasketTotal(calculateBasketTotal(basket));
    }, [basket]);

    // alerts logic
    const displayAlert = (show = false, type = '', message = '') => {
        setShowAlert(show);
        setAlertSettings({ type, message });
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowAlert(false);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [showAlert])


    return (
        <AlertContext.Provider value={{
            showAlert,
            setShowAlert,
            alertSettings,
            setAlertSettings,
            displayAlert
        }}>
            <BasketContext.Provider value={{
                basket,
                setBasket,
                basketCount,
                basketTotal,
                addProductToBasket,
                increaseQuantity,
                decreaseQuantity,
                removeItemFromBasket
            }}>
                {children}
            </BasketContext.Provider>
        </AlertContext.Provider>
    )
}

export const useAlertContext = () => {
    return useContext(AlertContext);
} 
export const useBasketContext = () => {
    return useContext(BasketContext);
} 
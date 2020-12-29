import React, { useState, useContext, useEffect } from 'react';
import { clone } from 'ramda';

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
        const currentBasketItemKey = basket.findIndex(item => item.id === id);
        const copiedBasket = clone(basket);
        //1. when same product is added to the basket, merge quantity instead of adding another item - DONE
        if (currentBasketItemKey !== -1) {
            copiedBasket[currentBasketItemKey].quantity += quantity;
        } else {
            copiedBasket.push(product); 
        }
        setBasket(copiedBasket);
    }

    const increaseQuantity = (productId) => {
        const itemToUpdateKey = basket.findIndex(item => item.id === productId);
        const copiedBasket = clone(basket);
        copiedBasket[itemToUpdateKey].quantity++;
        setBasket(copiedBasket);
    }

    const decreaseQuantity = (productId) => {
        const itemToUpdateKey = basket.findIndex(item => item.id === productId);
        const copiedBasket = clone(basket);
        copiedBasket[itemToUpdateKey].quantity--;
        setBasket(copiedBasket);
    }

    const removeItemFromBasket = (productId) => {
        const itemToRemoveKey = basket.findIndex(item => item.id === productId);
        const copiedBasket = clone(basket);
        copiedBasket.splice(itemToRemoveKey, 1);
        setBasket(copiedBasket);
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
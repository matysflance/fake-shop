import React, { useState, useContext, useEffect } from 'react'

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

    useEffect(() => {
        setBasketCount(calculateBasketCount(basket));
        setBasketTotal(calculateBasketTotal(basket));
    }, [basket]);

    return (
        <AlertContext.Provider value={{
            showAlert,
            setShowAlert,
            alertSettings,
            setAlertSettings
        }}>
            <BasketContext.Provider value={{
                basket,
                setBasket,
                basketCount,
                basketTotal
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
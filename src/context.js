import React, { useState, useContext } from 'react'

const AlertContext = React.createContext();
const BasketContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [basket, setBasket] = useState({ products: [], total: 0, count: 0 });
    const [showAlert, setShowAlert] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

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
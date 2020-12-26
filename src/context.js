import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [basket, setBasket] = useState({ products: [], total: 0, count: 0 });
    const [showAlert, setShowAlert] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    return (
        <AppContext.Provider value={{
            products,
            setProducts,

            categories,
            setCategories,

            basket,
            setBasket,

            showAlert,
            setShowAlert,
            alertSettings,
            setAlertSettings
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
} 
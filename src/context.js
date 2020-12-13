import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [basket, setBasket] = useState([]);
    const [basketCount, setBasketCount] = useState(0);
    const [showAlert, setShowAlert] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <AppContext.Provider value={{
            isNavOpen,
            setIsNavOpen,
            toggleNav,

            isLoading,
            setIsLoading,

            products,
            setProducts,

            categories,
            setCategories,

            basket,
            setBasket,

            basketCount,
            setBasketCount,

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
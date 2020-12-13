import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

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
            setCategories
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
} 
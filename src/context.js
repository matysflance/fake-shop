import React, { useState, useContext } from 'react'

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (
        <AppContext.Provider value={{
            isNavOpen,
            setIsNavOpen,
            toggleNav
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext);
} 
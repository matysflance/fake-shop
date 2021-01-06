import React, { useState, useEffect, useContext } from 'react';
import { Alert } from '../components/Alert/Alert';

const AlertContext = React.createContext();

export const AlertContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false);
    const [alertSettings, setAlertSettings] = useState({});

    // alerts logic
    const displayAlert = (show = false, type = '', message = '') => {
        setShowAlert(show);
        setAlertSettings({ type, message });
    }

    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         setShowAlert(false);
    //     }, 3000);

    //     return () => clearTimeout(timeout);
    // }, [showAlert])

    return (
        <AlertContext.Provider value={{
            showAlert,
            setShowAlert,
            alertSettings,
            setAlertSettings,
            displayAlert
        }} >
            {showAlert ? <Alert {...alertSettings} /> : null}
            {children}
        </AlertContext.Provider>
    )
}

export const useAlertContext = () => {
    return useContext(AlertContext);
}
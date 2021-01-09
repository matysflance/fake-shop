import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/App/App';
import { reportWebVitals } from './reportWebVitals';
import { AlertContextProvider } from './context/AlertContextProvider';
import { BasketContextProvider } from './context/BasketContextProvider';
import { GlobalErrorBoundary } from './ErrorBoundaries/GlobalErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <AlertContextProvider>
        <BasketContextProvider>
          <App />
        </BasketContextProvider>
      </AlertContextProvider>
    </GlobalErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

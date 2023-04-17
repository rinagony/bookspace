import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { IntlProvider } from "react-intl";
import { store } from './redux/store'
import { Provider } from 'react-redux'
import messages from './lang/en.json'
import './assets/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <IntlProvider messages={messages} locale='en' defaultLocale="en">
        <App />
      </IntlProvider>
    </Provider>
  </React.StrictMode>
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './reduxToolkit/store/Store.jsx'
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <StrictMode>
    <App />
  </StrictMode>
  </Provider>
)

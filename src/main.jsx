import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './app/App.jsx'
import {Provider} from "react-redux";
import {store} from "./store/index.js";
import {BrowserRouter} from "react-router";


createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <BrowserRouter>
            <StrictMode>
                 <App />
            </StrictMode>
        </BrowserRouter>
    </Provider>,
)

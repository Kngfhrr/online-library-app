import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducers from "./store/reducers";


const persistedState = localStorage.getItem('library')
    ? JSON.parse(localStorage.getItem('library') as string)
    : []

const store = createStore(reducers, persistedState);

store.subscribe(() => {
    localStorage.setItem('library', JSON.stringify(store.getState().library.collection))
    localStorage.setItem('wishlist', JSON.stringify(store.getState().library.wishlist))
})

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
    ,
    document.getElementById("root")
);

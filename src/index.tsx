import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {Provider} from 'react-redux'
import {createStore} from 'redux';
import reducers from "./store/reducers";

import {loadState, saveState} from "./localStorage";


const persistedState = loadState();

const store = createStore(reducers, persistedState);

store.subscribe(() => {
    saveState({
      wishlist: store.getState().library.wishlist,
      collection: store.getState().library.collection
    });
});

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <App/>
        </React.StrictMode>
    </Provider>
    ,
    document.getElementById("root")
);

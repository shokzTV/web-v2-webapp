import { createStore, applyMiddleware } from 'redux'
import networkMiddleware from '../store/middleware/NetworkMiddleware';
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {storeReducer} from '../store/Store';

export const initStore = (initialState = {}) => {
    const composeEnhancers = composeWithDevTools({name: 'shokz.tv'});
    return createStore(
        storeReducer,
        initialState,
        //@ts-ignore
        composeEnhancers(applyMiddleware(thunk, networkMiddleware))
    )
}

export const reduxPage = comp => withRedux(initStore)(comp)

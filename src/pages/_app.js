import {createStore, applyMiddleware, AnyAction} from "redux";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {storeReducer} from '../store/Store';
import networkMiddleware from '../store/middleware/NetworkMiddleware';
import 'antd/lib/style/index.css';
import 'antd/lib/grid/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/typography/style/index.css';
import 'antd/lib/icon/style/index.css';
import 'antd/lib/skeleton/style/index.css';
import 'antd/lib/carousel/style/index.css';
import 'antd/lib/divider/style/index.css';
import 'antd/lib/avatar/style/index.css';
import 'antd/lib/layout/style/index.css';
import 'antd/lib/pagination/style/index.css';
import { AnimatePresence } from 'framer-motion';
import Navigation from '../components/Navigation';
import SelectedEvent from '../components/blocks/SelectedEvent';

const makeStore = () => {
    const composeEnhancers = composeWithDevTools({name: 'shokz.tv'});
    return createStore(storeReducer, composeEnhancers(applyMiddleware(thunk, networkMiddleware)));
};

class MyApp extends App {
    render() {
        const {Component, pageProps, store} = this.props;
        return (
            <Provider store={store}>
                <Navigation />
                <SelectedEvent />
                <AnimatePresence exitBeforeEnter>
                        <Component {...pageProps} />
                </AnimatePresence>
            </Provider>
        );
    }

}

export default withRedux(makeStore)(MyApp);

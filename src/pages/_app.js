import {createStore, applyMiddleware, AnyAction} from "redux";
import {Provider} from "react-redux";
import App from "next/app";
import withRedux from "next-redux-wrapper";
import { composeWithDevTools } from 'redux-devtools-extension';
import './app.css';

export default class MyApp extends App {};

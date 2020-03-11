import Router from "next/router";
import withGA from "next-ga";
import App from 'next/app';

export default withGA(process.env.GA_ID, Router)(App);
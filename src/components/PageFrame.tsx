import React, { ReactElement, ReactNode, useEffect } from 'react';
import Head from "next/head";
import { COLORS } from '../style/colors';
import Footer from './Footer';
import MainEvent from './block/MainEvent';
import Navigation from './Navigation';
import AlphaInfo from './block/AlphaInfo';
import {fetchVersion} from '../api/base';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function PageFrame({children, title = null}: Props): ReactElement {
  useEffect(() => {
    const checkVersion = async () => {
      const version = await fetchVersion();
      const localVersion = localStorage.getItem('version');

      localStorage.setItem('version', version);
      if(localVersion && localVersion !== version) {
        await caches.keys().then((names) => {
            for (let name of names) {
              caches.delete(name);
            }
        });
        window.location.reload(true);
      }
    };

    checkVersion();
  }, []);
  return <>
    <Head>
      <title>shokzTV {title && ` - ${title}`}</title>
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content="shokzTV: Die deutsche Dota2 Startseite für aktuelle Nachrichten, Themen, Events, Updates, Pro Teams, Twitchstreamer und Dota2 Castings" />
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#0A1C3F" />
      <link rel="manifest" href="/manifest.json" />
    </Head>

    <AlphaInfo />

    <Navigation />    
    <MainEvent />
    
    <div className={'page'}>
      <div className={'pageWrapper'}>
        <div>
          <div>
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>

    <style jsx>{`
      .page {
          min-height: calc(100vh - 268px);
          display: flex;
          flex-direction: column;
          align-items: stretch;
      }

      .pageWrapper {
          max-width: 1175px;
          margin: 0 auto;
          padding: 30px 15px 40px 15px;
          flex-grow: 1;
          width: 100%;
      }  
    `}</style>

    <style jsx global>{`
      * {
        font-family: 'Roboto Condensed';
        color: ${COLORS.WEAK};
      }

      *, html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      h1 {
        font-size: 30px;
      }

      h3 {
          font-size: 20px;
      }
    `}</style>
  </>;
}

import React, { ReactElement, ReactNode } from 'react';
import { pageWrapper } from "../style/page";
import Head from "next/head";
import { COLORS } from '../style/colors';
import Footer from './Footer';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function PageFrame({children, title = null}: Props): ReactElement {
  return <>
    <Head>
      <title>shokz.tv {title && ` - ${title}`}</title>
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <meta name="description" content="shokzTV: Die deutsche Dota2 Startseite für aktuelle Nachrichten, Themen, Events, Updates, Pro Teams, Twitchstreamer und Castings" />

      <link rel="apple-touch-icon" href="images/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#0A1C3F" />
      <link rel="manifest" href="/manifest.json" />
    </Head>

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

    <style jsx>{pageWrapper}</style>

    <style jsx global>{`
      a {
        color: ${COLORS.PRIMARY}!important;
      }

      .pageFooter a, .ant-menu a {
        color: #FFF!important;
      } 

      * {
        font-family: 'Roboto Condensed';
        color: ${COLORS.WEAK};
      }
    `}</style>
  </>;
}

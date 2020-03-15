import React, { ReactElement, ReactNode, useEffect } from 'react';
import Head from "next/head";
import { COLORS } from '../style/colors';
import Footer from './Footer';
import MainEvent from './block/MainEvent';
import Navigation from './Navigation';
import AlphaInfo from './block/AlphaInfo';
import {fetchVersion} from '../api/base';
import FeaturedStreamer from './block/FeaturedStreamer';
import { Article } from '../api/@types/Article';
import dayjs from 'dayjs';


function buildArticleRichCard(article: Article): object {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://shokz.tv/article/" + article.id
    },
    "headline": article.title,
    "image": [
      article.cover
     ],
    "datePublished": dayjs.unix(article.created).toISOString(),
    "dateModified": dayjs.unix(article.created).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "shokzTV",
      "logo": {
        "@type": "ImageObject",
        "url": "https://shokz.tv/images/logo.png"
      }
    }
  };
}

interface Props {
    children: ReactNode;
    title?: string;
    seoArticle?: Article;
}

export default function PageFrame({children, title = null, seoArticle = null}: Props): ReactElement {
  const articleJsonLD = seoArticle && JSON.stringify(buildArticleRichCard(seoArticle));
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
      //@ts-ignore
      <meta charset="UTF-8" />
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />

      <meta name="description" content="shokzTV: Die deutsche Dota2 Startseite für aktuelle Nachrichten, Themen, Events, Updates, Pro Teams, Twitchstreamer und Dota2 Castings" />
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#0A1C3F" />
      <link rel="manifest" href="/manifest.json" />
      {articleJsonLD && articleJsonLD.length > 0 && <script type="application/ld+json">{`${articleJsonLD}`}</script>}
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
    </div>

    <FeaturedStreamer />
    <Footer />

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
          padding: 20px 40px 40px 40px;
          flex-grow: 1;
          width: 100%;
      }

      @media only screen and (max-width: 425px) { 
        .pageWrapper {
          padding: 20px 15px 40px 15px;
        } 
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

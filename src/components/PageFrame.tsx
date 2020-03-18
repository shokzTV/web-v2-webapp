import React, { ReactElement, ReactNode, useEffect } from 'react';
import Head from "next/head";
import { COLORS } from '../style/colors';
import Footer from './Footer';
import MainEvent from './block/MainEvent';
import Navigation from './Navigation';
import AlphaInfo from './block/AlphaInfo';
import FeaturedStreamer from './block/FeaturedStreamer';
import { Article } from '../api/@types/Article';
import dayjs from 'dayjs';
import { Event } from '../api/@types/Event';
import ReactVisibilitySensor from 'react-visibility-sensor';


function buildArticleRichCard(article: Article): object {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://shokz.tv/artikel/" + article.slug
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
    seoArticles?: Article[];
    mainEvent: Event;
}

export default function PageFrame({children, title = null, seoArticle = null, seoArticles = null, mainEvent}: Props): ReactElement {
  return <>
    <Head>
      <title>shokzTV {title && ` - ${title}`}</title>
      <meta charSet="UTF-8" />
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=0,viewport-fit=cover" />

      <meta name="description" content="shokzTV - Die deutschsprachige Dota 2 Startseite für aktuelle Nachrichten, nationale und internationale Events, Updates rund um die Pro-Szene, Interviews, Livestreams und mehr" />
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png"></link>
      <meta name="theme-color" content="#0A1C3F" />
      <link rel="manifest" href="/manifest.json" />
      <link rel="preconnect" href="//www.google-analytics.com" />
      <link rel="preconnect" href="//staging-api.shokz.tv" />
      {seoArticle && <script type="application/ld+json">{`${JSON.stringify(buildArticleRichCard(seoArticle))}`}</script>}
      {seoArticles && seoArticles.length > 0 && seoArticles.map((article, index) => <script key={index} type="application/ld+json">{`${JSON.stringify(buildArticleRichCard(article))}`}</script>)}
    </Head>

    <AlphaInfo />

    <Navigation />    
    <MainEvent mainEvent={mainEvent}/>
    
    <div className={'page'}>
      <div className={'pageWrapper'}>
        <div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
    <ReactVisibilitySensor  scrollCheck partialVisibility={true}>
      {({ isVisible }) => <>
        <div style={{height: '1px'}}/>
        <FeaturedStreamer isVisible={isVisible} />
      </>}
    </ReactVisibilitySensor>
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

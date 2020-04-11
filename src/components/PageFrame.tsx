import React, {ReactElement, ReactNode, useMemo} from 'react';
import Head from "next/head";
import {COLORS} from '../style/colors';
import Footer from './Footer';
import MainEvent from './block/MainEvent';
import Navigation from './Navigation';
import FeaturedStreamer from './block/FeaturedStreamer';
import {Article} from '../api/@types/Article';
import dayjs from 'dayjs';
import {Event} from '../api/@types/Event';
import ReactVisibilitySensor from 'react-visibility-sensor';
import {Article as JsonArticle, ItemList, Organization, WebPage, Event as JsonEvent} from "schema-dts";
import {JsonLd} from "react-schemaorg";
import { News } from '../api/@types/News';

function JsonLdEvent({event}: {event: Event}) {
  const image = event.tags[0].image;
  const homepageLink = event.links.find(({linkType}) => linkType === 'homepage');
  const locationUrl = homepageLink ? homepageLink.link : `https://dota2.shokz.tv/event/${event.slug}`;
  return <JsonLd<JsonEvent>
    item={{
      "@context": "https://schema.org",
      "@type": "Event",
      "startDate": dayjs.unix(event.start).toISOString(),
      "endDate": dayjs.unix(event.end).toISOString(),
      "name": event.name,
      "location": {
        "@type": "VirtualLocation",
        "name": event.location,
        "url": locationUrl
      },
      "description": event.descriptionShort,
      "image": `https://web-api.shokz.tv/${image}`,
    }}  
   />;
}

function JsonLDArticle({article}: { article: Article }) {
  const tags = article.tags.map(({name}) => name);
  return <>
    <JsonLd<JsonArticle>
      item={{
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "image": `https://web-api.shokz.tv/${article.cover}`,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": "https://dota2.shokz.tv/artikel/" + article.slug,
        },
        "datePublished": dayjs.unix(article.created).toISOString(),
        "dateModified": dayjs.unix(article.created).toISOString(),
        "author": {
          "@type": "Person",
          "url": article.author.profileUrl,
          "name": article.author.name,
        },
        "keywords": tags.join(', '),
        //@ts-ignore
        "publisher": {
          "@id": "#publisher",
        },
      }}/>
    <JsonLd<WebPage>
      item={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        //@ts-ignore
        "publisher": {
          "@id": "#publisher",
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@id": "https://dota2.shokz.tv/",
                "@type": "WebPage",
                "url": "https://dota2.shokz.tv/",
                "name": "shokzTV",
              },
            }, {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@id": "https://dota2.shokz.tv/artikel/",
                "@type": "WebPage",
                "url": "https://dota2.shokz.tv/artikel/",
                "name": "Artikel",
              },
            },
          ],
        },
      }}
    />
  </>;
}

interface Props {
  children: ReactNode;
  title?: string;
  seoArticle?: Article;
  seoArticles?: Article[];
  seoEvents?: Event[];
  seoNews?: News[];
  mainEvent: Event;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export default function PageFrame({
  children,
  title = null,
  seoArticle = null,
  seoArticles = null,
  seoEvents = null,
  seoNews = null,
  mainEvent,
  ogTitle = 'Events, Neuigkeiten, Interviews, Videos & mehr',
  ogDescription = 'Die deutschsprachige Dota 2 Startseite | Events, Neuigkeiten, Interviews, Videos & mehr | Exklusiver Partner der ESL Meisterschaft in Dota 2',
  ogImage = 'https://dota2.shokz.tv/images/share.jpg',

}: Props): ReactElement {
  const seoEventsFiltered = useMemo<Event[]>(() => seoEvents && seoEvents.filter(({id}) => !mainEvent || mainEvent.id !== id), [mainEvent, seoEvents]);

  return <>
    <Head>
      <title>shokzTV {title && ` - ${title}`}</title>
      <meta charSet="UTF-8"/>
      <meta name="google" content="notranslate"/>
      <meta httpEquiv="Content-Language" content="de"/>
      <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1"/>

      <meta property="og:site_name" content="shokzTV - Die deutschsprachige Dota 2 Startseite"/>
      <meta property="og:title" content={ogTitle}/>
      <meta property="og:description" content={ogDescription}/>
      <meta property="og:image" content={ogImage}/>
      <meta property="og:url" content="https://dota2.shokz.tv/"/>
      <meta property="og:type" content="website"/>
      <meta name="twitter:card" content="summary_large_image"/>

      <meta name="description"
            content="Die deutschsprachige Dota 2 Startseite | Events, Neuigkeiten, Interviews, Videos & mehr | Exklusiver Partner der ESL Meisterschaft in Dota 2"/>
      <link rel="apple-touch-icon" href="images/apple-touch-icon.png"/>
      <meta name="theme-color" content="#0A1C3F"/>
      <link rel="manifest" href="/manifest.json"/>
      <link rel="preconnect" href="//www.google-analytics.com"/>
      <link rel="preconnect" href="//web-api.shokz.tv/"/>
      <JsonLd<Organization>
        item={{
          "@context": 'https://schema.org',
          "@type": "Organization",
          "@id": "#publisher",
          name: "shokzTV",
          url: "https://dota2.shokz.tv/",
          logo: {
            "@type": 'ImageObject',
            url: "https://dota2.shokz.tv/images/logo.png",
          },
          sameAs: [
            "https://www.instagram.com/shokztv/",
            "https://twitter.com/shokztv/",
            "https://www.twitch.tv/shokztv",
            "https://www.youtube.com/channel/UCbSSQP3v0syCn9_-e089HgA",
          ],
        }}
      />
      {seoArticles && seoArticles.length > 0 && <JsonLd<ItemList>
        item={{
          "@context": 'https://schema.org',
          "@type": "ItemList",
          itemListElement: seoArticles.map((article, index) => (
            {
              "@type": "ListItem",
              position: index + 1,
              url: "https://dota2.shokz.tv/artikel/" + article.slug,
            })
          ),
        }}
      />}
      {!seoArticle && <JsonLd<WebPage>
        item={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          //@ts-ignore
          "publisher": {
            "@id": "#publisher",
          },
        }}
      />}
      {seoEventsFiltered && seoEventsFiltered.length > 0 && <JsonLd<ItemList>
        item={{
          "@context": 'https://schema.org',
          "@type": "ItemList",
          itemListElement: seoEventsFiltered.map((event, index) => (
            {
              "@type": "ListItem",
              position: index + 1,
              url: "https://dota2.shokz.tv/event/" + event.slug,
            })
          ),
        }}
      />}
      {seoNews && seoNews.length > 0 && <JsonLd<ItemList>
        item={{
          "@context": 'https://schema.org',
          "@type": "ItemList",
          itemListElement: seoNews.map((news, index) => (
            {
              "@type": "ListItem",
              position: index + 1,
              name: news.headline,
              description: news.description,
              url: news.source,
            })
          ),
        }}
      />}
      {seoEventsFiltered && seoEventsFiltered.length > 0 && seoEventsFiltered.map((event) => <JsonLdEvent event={event} key={event.id} />)}
      {seoArticle && <JsonLDArticle article={seoArticle}/>}
      {mainEvent && <JsonLdEvent event={mainEvent}  />}
    </Head>

    <Navigation/>
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
    <ReactVisibilitySensor scrollCheck partialVisibility={true}>
      {({isVisible}) => <>
        <div style={{height: '1px'}}/>
        <FeaturedStreamer isVisible={isVisible}/>
      </>}
    </ReactVisibilitySensor>
    <Footer/>

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

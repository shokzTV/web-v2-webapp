import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedArticles from '../components/pages/index/FeaturedArticles';
import Divider from '../components/Divider';
import FeaturedEvents from '../components/pages/index/FeaturedEvents';
import LastVideos from '../components/pages/index/LastVideos';
import LastNews from '../components/pages/index/LastNews';
import { fetchFeaturedArticle } from '../api/article';
import { Article } from '../api/@types/Article';
import { fetchFeaturedEvents, fetchMainEvent } from '../api/event';
import { Event } from '../api/@types/Event';
import { fetchRecentNews } from '../api/news';
import { News } from '../api/@types/News';
import { fetchLatestVideos } from '../api/video';
import { Video } from '../api/@types/Video';
import dayjs from 'dayjs';

function getPriority(start: number, end: number): number {
    const currentTs = dayjs().unix();

    if(currentTs > end) {
        return 0;
    } else if(currentTs < start) {
        return 1;
    } 

    return 2;
}

function sort({start: aStart, end: aEnd}: Event, {start: bStart, end: bEnd}: Event): number {
    return getPriority(bStart, bEnd) - getPriority(aStart, aEnd) || aStart - bStart;
}

interface Props {
  featuredArticles: Partial<Article[]>;
  featuredEvents: Event[];
  mainEvent: Event;
  lastNews: News[];
  videos: Video[];
}

export async function getStaticProps() {
  const featuredArticles = await fetchFeaturedArticle();
  const featuredEvents = await fetchFeaturedEvents();
  const lastNews = await fetchRecentNews();
  const videos = await fetchLatestVideos();
  const mainEvent = await fetchMainEvent();
  return {
      props: {
        featuredArticles,
        lastNews,
        mainEvent,
        videos,
        featuredEvents: featuredEvents.sort(sort),
      }
  };
}

export default function index({featuredArticles, featuredEvents, mainEvent, lastNews, videos}: Props): ReactElement {
  return <PageFrame title={'Die deutsche Dota2 Startseite'} mainEvent={mainEvent} seoArticles={featuredArticles} seoEvents={featuredEvents}>
    
    <FeaturedArticles featured={featuredArticles}/>

    <Divider double/>

    <div className={'row'}>
      <div className={'col'}>
        <FeaturedEvents featured={featuredEvents} />
      </div>
      <div className={'col'}>
        <LastNews lastNews={lastNews}/>
      </div>
    </div>

    <Divider double/>

    <LastVideos videos={videos} />

    <style jsx>{`
      .row {
        margin: -20px;
        display: flex;
        flex-direction: row;
      }

      .col {
        width: 50%;
        padding: 20px;
      }

      @media only screen and (max-width: 768px) { 
        .row {
          flex-direction: column;
          margin: 0;
        }
        .col {
          width: 100%;
        }
      }

      @media only screen and (max-width: 425px) {
        .col {
          padding: 20px 5px;
        }
      }
    `}</style>
  </PageFrame>;
}

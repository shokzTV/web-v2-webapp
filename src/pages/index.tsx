import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedArticles from '../components/pages/index/FeaturedArticles';
import Divider from '../components/Divider';
import FeaturedEvents from '../components/pages/index/FeaturedEvents';
import LastVideos from '../components/pages/index/LastVideos';
import LastNews from '../components/pages/index/LastNews';
import { fetchFeaturedArticle } from '../api/article';
import { Article } from '../api/@types/Article';
import { fetchFeaturedEvents } from '../api/event';
import { Event } from '../api/@types/Event';
import { fetchRecentNews } from '../api/news';
import { News } from '../api/@types/News';
import { fetchLatestVideos } from '../api/video';
import { Video } from '../api/@types/Video';


interface Props {
  featuredArticles: Partial<Article[]>;
  featuredEvents: Partial<Event>[];
  lastNews: News[];
  videos: Video[];
}

export async function getStaticProps() {
  const featuredArticles = await fetchFeaturedArticle();
  const featuredEvents = await fetchFeaturedEvents();
  const lastNews = await fetchRecentNews();
  const videos = await fetchLatestVideos();
  return {
      props: {
        featuredArticles,
        featuredEvents,
        lastNews,
        videos,
      }
  };
}

export default function index({featuredArticles, featuredEvents, lastNews, videos}: Props): ReactElement {
  return <PageFrame title={'Die deutsche Dota2 Startseite'}>
    
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

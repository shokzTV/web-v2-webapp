import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedArticles from '../components/pages/index/FeaturedArticles';
import Divider from '../components/Divider';
import FeaturedEvents from '../components/pages/index/FeaturedEvents';
import LastVideos from '../components/pages/index/LastVideos';
import LastNews from '../components/pages/index/LastNews';

export default function index(): ReactElement {
  return <PageFrame title={'Die deutsche Dota2 Startseite'}>
    
    <FeaturedArticles />

    <Divider double/>

    <div className={'row'}>
      <div className={'col'}>
        <FeaturedEvents />
      </div>
      <div className={'col'}>
        <LastNews />
      </div>
    </div>

    <Divider double/>

    <LastVideos />

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
          padding: 5px;
        }
      }
    `}</style>
  </PageFrame>;
}

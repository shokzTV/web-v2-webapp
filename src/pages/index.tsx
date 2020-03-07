import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import FeaturedArticles from '../components/pages/index/FeaturedArticles';
import Divider from '../components/Divider';
import FeaturedEvents from '../components/pages/index/FeaturedEvents';
import LastNews from '../components/pages/index/LastNews';

export default function index(): ReactElement {
  return <PageFrame>
    
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
    `}</style>
  </PageFrame>;
}
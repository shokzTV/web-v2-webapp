import React, { ReactElement } from 'react'
import FeaturedEvents from '../components/blocks/FeaturedEvents';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import PageFrame from '../components/PageFrame';
import Divider from '../components/Divider';
import LatestNewsList from '../components/blocks/LatestNewsList';
import LatestVideos from '../components/blocks/LatestVideos';
import LastArticleEntries from '../components/blocks/LastArticleEntries';
import { reduxPage } from '../config/redux';

function index(): ReactElement {
  return <>
    <PageFrame>
      <LastArticleEntries />

      <Divider />

      <div>
        <Row gutter={[50, 30]} style={{margin: '0!important'}}>
          <Col xs={24} sm={12}>
            <FeaturedEvents />
          </Col>
          <Col xs={24} sm={12}>
            <LatestNewsList />
          </Col>
        </Row>
      </div>

      <Divider />
      
      <LatestVideos />
    </PageFrame>
  </>;
}

export default reduxPage(index);
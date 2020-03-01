import React, { ReactElement } from 'react'
import FeaturedEvents from '../components/blocks/FeaturedEvents';
import { Row, Col, Divider } from 'antd';
import PageFrame from '../components/PageFrame';
import LastArticleEntries from '../components/blocks/LastArticleEntries';
import LatestVideos from '../components/blocks/LatestVideos';
import LatestNewsList from '../components/blocks/LatestNewsList';

export default function index(): ReactElement {
  return <>
    <PageFrame>
      <LastArticleEntries />

      <Divider />

      <Row type={'flex'} gutter={[30, 30]}>
        <Col xs={24} sm={12}>
          <FeaturedEvents />
        </Col>
        <Col xs={24} sm={12}>
          <LatestNewsList />
        </Col>
      </Row>

      <Divider />
      
      <LatestVideos />
    </PageFrame>
  </>;
}
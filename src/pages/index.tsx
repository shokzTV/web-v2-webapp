import React, { ReactElement } from 'react'
import FeaturedEvents from '../components/blocks/FeaturedEvents';
import { Row, Col, Divider } from 'antd';
import PageFrame from '../components/PageFrame';
import LastNewsEntries from '../components/blocks/LastNewsEntries';
import LatestVideos from '../components/blocks/LatestVideos';

export default function index(): ReactElement {
  return <>
    <PageFrame showSelectedEvent={true}>
      <LastNewsEntries />

      <Divider />

      <Row>
        <Col xs={24} sm={12}>
          <FeaturedEvents />
        </Col>
      </Row>

      <Divider />
      
      <LatestVideos />
    </PageFrame>
  </>;
}
import React, { ReactElement } from 'react'
import PageFrame from '../components/PageFrame';
import LastNewsEntries from '../components/blocks/LastNewsEntries';
import FeaturedEvents from '../components/blocks/FeaturedEvents';
import { Row, Col } from 'antd';

export default function index(): ReactElement {
  return <>
    <PageFrame showSelectedEvent={true}>
      <LastNewsEntries />

      <Row>
        <Col xs={24} sm={12}>
          <FeaturedEvents />
        </Col>
      </Row>
    </PageFrame>
  </>;
}
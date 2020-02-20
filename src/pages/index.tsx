import React, { ReactElement } from 'react'
import FeaturedEvents from '../components/blocks/FeaturedEvents';
import { Row, Col } from 'antd';
import PageFrame from '../components/PageFrame';
import LastNewsEntries from '../components/blocks/LastNewsEntries';

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
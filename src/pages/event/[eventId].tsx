import React, { ReactElement, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { eventsSelector } from '../../store/selectors/Event';
import Header from '../../components/Header';
import Divider from '../../components/Divider';
import { Row, Col } from 'antd';
import LoadingImage from '../../components/blocks/LoadingImage';
import { useEventImage } from '../../hooks/image';
import Title from 'antd/lib/typography/Title';
import { useEventDate, useEventOrganizer } from '../../hooks/event';
import ReactCountryFlag from "react-country-flag";
import { eventLinksSelector } from '../../store/selectors/EventLinks';
import { loadEventRelations } from '../../store/Ui';
import EventArticles from '../../components/blocks/EventArticles';
import EventVideos from '../../components/blocks/EventVideos';
import { loadEvents } from '../../store/Event';

export default function Event(): ReactElement {
    const dispatch = useDispatch();
    const router = useRouter();
    const eventId = +router.query.eventId;
    const event = useSelector(eventsSelector)(eventId);
    const eventImage = useEventImage();
    const eventDate = useEventDate()(eventId);
    const organizerName = useEventOrganizer(eventId);
    const eventLinks = useSelector(eventLinksSelector)(eventId);

    useEffect(() => {
        dispatch(loadEvents([eventId]));
        dispatch(loadEventRelations(eventId));
    }, []);

    return <PageFrame>
        <Header title={'Events > ' + (event ? event.name : '')} />

        <Divider />

        <Row type={'flex'} gutter={[50, 50]}>
            <Col xs={24} sm={12}>
                <div className={'imageWrapper'}>
                    <LoadingImage src={eventImage(eventId)} />
                </div>
            </Col>
            <Col xs={24} sm={12}>
                <Title level={3}>{event && event.name}</Title>
                <Row type={'flex'} gutter={[20, 20]}>
                    <Col xs={24} sm={14}>
                        <h4>Eventinformationen</h4>
                        <div className={'dataRow'}>
                            <div className={'label'}>Datum:</div>
                            <div>{eventDate}</div>
                        </div>
                        {organizerName && organizerName.length > 0 && <div className={'dataRow'}>
                            <div className={'label'}>Veranstalter:</div>
                            <div>{organizerName}</div>
                        </div>}
                        <div className={'dataRow'}>
                            <div className={'label'}>Ort:</div>
                            <div className={'location'}>
                                {event && <ReactCountryFlag svg countryCode={event.country} />}
                                &nbsp;
                                <div>{event && event.location}</div>
                            </div>
                        </div>
                        {event && event.pricePool.length > 0 && <div className={'dataRow'}>
                            <div className={'label'}>Preisgeld:</div>
                            <div>{event && event.pricePool}</div>
                        </div>}
                    </Col>
                    <Col xs={24} sm={10}>
                        <h4>Eventlinks</h4>
                        <ul className={'listWrapper'}>
                            {eventLinks.map(({id, name, link}) => <li key={id}><a target={'_blank'} href={link}>{name}</a></li>)}
                        </ul>
                    </Col>
                </Row>
            </Col>
        </Row>

        <EventArticles eventId={eventId} />
        <EventVideos eventId={eventId} />

        <style jsx>{`
            .imageWrapper {
                position: relative;
                padding-bottom: 56.2%;
                height: 0;
                overflow: hidden; 
            }

            .dataRow {
                display: flex;
                flex-direction: row;
                align-items: center;
                margin-top: 8px;
            }

            .location {
                display: flex;
                flex-direction: row;
                align-items: center;
            }

            .label {
                width: 100px;
            }

            .listWrapper {
                padding-left: 18px;
            } 
        `}</style>
    </PageFrame>;
}
import { ReactElement, useEffect } from "react";
import Header from "../Header";
import { Row, Col, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { featuredEventsSelector, eventEntitiesSelector } from "../../store/selectors/Event";
import { loadFeaturedEvents } from "../../store/Event";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import LoadingImage from "./LoadingImage";
import { useEventImage } from "../../hooks/image";
import { useEventDate } from "../../hooks/event";
import Link from "next/link";
import classNames from "classnames";

export default function UpcomingEvents(): ReactElement {
    const dispatch = useDispatch();
    const currentTs = dayjs().unix();
    const featured = useSelector(featuredEventsSelector);
    const events = featured.length > 0 ? featured : [...Array(4).keys()];
    const eventEntities = useSelector(eventEntitiesSelector);
    const eventImage = useEventImage();
    const eventDate = useEventDate();

    useEffect(() => {
        dispatch(loadFeaturedEvents());
    }, []);
    
    return <div>
        <Header title={'Events'} link={'Vorherige Events anzeigen'} />

        <Row align={'middle'} justify={'space-between'} gutter={[40, 40]}>
            {events.map((eventId) => {
                const event = eventEntities[eventId];
            
                return <Col key={eventId} sm={12} xs={24}>
                    <Link as={`/event/${eventId}`} href={'/event/[eventId]'}>
                        <a>
                            <div className={'imageWrapper'}>
                                <LoadingImage src={eventImage(eventId)} />

                                <div className={'eventInfo'}>
                                    {event && <>
                                        <Title level={3}>{event.name}</Title>
                                        <div className={classNames('info', {finished: event.end < currentTs})}>
                                            {event.start > currentTs ? 'Demnächst' : (event.end < currentTs ? 'Abgeschlossen' : <span className={'active'}>Jetzt</span>)}:
                                            &nbsp;
                                            {eventDate(eventId)}
                                        </div>
                                    </>}
                                    {!event && <Skeleton paragraph={{rows: 1}} />}
                                </div>
                            </div>
                        </a>
                    </Link>
                </Col>;
            })}
        </Row>

        <style jsx>{`
            .imageWrapper {
                position: relative;
                padding-bottom: 56.2%;
                height: 0;
                overflow: hidden; 
            }
            
            .eventInfo {
                background-color: rgba(0,0,0,.8);
                bottom: 0;
                left: 0;
                right: 0;
                position: absolute;
                padding: 14px 15px;
                color: rgba(255, 255, 255, .7);
            }

            .info {
                color: #FFF;
                font-size: 18px;
            }
            .info.finished {
                color: rgba(255, 255, 255, .7);
            }

            .eventInfo :global(h3) {
                color: #FFF!important;
                text-transform: uppercase;
                margin-bottom: 0;
            }

            .active {
                color: #e3211c;
                text-transform: uppercase;
            }
        `}</style>
    </div>;
}
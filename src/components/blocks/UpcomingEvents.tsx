import { ReactElement, useEffect } from "react";
import Header from "../Header";
import { Row, Col, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { featuredEventsSelector, eventEntitiesSelector } from "../../store/selectors/Event";
import { loadFeaturedEvents } from "../../store/Event";
import { tagsEntitiesSelector } from "../../store/selectors/Tags";
import Title from "antd/lib/typography/Title";
import dayjs from "dayjs";
import LoadingImage from "./LoadingImage";

function period(start: number, end: number): string {
    return `${dayjs.unix(start).format('DD')} - ${dayjs.unix(start).format('DD MMMM YYYY')}`;
}

export default function UpcomingEvents(): ReactElement {
    const dispatch = useDispatch();
    const currentTs = dayjs().unix();
    const featured = useSelector(featuredEventsSelector);
    const tagEntities = useSelector(tagsEntitiesSelector);
    const events = featured.length > 0 ? featured : [...Array(4).keys()];
    const eventEntities = useSelector(eventEntitiesSelector);

    useEffect(() => {
        dispatch(loadFeaturedEvents());
    }, []);
    
    return <div>
        <Header title={'Events'}/>

        <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[40, 20]}>
            {events.map((eventId) => {
                const event = eventEntities[eventId];
                const tagId = event && event.tags.find((tagId) => !!tagEntities[tagId].image);
                const tag = tagId && tagEntities[tagId];
            
                return <Col key={eventId} sm={12} xs={24}>
                    <div className={'imageWrapper'}>
                        <LoadingImage src={tag && tag.image} />

                        <div className={'eventInfo'}>
                            {event && <>
                                <Title level={3}>{event.name}</Title>
                                <div>
                                    {event.start > currentTs ? 'Demnächst' : (event.end < currentTs ? 'Abgeschlossen' : <span className={'active'}>Jetzt</span>)}:
                                    &nbsp;
                                    {period(event.start, event.end)}
                                </div>
                            </>}
                            {!event && <Skeleton paragraph={{rows: 1}} />}
                        </div>
                    </div>

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
                padding: 10px 15px;
                color: rgba(255, 255, 255, .7);
            }

            .eventInfo :global(h3) {
                color: #FFF!important;
            }

            .active {
                color: #F00;
            }
        `}</style>
    </div>;
}
import { ReactElement, useState } from "react";
import Header from "../Header";
import { Row, Col, Skeleton, Pagination } from "antd";
import { usePastEventsList } from "../../hooks/pastEventsList";
import Title from "antd/lib/typography/Title";
import { useSelector } from "react-redux";
import { pastEventIdsSelector, eventEntitiesSelector } from "../../store/selectors/Event";
import { useEventImage } from "../../hooks/image";
import LoadingImage from "./LoadingImage";
import { useEventDate } from "../../hooks/event";
import Link from "next/link";

const pageSize = 10;
export default function PastEvents(): ReactElement {
    const totalCount = useSelector(pastEventIdsSelector).length;
    const [page, setPage] = useState(1);
    const events = useSelector(eventEntitiesSelector);
    const eventIds = usePastEventsList(page - 1, pageSize);
    const eventImage = useEventImage();
    const eventDate = useEventDate(true);
    
    return <div>
        <Header title={'Vorherige Events'}/>

        <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[40, 20]}>
            {eventIds.map((eventId) => {
                const event = events[eventId];
                return <Col key={eventId} sm={12} xs={24}>
                    <Link href={'/event/[eventId]'} as={`/event/${eventId}`}>
                        <a>
                            <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[15, 10]}>
                                <Col xs={10}>
                                    <div className={'imageWrapper'}>
                                        <LoadingImage src={eventImage(eventId)} />
                                    </div>
                                </Col>
                                <Col xs={14}>
                                    {event && <>
                                        <Title level={4}>{event.name}</Title>
                                        <div>{eventDate(event.id)}</div>
                                    </>}

                                    {!event && <Skeleton title={{width: '100%'}} paragraph={{rows: 1, width: '100%'}} />}
                                </Col>
                            </Row>
                        </a>
                    </Link>
                </Col>
            })}
        </Row>

        {pageSize < totalCount && <Row>
            <br />
            <Pagination current={page} onChange={(page) => setPage(page)} total={totalCount} pageSize={pageSize} />
        </Row>}
        
        <style jsx>{`
            .imageWrapper {
                position: relative;
                padding-bottom: 56.2%;
                height: 0;
                overflow: hidden; 
            }
        `}</style>
    </div>;
}
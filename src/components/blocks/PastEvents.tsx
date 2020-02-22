import { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { Row, Col, Skeleton, Pagination } from "antd";
import dayjs from "dayjs";
import { usePastEventsList } from "../../hooks/pastEventsList";
import Title from "antd/lib/typography/Title";
import { useSelector } from "react-redux";
import { featuredEventsSelector, pastEventIdsSelector } from "../../store/selectors/Event";
import { getImageUrl } from "../../hooks/image";
import { tagsEntitiesSelector } from "../../store/selectors/Tags";

function period(start: number, end: number): string {
    return `${dayjs.unix(start).format('DD')} - ${dayjs.unix(start).format('DD MMMM YYYY')}`;
}

const pageSize = 10;
export default function PastEvents(): ReactElement {
    const totalCount = useSelector(pastEventIdsSelector).length;
    const [page, setPage] = useState(1);
    const pastEvents = usePastEventsList(page - 1, pageSize);
    const tagEntities = useSelector(tagsEntitiesSelector);
    
    const preloadCount = useMemo(() => {
        if(pastEvents.length > 0) {
            return 0;
        }
        if(totalCount > 0 && page * pageSize > totalCount) {
            return totalCount % pageSize;
        }
        return pageSize;
    }, [page, pastEvents, totalCount]);
    
    return <div>
        <Header title={'Vorherige Events'}/>

        <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[40, 20]}>
            {pastEvents.map((event) => {
                const tagId = event.tags.find((tagId) => !!tagEntities[tagId].image);
                const tag = tagEntities[tagId];
                return <Col key={event.id} sm={12} xs={24}>
                    <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[15, 10]}>
                        <Col xs={10}>
                            <div className={'imageWrapper'}>
                                <img className={'image'} src={getImageUrl(tag.image)} />
                            </div>
                        </Col>
                        <Col xs={14}>
                            <Title level={4}>{event.name}</Title>
                            <div>{period(event.start, event.end)}</div>
                        </Col>
                    </Row>
                </Col>
            })}

            {[...Array(preloadCount).keys()].map((id) => <Col key={id} sm={12} xs={24}>
                <Row type={'flex'} align={'middle'} justify={'space-between'} gutter={[15, 10]}>
                    <Col xs={10}>

                    </Col>
                    <Col xs={14}>
                        <Skeleton title={{width: '100%'}} paragraph={{rows: 1, width: '100%'}} />
                    </Col>
                </Row>
            </Col>)}
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

            .image {
                object-fit: cover;
                width: 100%;
            }
        `}</style>
    </div>;
}
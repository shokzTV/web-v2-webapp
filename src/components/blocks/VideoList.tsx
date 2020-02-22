import React, { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { useSelector } from "react-redux";
import { availableVideosSelector } from "../../store/selectors/Ui";
import { Pagination, Row, Col, Skeleton } from "antd";
import classNames from "classnames";
import { resolve } from "styled-jsx/css";
import Divider from "../Divider";
import { useVideoList } from "../../hooks/videoList";
import { getImageUrl } from "../../hooks/image";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        padding-bottom: 56.2%;
        position: relative;
        overflow: hidden;
    }

    .imageWrapper img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .imageSkeleton {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
    }
    .imageSkeleton :global(.ant-skeleton-content) {
        height: 100%;
        display: block;
    }

    .imageSkeleton :global(.ant-skeleton-paragraph) {
        height: 100%;
        margin: 0;
    }
    .imageSkeleton :global(li) {
        height: 100%;
    }

    .imageTitle :global(li) {
        height: 18px;
    }
`;
//#endregion

const pageSize = 12;
export default function VideoList(): ReactElement {
    const totalCount = useSelector(availableVideosSelector).length;
    const [page, setPage] = useState(1);
    const pageVideos = useVideoList(page - 1, pageSize);
    const preloadCount = useMemo(() => {
        if(pageVideos.length > 0) {
            return 0;
        }
        if(totalCount > 0 && page * pageSize > totalCount) {
            return totalCount % pageSize;
        }
        return pageSize;
    }, [page, pageVideos, totalCount]);

    return <>
        <Header title={'Videos > Alle Videos'} />
        <Divider />

        <Row type={'flex'} justify={'end'}>
            <Pagination current={page} onChange={(page) => setPage(page)} total={totalCount} pageSize={pageSize} />
        </Row>

        <br />

        <Row type={'flex'} align={'middle'} gutter={[25, 25]}>
            {pageVideos.map((video) => <Col sm={8} xs={24} key={video.id}>
                <div className={classNames(className, 'imageWrapper')}>

                    <img className={className} src={getImageUrl(video.thumbnail)} />
                </div>
            </Col> )}

            {[...Array(preloadCount).keys()].map((video) => <Col sm={8} xs={24} key={video}>
                <div className={classNames(className, 'imageWrapper')}>
                    <Skeleton className={classNames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />
                </div>
            </Col>)}
        </Row>

        {styles}
    </>;
}
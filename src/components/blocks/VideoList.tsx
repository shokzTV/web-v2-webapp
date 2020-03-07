import React, { ReactElement, useState, useMemo } from "react";
import Header from "../Header";
import { useSelector, connect } from "react-redux";
import { availableVideosSelector } from "../../store/selectors/Ui";
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import classNames from "classnames";
import { resolve } from "styled-jsx/css";
import Divider from "../Divider";
import { useVideoList } from "../../hooks/videoList";
import LoadingImage from "./LoadingImage";
import { videoEntitiesSelector } from "../../store/selectors/Videos";
import Link from "next/link";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        padding-bottom: 56.2%;
        position: relative;
        overflow: hidden;
    }
`;
//#endregion

const pageSize = 12;
function VideoList(): ReactElement {
    const totalCount = useSelector(availableVideosSelector).length;
    const videos = useSelector(videoEntitiesSelector);
    const [page, setPage] = useState(1);
    const videoIds = useVideoList(page - 1, pageSize);

    return <>

        <Link href="/about">
            <a>Homepage</a>
        </Link>
        <Header title={'Videos > Alle Videos'} />
        <Divider />

        <Row justify={'space-around'}>
        </Row>

        <br />

        <Row align={'middle'} gutter={[25, 25]}>
            {videoIds.map((videoId) => {
                const video = videos[videoId];
                return <Col sm={8} xs={24} key={videoId}>
                    <a href={video && video.source} target={'_blank'} rel={'noreferrer'}>
                        <div className={classNames(className, 'imageWrapper')}>
                            <LoadingImage src={video && video.thumbnail} webp={video && video.thumbnailWEBP} jp2={video && video.thumbnailJP2} />
                        </div>
                    </a>
                </Col>
            })}
        </Row>

        <br />

        <Row justify={'space-around'}>
        </Row>

        {styles}
    </>;
}

export default connect()(VideoList);
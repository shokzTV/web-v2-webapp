import { ReactElement, useMemo, useEffect } from "react";
import { Row, Col, Carousel, Icon } from "antd";
import Title from "antd/lib/typography/Title";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";
import { Skeleton } from 'antd';
import Link from "next/link";
import { motion } from 'framer-motion';
import { articlesSelector } from "../../store/selectors/Articles";
import { useSelector, useDispatch } from "react-redux";
import LoadingImage from "./LoadingImage";
import { eventRelationsSelector } from "../../store/selectors/Ui";
import { loadArticles } from "../../store/Article";
import { videoEntitiesSelector } from "../../store/selectors/Videos";
import { loadVideos } from "../../store/Video";
import { COLORS } from "../../style/colors";

//#region <styles>
const {className, styles} = resolve`
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .content {
        line-height: 200%;
    }

    .imageTitle :global(ul) {
        padding-top: 6px;
        margin-bottom: 4px;
    }

    .imageTitle :global(li) {
        height: 18px;
        margin-left: 0;
    }

    .imageTitle :global(li + li) {
        margin-top: 10px;
    }

    .titleSkeleton :global(.ant-skeleton-title) {
        margin-top: 1px;
        margin-bottom: 15px;
    }
`;
//#endregion

function NextArrow(props): ReactElement {
    const {onClick} = props;
    return <div className={'icon slick-arrow slick-next' } onClick={onClick}>
        <Icon type="right-circle" />
        <style jsx>{`.icon {font-size: 20px;}`}</style>
    </div>;
}

function PrevArrow(props): ReactElement {
    const {onClick} = props;
    return <div className={'icon slick-arrow slick-prev'} onClick={onClick}>
        <Icon type="left-circle" />
        <style jsx>{`.icon {font-size: 20px;}`}</style>
    </div>;
}

export default function EventVideos({eventId}: {eventId: number}): ReactElement | null{
    const eventRelation = useSelector(eventRelationsSelector)[eventId];
    const videos = useSelector(videoEntitiesSelector);
    const videoIds = useMemo(() => eventRelation ? eventRelation.videos : [0, 0, 0], [eventRelation]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadVideos(videoIds));
    }, [videoIds]);

    if(videoIds.length > 0) {
        return <motion.div initial="exit" animate="enter" exit="exit">
            <Divider />
            <Header title={'Videos zum Event'} link={'Alle Videos zum Event'}/>

            <br />

            <Carousel 
                autoplay 
                draggable
                slidesToShow={3} 
                slidesToScroll={1} 
                swipeToSlide 
                initialSlide={0}
                dots={false} 
                arrows={true} 
                nextArrow={<NextArrow />}
                prevArrow={<PrevArrow />}
            >
                {videoIds.map((videoId) => {
                    const video = videos[videoId];

                    return <div key={videoId} className={'videoEntry'}>
                        <div className={'thumbnailWrapper'}>
                            <a href={video ? video.source : ''} target={'_blank'}>
                                <LoadingImage src={video && video.thumbnail} />
                            </a>
                        </div>
                    </div>
                })}
            </Carousel>

            <style jsx>{`
                .thumbnailWrapper {
                    margin: 10px;
                    position: relative;
                    padding-bottom: 56.2%;
                    overflow: hidden;
                    border-radius: 15px;
                }
            `}</style>

            <style jsx global>{`
                .ant-carousel {
                    padding: 0 30px 20px 30px;
                }
                .ant-carousel .slick-dots li button {
                    background-color: rgba(0,0,0,.5);
                }
                .ant-carousel .slick-dots li.slick-active button {
                    background-color: ${COLORS.PRIMARY};
                }
                .ant-carousel .slick-dots-bottom {
                    bottom: 0;
                } 
            `}</style>
        </motion.div>;
    }

    return null;
}
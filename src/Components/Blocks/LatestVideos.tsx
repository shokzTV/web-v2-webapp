import { ReactElement } from "react";
import Header from "../Header";
import { useVideoList } from "../../hooks/videoList";
import { Carousel, Skeleton } from "antd";
import { getImageUrl } from "../../hooks/image";
import { COLORS } from "../../style/colors";
import { resolve } from "styled-jsx/css";
import classNames from "classnames";


//#region <styles>
const {className, styles} = resolve`
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

export default function LatestVideos(): ReactElement {
    const videos = useVideoList(0, 10);
    
    return <>
        <Header title={'Neuste Videos'}  link={'Alle Videos anzeigen'} />

        <Carousel autoplay slidesToShow={3} slidesToScroll={1} dots swipeToSlide initialSlide={0}>
            {videos.map((video) => <div key={video.id} className={'videoEntry'}>
                <div className={'thumbnailWrapper'}>
                    <a href={video.source} target={'_blank'}>
                        <img className={'thumbnail'} src={getImageUrl(video.thumbnail)} />
                    </a>
                </div>
            </div>)}
            {videos.length === 0 && [...Array(10).keys()].map((id) => <div key={id} className={'videoEntry'}>
                <div className={'thumbnailWrapper'}>
                    <Skeleton className={classNames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />
                </div>
            </div>)}
        </Carousel>
    
        <style jsx>{`
            .thumbnailWrapper {
                margin: 10px;
                position: relative;
                padding-bottom: 56.2%;
                overflow: hidden;
                border-radius: 15px;
            }

            .thumbnail {
                position: absolute;
                object-fit: contains;
                width: 100%;
                height: 100%;
            }
        `}</style>

        <style jsx global>{`
            .ant-carousel {
                padding-bottom: 20px;
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
        {styles}
    </>;
}
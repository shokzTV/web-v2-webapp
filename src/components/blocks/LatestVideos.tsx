import { ReactElement } from "react";
import Header from "../Header";
import { useVideoList } from "../../hooks/videoList";
import { Carousel } from "antd";
import { COLORS } from "../../style/colors";
import { useSelector } from "react-redux";
import { videoEntitiesSelector } from "../../store/selectors/Videos";
import LoadingImage from "./LoadingImage";

export default function LatestVideos(): ReactElement {
    const videoIds = useVideoList(0, 10);
    const videos = useSelector(videoEntitiesSelector);
    
    return <>
        <Header title={'Neuste Videos'}  link={'Alle Videos anzeigen'} />

        <Carousel autoplay slidesToShow={3} slidesToScroll={1} dots swipeToSlide initialSlide={0}>
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
    </>;
}
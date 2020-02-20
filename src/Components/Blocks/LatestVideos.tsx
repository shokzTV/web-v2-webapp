import { ReactElement } from "react";
import Header from "../Header";
import { useVideoList } from "../../hooks/videoList";
import { Carousel } from "antd";
import { getImageUrl } from "../../hooks/image";
import { COLORS } from "../../style/colors";


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
    </>;
}
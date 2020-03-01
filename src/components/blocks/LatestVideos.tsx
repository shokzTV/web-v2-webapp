import { ReactElement } from "react";
import Header from "../Header";
import { useVideoList } from "../../hooks/videoList";
import { Carousel, Icon } from "antd";
import { COLORS } from "../../style/colors";
import { useSelector } from "react-redux";
import { videoEntitiesSelector } from "../../store/selectors/Videos";
import LoadingImage from "./LoadingImage";

const responsiveConfig = [{
    breakpoint: 1024,
    settings: {
      slidesToShow: 3,
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
    }
  }
];

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

export default function LatestVideos(): ReactElement {
    const videoIds = useVideoList(0, 10);
    const videos = useSelector(videoEntitiesSelector);
    
    return <>
        <Header title={'Neuste Videos'}  link={'Alle Videos anzeigen'} />

        <Carousel 
            autoplay 
            draggable
            slidesToShow={3} 
            slidesToScroll={1} 
            initialSlide={0}
            responsive={responsiveConfig} 
            dots={false} 
            arrows={true} 
            nextArrow={<NextArrow />}
            prevArrow={<PrevArrow />}>
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

            .icon {
                font-size: 20px;
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

            .slick-arrow {
                font-size: 20px!important;
            }
        `}</style>
    </>;
}
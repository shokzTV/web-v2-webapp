import { ReactElement, useMemo, useEffect } from "react";
import { Carousel } from "antd";
import Header from "../Header";
import Divider from "../Divider";
import { useSelector, useDispatch } from "react-redux";
import LoadingImage from "./LoadingImage";
import { eventRelationsSelector } from "../../store/selectors/Ui";
import { videoEntitiesSelector } from "../../store/selectors/Videos";
import { loadVideos } from "../../store/Video";
import { COLORS } from "../../style/colors";

function NextArrow(props): ReactElement {
    const {onClick} = props;
    return (
        <div className={'icon slick-arrow slick-next' } onClick={onClick}>
            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path></svg>
            <style jsx>{`.icon {font-size: 20px;}`}</style>
        </div>
    );
}

function PrevArrow(props): ReactElement {
    const {onClick} = props;
    return (
        <div className={'icon slick-arrow slick-prev'} onClick={onClick}>
            <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path></svg>
            <style jsx>{`.icon {font-size: 20px;}`}</style>
        </div>
    );
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
        return <div>
            <Divider />
            <Header title={'Videos zum Event'} link={'Alle Videos zum Event'}/>

            <br />

            <Carousel 
                autoplay 
                draggable
                pauseOnHover
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
                            <a href={video ? video.source : ''} target={'_blank'} rel={'noreferrer'}>
                                <LoadingImage src={video && video.thumbnail} webp={video && video.thumbnailWEBP} jp2={video && video.thumbnailJP2} />
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
        </div>;
    }

    return null;
}
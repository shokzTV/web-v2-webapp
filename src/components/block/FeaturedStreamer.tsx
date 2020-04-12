import { ReactElement, useState, useEffect } from "react";
import { COLORS } from "../../style/colors";
import { Streamer } from "../../api/@types/Streamer";
import { fetchOnlineStreamer } from "../../api/streamer";
import classNames from "classnames";
import Header from "../Header";
import LoadingImage, { toAlt } from "./ImageLoader";
import TwoColCarousel from "./TwoColCarousel";

export default function FeaturedStreamer({isVisible}: {isVisible: boolean}): ReactElement {
    const [streamer, setStreamer] = useState<Streamer[]>([]);

    useEffect(() => {
        const load = async () => {
            if(streamer.length === 0 && isVisible) {
                const online = await fetchOnlineStreamer();
                setStreamer(online.sort(({viewer: a}, {viewer: b}) => b - a));
            }
        };
        load();
    }, [isVisible]);

    return <div className={classNames('featuredStreamer', {onlineStreamer: streamer.length > 0})}>
        <div className={'featuredStreamerInner'}>
            <Header title={'Ausgewählte Deutsche Livestreams'} inverted prefix={'live'} />

            <TwoColCarousel slidesToShow={streamer.length}>
                {streamer.map((streamer) => <div key={streamer.id} className={'streamerCol'}>
                    <a className={'streamerLink'} key={streamer.id} href={`https://twitch.tv/${streamer.name}`} target={'_blank'} rel={'noreferrer'}>
                        <div className={'preview'}>
                            <div className={'previewImage'}>
                                <LoadingImage src={streamer.preview} webp={streamer.previewWEBP} jp2={streamer.previewJP2} altTag={toAlt(streamer.name + ' preview')}/>
                            </div>
                        </div>

                        <div className={'info'}>
                            <div className={'details'}>
                                <h4>{streamer.name}</h4>
                                <div className={'title'}>
                                    {streamer.title}
                                </div>
                            </div>
                            <div className={'viewer'}>
                                <div className={'viewerCount'}>{streamer.viewer}</div>
                                <div className={'userIcon'}>
                                    <svg viewBox="64 64 896 896" width={'1em'} height={'1em'}><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                                </div>
                            </div>
                        </div>
                    </a>
                </div>)}
            </TwoColCarousel>
        </div>

        <style jsx>{`
            .featuredStreamer {
                background-color: ${COLORS.PRIMARY};
                padding: 20px 20px 40px 20px;
                overflow: hidden;
                display: none;
            }

            .onlineStreamer {
                display: block;
            }

            .featuredStreamerInner {
                max-width: 1175px;
                padding: 0 40px;
                margin: 0 auto;
            }

            .streamerLink {    
                margin: 10px 25px;
                display: flex;
                align-items: center;
                text-decoration: none;
            }

            .preview {
                width: 35%;
            }

            .info {
                padding-left: 40px;
                width: 65%;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .info * {
                color: #FFF;
                font-size: 18px;
            }

            .info h4 {
                font-size: 22px;
            }

            .info .viewerCount {
                color: #0D6AB5;
            }

            .previewImage {
                position: relative;
                padding-bottom: 56.2%;
            }

            .title {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            .viewer {
                display: flex;
                align-items: center;
            }

            .userIcon {
                padding-top: 3px;
            }

            .userIcon svg {
                fill: #FF0100;
            }

            .viewerCount {
                margin-right: 8px;
                color: #0D6AB5;
            }

            .details, .info, .preview {
                overflow: hidden;
            }

            .viewer {
                flex-shrink: 0;
            }

            @media only screen and (max-width: 768px) { 
                .streamerRow {
                    flex-direction: column;
                    margin: 0;
                }
                .streamerCol {
                    width: 100%;
                }
            }

            @media only screen and (max-width: 425px) {
                .streamerCol {
                    padding: 20px 5px;
                }

                .featuredStreamerInner {
                    padding: 0;
                }

                .streamerLink {
                    flex-direction: column;
                    margin: 10px;
                }

                .preview, .info {
                    width: 100%;
                }

                .info {
                    margin-top: 10px;
                    padding-left: 0;
                }
            }
        `}</style>
    </div>;
}

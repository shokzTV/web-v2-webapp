import { ReactElement, useState, useEffect } from 'react';
import Header from '../../Header';
import { Video } from '../../../api/@types/Video';
import Carousel from '../../block/Carousel';
import LoadingImage from '../../block/ImageLoader';

export default function LastVideos({videos}: {videos: Video[]}): ReactElement {
    return <>
        <Header title={'NEUSTE VIDEOS'} link={'ALLE VIDEOS ANZEIGEN'} linkTarget={'/videos'} reduceSpacing/>
        <Carousel>
            {videos.map((video, index) => <div key={(video && video.id) + '-' + index} className={'videoEntry'}>
                <div className={'thumbnailWrapper'}>
                    <a href={video ? video.source : ''} target={'_blank'} rel={'noreferrer'}>
                        <LoadingImage src={video && video.thumbnail} 
                                      webp={video && video.thumbnailWEBP} 
                                      jp2={video && video.thumbnailJP2} />
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

            .icon {
                font-size: 20px;
            }
        `}</style>
    </>;
}
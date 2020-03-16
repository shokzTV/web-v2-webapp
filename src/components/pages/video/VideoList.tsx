import { ReactElement } from "react";
import Header from "../../Header";
import { Video } from "../../../api/@types/Video";
import { usePagination } from "../../../hooks/entryPagination";
import { fetchVideoIds, fetchVideos } from "../../../api/video";
import Pagination from "../../block/Pagination";
import LoadingImage from "../../block/ImageLoader";

export default function VideoList({videoIds, videos}: {videoIds: number[]; videos: Video[]}): ReactElement {
    const {
        page,
        total,
        setPage,
        entries
    } = usePagination<Video>(12, videoIds, videos, fetchVideos);

    return <>
        <Header title={'Alle Videos'} topHeader />

        <Pagination  page={page} total={total} setPage={setPage} noTopSpacing />

        <div className={'videoGrid'}>
            {entries.map((video, index) => <div className={'column'} key={(video && video.id) + '-' + index}>
                <a href={video && video.source} target={'_blank'} rel={'noreferrer'}>
                    <div className={'thumbnail'}>
                        <LoadingImage src={video && video.thumbnail} 
                                      webp={video && video.thumbnailWEBP} 
                                      jp2={video && video.thumbnailJP2} />
                    </div>
                </a>
            </div>)}
        </div>

        <Pagination  page={page} total={total} setPage={setPage} />

        <style jsx>{`
            .videoGrid {
                display: flex;
                flex-wrap: wrap;
                margin: -20px;
            }

            .column {
                padding: 20px;
                width: 33%;
            }

            .thumbnail {
                position: relative;
                padding-bottom: 56.2%;
            }
            
            @media only screen and (max-width: 768px) { 
                .videoGrid {
                    margin: 0;
                }

                .column {
                    width: 50%;
                }  
            }

            @media only screen and (max-width: 425px) { 
                .column {
                    padding: 5px;
                    width: 100%;
                }  
            }
        `}</style>      
    </>;
}
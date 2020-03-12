import { ReactElement, useState, useEffect } from "react";
import { Event } from "../../../../api/@types/Event";
import { Video } from "../../../../api/@types/Video";
import { Article } from "../../../../api/@types/Article";
import { fetchTagRelations } from "../../../../api/tag";
import Divider from "../../../Divider";
import Header from "../../../Header";
import Carousel from "../../../block/Carousel";
import Link from "next/link";
import LoadingImage from "../../../block/ImageLoader";
import TextLoader from "../../../TextLoader";
import EventDetails from "../../events/SingleEventView/EventDetails";
import EventLinks from "../../events/SingleEventView/EventLinks";
import EventDescription from "../../events/SingleEventView/EventDescription";


export default function TagRelations({tagId}: {tagId: number | null}): ReactElement {
    const [event, setEvent] = useState<Event | undefined>();
    const [articles, setArticles] = useState<Partial<Article>[]>(Array(3).fill(undefined));
    const [videos, setVideos] = useState<Video[]>(Array(10).fill(undefined));

    useEffect(() => {
        const load = async () => {
            if(tagId) {
                const relations = await fetchTagRelations(tagId);
                relations.event.length > 0 ? setEvent(relations.event[0]) : setEvent(null);
                setVideos(relations.videos);
                setArticles(relations.articles);
            }
        };
        load();
    }, [tagId]);
    return <>

        {event !== null && <>
            <Divider />
            <Header title={'Tag Event'} />
        
            <Link href={'/event/[eventId]'} as={`/event/${event && event.id}`}>
                <h1>{event ? event.name : <div style={{paddingBottom: '1px'}}><TextLoader type={'h1'} rows={1} /></div>}</h1>
            </Link>

            <div className={'eventDetails'}>
                <div className={'detailsColumn'}>
                    <div className={'details'}>
                        <EventDetails event={event} />
                    </div>
                    <div className={'eventLinks'}>
                        <EventLinks event={event} />
                    </div>
                </div>

                <div className={'eventDescription'}>
                    <EventDescription event={event} noDivider />
                </div>
            </div>
        </>}

        {articles.length > 0 && <>
            <Divider />
            <Header title={'Tag Artikel'} />
            <Carousel slidesToShow={articles.length}>
                {articles.map((article, index) => <div key={(article && article.id) + '-' + index} >
                    <Link href={'/article/[articleId]'} as={'/article/' + (article && article.id)}>
                        <div className={'prevArticleCol'}>
                            <h3 className={'pastArticleHeader'}>{article ? article.title : <TextLoader type={'h3'} rows={2} />}</h3>
                            <div className={'articleCover'}>
                                <LoadingImage src={article && article.cover} 
                                              webp={article && article.coverWEBP} 
                                              jp2={article && article.coverJP2} />
                            </div>
                        </div>
                    </Link>
                </div>)}
            </Carousel>
        </>}

        {videos.length > 0 && <>
            <Divider />
            <Header title={'Tag Videos'} />
            <Carousel slidesToShow={videos.length}>
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
        </>}

        <style jsx>{`
            .thumbnailWrapper {
                margin: 10px;
                position: relative;
                padding-bottom: 56.2%;
                overflow: hidden;
                border-radius: 15px;
                cursor: pointer;
            }

            .icon {
                font-size: 20px;
            }

            .prevArticleCol {
                margin: 10px;
                cursor: pointer;
            }

            .articleCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            .lastArticleHeader {
                margin-bottom: 20px;
            }

            .pastArticleHeader {
                height: 3em;
                margin-bottom: .5em;
                line-height: 1.4;
            }
            .eventDetails {
                display: flex;
                margin: -20px;
            }

            .coverColumn {
                padding: 20px;
                width: 512px;
            }

            .eventCover {
                position: relative;
                padding-bottom: 56.2%;
            }

            h1 {
                margin-bottom: 25px;
            }

            .detailsColumn {
                flex: 1;
                display: flex;
                padding: 20px;
                margin: -20px;
            }

            .details {
                padding: 20px;
                width: 66%;
            }

            .eventLinks {
                padding: 20px;
            }

            .eventDescription {
                width: 50%;
                padding: 20px;
            }

            @media only screen and (max-width: 768px) { 
                h1 {
                    text-align: center;
                }

                .eventDetails {
                    margin: 0;
                    flex-direction: column;
                }

                .coverColumn {
                    margin: 0 auto;
                }

                .detailsColumn {
                    margin: 0;
                }

                .eventDescription {
                    width: 100%;
                }

            }

            @media only screen and (max-width: 425px) { 
                .detailsColumn {
                    flex-direction: column;
                }
                .details, .eventLinks {
                    width: 100%;
                    padding: 5px;
                }
                .eventLinks {
                    margin-top: 20px;
                }
            }
        `}</style>
    </>;
}
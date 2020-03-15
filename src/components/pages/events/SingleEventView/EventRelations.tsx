import { Event } from "../../../../api/@types/Event";
import { ReactElement, useState, useEffect } from "react";
import { Video } from "../../../../api/@types/Video";
import { Article } from "../../../../api/@types/Article";
import { fetchEventRelations } from "../../../../api/event";
import Header from "../../../Header";
import Carousel from "../../../block/Carousel";
import LoadingImage from "../../../block/ImageLoader";
import Divider from "../../../Divider";
import Link from "next/link";
import TextLoader from "../../../TextLoader";
import Truncate from "react-truncate";

export default function EventRelations({event}: {event: Event | null}): ReactElement {
    const [articles, setArticles] = useState<Partial<Article>[]>(Array(3).fill(undefined));
    const [videos, setVideos] = useState<Video[]>(Array(10).fill(undefined));

    useEffect(() => {
        const load = async () => {
            if(event) {
                const relations = await fetchEventRelations(event.id);
                setVideos(relations.videos.sort(({id: a}, {id: b}) => b - a));
                setArticles(relations.articles.sort(({id: a}, {id: b}) => b - a));
            }
        };

        load();
    }, [event]);

    return <>
        {articles.length > 0 && <>
            <Divider />
            <Header title={'Event Artikel'} reduceSpacing/>
            <Carousel slidesToShow={articles.length}>
                {articles.map((article, index) => <div key={(article && article.id) + '-' + index} >
                    <Link href={'/article/[articleId]'} as={'/article/' + (article && article.id)}>
                        <div className={'prevArticleCol'}>
                            <h3 className={'pastArticleHeader'}>{article ? <span><Truncate lines={2}>{article.title}</Truncate></span> : <TextLoader type={'h3'} rows={2} />}</h3>
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
            <Header title={'Event Videos'} reduceSpacing/>
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
                display: flex;

            }

            .pastArticleHeader span {
                align-self: flex-end;
            }
        `}</style>
    </>;
}
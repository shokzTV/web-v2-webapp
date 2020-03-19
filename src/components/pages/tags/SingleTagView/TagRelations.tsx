import { ReactElement, useState, useEffect } from "react";
import { Event } from "../../../../api/@types/Event";
import { Video } from "../../../../api/@types/Video";
import { Article } from "../../../../api/@types/Article";
import { fetchTagRelations } from "../../../../api/tag";
import Divider from "../../../Divider";
import Header from "../../../Header";
import Carousel from "../../../block/Carousel";
import LoadingImage, { toAlt } from "../../../block/ImageLoader";
import Row from "../../articles/ArticleList/Row";

export default function TagRelations({tagId}: {tagId: number | null}): ReactElement {
    const [articles, setArticles] = useState<Article[]>(Array(3).fill(null));
    const [videos, setVideos] = useState<Video[]>(Array(10).fill(undefined));

    useEffect(() => {
        const load = async () => {
            if(tagId) {
                const relations = await fetchTagRelations(tagId);
                setVideos(relations.videos.sort(({id: a}, {id: b}) => b - a));
                setArticles(relations.articles.sort(({id: a}, {id: b}) => b - a));
            }
        };
        load();
    }, [tagId]);
    return <>
        {articles.length > 0 && <>
            {articles.map((article, index) => <Row article={article} key={index + '-' + (article && article.id)} />)}
        </>}

        {videos.length > 0 && <>
            {articles.length === 0 && <Divider />}
            <Header title={'Zugehörige Videos'} reduceSpacing/>
            <Carousel slidesToShow={videos.length}>
                {videos.map((video, index) => <div key={(video && video.id) + '-' + index} className={'videoEntry'}>
                    <div className={'thumbnailWrapper'}>
                        <a href={video ? video.source : ''} target={'_blank'} rel={'noreferrer'}>
                            <LoadingImage src={video && video.thumbnail} 
                                          webp={video && video.thumbnailWEBP} 
                                          jp2={video && video.thumbnailJP2}
                                          altTag={toAlt((video && video.title) + ' thumbnail')} />
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

        `}</style>
    </>;
}
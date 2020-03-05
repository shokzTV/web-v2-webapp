import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTags } from "../../store/Tag";
import Header from "../Header";
import { orderedLastTagesSelector, tagsEntitiesSelector } from "../../store/selectors/Tags";
import { Row, Col, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import { resolve } from "styled-jsx/css";
import classNames from 'classnames';
import LoadingImage from "./LoadingImage";
import Divider from "../Divider";

const {styles, className} = resolve`
    .recentTags {
        position: relative;
        padding-bottom: 56.2%;
        height: 0;
        overflow: hidden;
    }

    .tagDescription {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.7);
        padding: 12px 15px;
    }

    .title {
        color: #FFF;
        margin-bottom: 0px;
        text-transform: uppercase;
    }

    .description {
        color: #FFF;
        margin-bottom: 0;
        font-size: 18px;
    }

    .tagDescription :global(ul) {
        margin-bottom: 0;
    }
`;


export default function RecentArticleTags(): ReactElement {
    const dispatch = useDispatch();
    const tagEntities = useSelector(tagsEntitiesSelector);

    useEffect(() => {
        dispatch(loadTags());
    }, []);

    const tagIds = useSelector(orderedLastTagesSelector);
    const recentTags = tagIds.length > 0 ? tagIds : [...Array(8).keys()];

    return <div>
        <Divider />

        <Header title={'Artikelkategorien'}/>

        <br />

        <Row align={'middle'} gutter={[20, 20]}>
            {recentTags.map((tagId) => {
                const tag = tagEntities[tagId];
                return <Col key={tagId} sm={12} xs={24}>
                    <div className={classNames(className, 'recentTags')}>
                        <LoadingImage src={tag && tag.image} />
                        <div className={classNames(className, 'tagDescription')}>
                            {tag && <>
                                <Title level={3} className={classNames(className, 'title')}>{tag.name}</Title>
                                <Paragraph ellipsis={{rows: 1}} className={classNames(className, 'description')}>
                                    {tag.description}
                                </Paragraph>
                            </>}
                            {!tag && <Skeleton title={false} paragraph={{rows: 2}}/>}
                        </div>
                    </div>
                </Col>
            })}
        </Row>
        
        {styles}
    </div>;
}
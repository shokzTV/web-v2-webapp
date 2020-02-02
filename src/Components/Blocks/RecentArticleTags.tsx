import { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadTags } from "../../store/Tag";
import Header from "../Header";
import { orderedLastTagesSelector } from "../../store/selectors/Tags";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import { resolve } from "styled-jsx/css";
import classNames from 'classnames';

const {styles, className} = resolve`
    .recentTags {
        position: relative;
        padding-bottom: 56.2%;
        height: 0;
        overflow: hidden;
    }

    .recentTags img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .tagDescription {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0,0,0,.7);
        padding: 8px 10px;

    }

    .title {
        color: #FFF;
        margin-bottom: 3px;
    }

    .description {
        color: #FFF;
        margin-bottom: 0;
    }
`;


export default function RecentArticleTags(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTags());
    }, []);

    const recentTags = useSelector(orderedLastTagesSelector);

    return <div>
        <Header title={'Artikelkategorien'}/>

        <Row type={'flex'} align={'middle'} justify={'space-between'}>
            {recentTags.map((tag) => <Col key={tag.id} sm={11} xs={24}>
                <div className={classNames(className, 'recentTags')}>
                    <img src={`${process.env.API_URL}${tag.image}`} alt={`tag-${tag.name}`} />
                    <div className={classNames(className, 'tagDescription')}>
                        <Title level={4} className={classNames(className, 'title')}>{tag.name}</Title>
                        <Paragraph ellipsis={{rows: 2}} className={classNames(className, 'description')}>
                            {tag.description}
                        </Paragraph>
                    </div>
                </div>
            </Col>)}
        </Row>
        {styles}
    </div>;
}
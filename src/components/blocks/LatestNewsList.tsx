import { ReactElement, useEffect } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { loadLatestNews } from "../../store/News";
import { latestNewsSelector } from "../../store/selectors/News";
import { Skeleton, Divider, Icon } from "antd";
import { COLORS } from "../../style/colors";


export default function LatestNewsList(): ReactElement {
    const dispatch = useDispatch();
    const news = useSelector(latestNewsSelector);

    useEffect(() => {
        dispatch(loadLatestNews());
    }, []);

    return <>
        <Header title={'Kurznachrichten'}  link={'Alle Kurznachrichten anzeigen'} />

        <div className={'divider'} />

        <div className={'news'}>
            {news.map((entry, index) => <div key={entry.id}>
                {entry.source.length > 0 && <a className={'newsTitle withIcon'} href={entry.source} target={'_blank'}>
                    <Icon type="link" style={{ fontSize: '20px' }}/>
                    <b>{entry.headline}</b>
                </a>}

                {entry.source.length === 0 && <div className={'newsTitle'}>
                    <b>{entry.headline}</b>
                </div>}

                {entry.description.length > 0 && <div className={'newsDescription'}>
                    {entry.description}
                </div>}

                {index !== news.length - 1 && <Divider />}
            </div>)}

            {news.length === 0 && <>
                <Skeleton title={false} active paragraph={{rows: 2, width: '100%'}} />
                <Divider />
                <Skeleton title={false} active paragraph={{rows: 1, width: '100%'}} />
                <Divider />
                <Skeleton title={false} active paragraph={{rows: 2, width: '100%'}} />
                <Divider />
                <Skeleton title={false} active paragraph={{rows: 1, width: '100%'}} />
                <Divider />
                <Skeleton title={false} active paragraph={{rows: 2, width: '100%'}} />
                <Divider />
            </>}
        </div>

        <style jsx>{`
            .divider {
                height: 1.75em;
            }

            .news {
                max-height: 450px;
                overflow-y: scroll;
            }

            .newsTitle {
                display: flex;
                align-items: center;
                font-size: 18px;
                margin-bottom: 6px;
            }

            .newsTitle b, .newsTitle i {
                color: ${COLORS.PRIMARY};
            }

            .newsDescription {
                font-size: 16px;
            }

            .newsTitle.withIcon b {
                margin-left: 10px;
            }
        `}</style>
    </>;
}
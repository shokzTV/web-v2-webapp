import { ReactElement, useEffect } from "react";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { loadLatestNews } from "../../store/News";
import { latestNewsSelector } from "../../store/selectors/News";
import { Skeleton, Divider } from "antd";
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
                {entry.source.length > 0 && <a className={'newsTitle withIcon'} href={entry.source} target={'_blank'} rel={'noreferrer'}>
                    <div style={{ fontSize: '20px' }}>
                        <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="link" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M574 665.4a8.03 8.03 0 00-11.3 0L446.5 781.6c-53.8 53.8-144.6 59.5-204 0-59.5-59.5-53.8-150.2 0-204l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3l-39.8-39.8a8.03 8.03 0 00-11.3 0L191.4 526.5c-84.6 84.6-84.6 221.5 0 306s221.5 84.6 306 0l116.2-116.2c3.1-3.1 3.1-8.2 0-11.3L574 665.4zm258.6-474c-84.6-84.6-221.5-84.6-306 0L410.3 307.6a8.03 8.03 0 000 11.3l39.7 39.7c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c53.8-53.8 144.6-59.5 204 0 59.5 59.5 53.8 150.2 0 204L665.3 562.6a8.03 8.03 0 000 11.3l39.8 39.8c3.1 3.1 8.2 3.1 11.3 0l116.2-116.2c84.5-84.6 84.5-221.5 0-306.1zM610.1 372.3a8.03 8.03 0 00-11.3 0L372.3 598.7a8.03 8.03 0 000 11.3l39.6 39.6c3.1 3.1 8.2 3.1 11.3 0l226.4-226.4c3.1-3.1 3.1-8.2 0-11.3l-39.5-39.6z"></path></svg>
                    </div>
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
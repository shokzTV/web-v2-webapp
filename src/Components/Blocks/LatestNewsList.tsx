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

        {news.map((entry) => <div key={entry.id}>

            {entry.source.length > 0 && <a className={'newsTitle'} href={entry.source} target={'_blank'}>
                <Icon type="link" style={{ fontSize: '20px' }}/>
                <b>{entry.headline}</b>
            </a>}

            {entry.source.length === 0 && <div className={'newsTitle'}>
                <b>{entry.headline}</b>
            </div>}

            {entry.description.length > 0 && <div>
                {entry.description}
            </div>}
        </div>)}

        {news.length === 0 && <>
            <Skeleton title={{width: '100%'}} active paragraph={{rows: 1, width: '100%'}} />
            <Divider />
            <Skeleton title={{width: '100%'}} active paragraph={{rows: 1, width: '100%'}} />
            <Divider />
        </>}

        <style jsx>{`
            .divider {
                height: 1.75em;
            }

            .newsTitle {
                color: ${COLORS.PRIMARY};
                display: flex;
                align-items: center;
            }

            .newsTitle b {
                margin-left: 10px;
            }
        `}</style>
    </>;
}
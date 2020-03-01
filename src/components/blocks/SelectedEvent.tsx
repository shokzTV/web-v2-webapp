import { ReactElement, useEffect, useMemo } from "react";
import { Row, Col } from "antd";
import {resolve} from 'styled-jsx/css';
import classNames from 'classnames';
import Title from "antd/lib/typography/Title";
import { COLORS } from "../../style/colors";
import { useDispatch, useSelector } from "react-redux";
import { loadMainEvent } from "../../store/Event";
import { mainEventSelector, organizerEventLogoSelector } from "../../store/selectors/Event";
import { getImageUrl } from "../../hooks/image";
import Link from "next/link";

//#region <styles>
const {className, styles} = resolve`
    .eventRow {
        margin-bottom: 20px;
        min-height: 200px;
        overflow: hidden;
        padding-top: 20px;
        background-image: url('/images/event.jpg');
        background-size: cover;
    }

    .eventRowInner {
        max-width: 1024px;
        margin: 0 auto;
        height: 100%;
        padding-bottom: 20px;
    }

    .eventTitle {
        text-align: center;
        margin: 0;
        margin-top: 0!important;
        margin-bottom: 20px;
        color: #000;
        font-weight: 700;
    }

    .eventLinks {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }

    .eventLink {
        text-transform: uppercase;
        color: ${COLORS.PRIMARY};
        font-size: 20px;
    }

    .eventLink + .eventLink {
        margin-left: 20px;
        padding-left: 20px;
        border-left: 1px solid ${COLORS.PRIMARY};
    }

    .nameContainer {
        display: flex;
        direction: column;
        align-items: center;
    }
`;
//#endregion

export default function SelectedEvent(): ReactElement {
    const dispatch = useDispatch();
    const mainEvent = useSelector(mainEventSelector);
    const organizerLogoSelector = useSelector(organizerEventLogoSelector);

    useEffect(() => {
        dispatch(loadMainEvent());
    }, []);

    const logoUrl = useMemo(() => {
        if(mainEvent) {
            return organizerLogoSelector(mainEvent.id);
        }
        return null;
    }, [mainEvent]);

    return <div className={classNames(className, 'eventRow')}>
        <Row type={"flex"} align={"middle"} className={classNames(className, 'eventRowInner')}>
            <Col xs={24} sm={6}>
                <Row type={"flex"} align={"middle"} justify={"center"} className={classNames(className, 'evnetLogo')}>
                    <img src={logoUrl ? getImageUrl(logoUrl) : ''} height={160}></img>
                </Row>
            </Col>
            <Col xs={24} sm={18} className={classNames(className, 'detailsCol')}>
                <Row type={'flex'} justify={'space-around'}>
                    <Col>
                        <div className={'nameContainer'}>
                            <Title level={2} type={'secondary'} className={classNames(className, 'eventTitle')}>{mainEvent ? mainEvent.name : ''}</Title>
                            <Row type={'flex'} align={'middle'} justify={'center'}>
                                <Link href={'/event/[eventId]'} as={`/event/${mainEvent ? mainEvent.id : ''}`}>
                                    <a className={classNames(className, 'eventLink')}>Eventüberblick</a>
                                </Link>
                                <a className={classNames(className, 'eventLink')}>Neuigkeiten zum Event</a>
                            </Row>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
        {styles}
    </div>;
}
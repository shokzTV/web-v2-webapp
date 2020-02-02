import { ReactElement } from "react";
import { Row, Col } from "antd";
import {resolve} from 'styled-jsx/css';
import classNames from 'classnames';
import Title from "antd/lib/typography/Title";
import { COLORS } from "../../style/colors";

//#region <styles>
const {className, styles} = resolve`
    .eventRow {
        margin-bottom: 20px;
        height: 200px;
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
    return <div className={classNames(className, 'eventRow')}>
        <Row type={"flex"} align={"middle"} className={classNames(className, 'eventRowInner')}>
            <Col xs={24} sm={6}>
                <Row type={"flex"} align={"middle"} justify={"center"} className={classNames(className, 'evnetLogo')}>
                    <img src="https://pro.eslgaming.com/deutschland/wp-content/uploads/2019/02/ESL-Meisterschaft-New.png" height={100}></img>
                </Row>
            </Col>
            <Col xs={24} sm={18} className={classNames(className, 'detailsCol')}>
                <Row type={'flex'} justify={'space-around'}>
                    <Col>
                        <div className={'nameContainer'}>
                            <Title level={2} type={'secondary'} className={classNames(className, 'eventTitle')}>ESL One Cologne</Title>

                            <Row type={'flex'} justify={'space-around'}>
                                <a className={classNames(className, 'eventLink')}>Eventüberblick</a>
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
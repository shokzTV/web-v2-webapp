import { ReactElement } from "react";
import { Row, Col } from "antd";
import {resolve} from 'styled-jsx/css';
import classNames from 'classnames';
import Title from "antd/lib/typography/Title";
import { COLORS } from "../../../style/colors";
import Paragraph from "antd/lib/typography/Paragraph";

const {className, styles} = resolve`
    .eventRow {
        padding: 20px 0;
    }

    .definitionHeader {
        margin: 0;
        font-weight: 400;
        color: ${COLORS.PRIMARY};
    }

    .eventTitle {
        margin: 0;
        margin-top: 0!important;
        margin-bottom: 20px;
        color: #000;
        font-weight: 700;
    }

    .detailsCol {
        padding-right: 20px;
    }

    .eventLinks {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        justify-content: center;
    }

    .eventLink {
        display: block;
        background-color: ${COLORS.PRIMARY};
        color: #FFF;
        border-right: 3px solid ${COLORS.SECONDARY};
        padding: 2px 15px 2px 6px;
        text-align: right;
        width: auto;
        text-transform: uppercase;
        position: relative;
        box-shadow: 2px 2px 0px 0px rgba(0,0,0,0.2);
        transition: 120ms box-shadow ease-in-out;
    }

    .eventLink:hover {
        box-shadow: 2px 2px 2px 1px rgba(0,0,0,0.3);
    }

    .eventLink:after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 7px solid ${COLORS.SECONDARY};
        clear: both;
        transition: 120ms border ease-in-out;
    }

    .eventLink + .eventLink {
        margin-top: 5px;
    }
`;

export default function SelectedEvent(): ReactElement {
    return <Row type={"flex"} align={"middle"} className={classNames(className, 'eventRow')}>
        <Col xs={24} sm={6}>
            <Row type={"flex"} align={"middle"} justify={"center"} className={classNames(className, 'evnetLogo')}>
                <img src="https://pro.eslgaming.com/deutschland/wp-content/uploads/2019/02/ESL-Meisterschaft-New.png" height={100}></img>
            </Row>
        </Col>
        <Col xs={24} sm={18} className={classNames(className, 'detailsCol')}>
            <Row type={'flex'} justify={'space-between'}>
                <Col>
                    <Title level={4} type={'secondary'} className={classNames(className, 'definitionHeader')}>Ausgewähltes Event</Title>
                    <Title level={2} type={'secondary'} className={classNames(className, 'eventTitle')}>ESL One Cologne</Title>
                </Col>
                <Col className={classNames(className, 'eventLinks')}>
                    <a className={classNames(className, 'eventLink')}>Eventüberblick</a>
                    <a className={classNames(className, 'eventLink')}>Neuigkeiten zum Event</a>
                </Col>
            </Row>
            <Row>
                <Paragraph ellipsis={{rows: 2}}>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </Paragraph>
            </Row>
        </Col>

        {styles}
    </Row>;
}
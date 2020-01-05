import { ReactElement } from "react";
import { Row, Col } from "antd";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import {resolve} from 'styled-jsx/css';
import classnames from 'classnames';
import Header from "../Header";
import Divider from "../Divider";

const {className, styles} = resolve`
    .lastNewsEntries {
        padding: 10px 20px;
    }
    .imageWrapper {
        position: relative;
        padding-bottom: 56.2%;
    }

    .imageWrapper img {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    .content {
        line-height: 200%;
    }
`;

export default function LastNewsEntries(): ReactElement {
    return <div className={classnames(className, 'lastNewsEntries')}>
        <Header title={'Neuigkeiten'} />
        <Row type={'flex'} align={'middle'}>
            <Col sm={11} xs={24}>
                <div className={classnames(className, 'imageWrapper')}>
                <img className={className} src={'https://scontent-dus1-1.cdninstagram.com/v/t51.2885-15/sh0.08/e35/p750x750/68726135_1018222015176085_351927752071998467_n.jpg?_nc_ht=scontent-dus1-1.cdninstagram.com&_nc_cat=101&_nc_ohc=BfpRxZK1xSgAX_QNoHd&oh=47031fb3582ed5d81d33ab01a827b56a&oe=5EACCB26'} />
                </div>
            </Col>
            <Col offset={1} sm={12} xs={24}>
                <Title level={3}>Der Skyr Turm droht umzukippen!</Title>

                <Paragraph ellipsis={{rows: 5}} className={classnames(className, 'content')}>
                    Doggo ipsum very taste wow borkf fat boi long doggo doing me a frighten noodle horse smol what a nice floof puggorino, you are doin me a concern such treat blep you are doing me the shock shooberino much ruin diet. Puggorino you are doing me the shock what a nice floof aqua doggo the neighborhood pupper shooberino, you are doing me the shock mlem pupperino bork. Long woofer pupperino mlem heckin angery woofer doge, waggy wags pats. Borkf vvv clouds heckin good boys and girls floofs, ruff length boy extremely cuuuuuute. snoot much ruin diet. Porgo blop doggorino doge the neighborhood pupper wrinkler, ruff aqua doggo ruff tungg lotsa pats, what a nice floof heckin good boys and girls aqua doggo shooberino. Heckin angery woofer smol pupper doggo, mlem.
                    Puggorino ur givin me a spook you are doin me a concern boofers ruff, stop it fren long water shoob. sub woofer yapper. Snoot very hand that feed shibe very taste wow very jealous pupper adorable doggo stop it fren, puggorino aqua doggo mlem such treat, stop it fren pupper yapper pats. Sub woofer shooberino woofer extremely cuuuuuute mlem, I am bekom fat pupperino. Such treat very jealous pupper length boy, smol. blep woofer doing me a frighten. Length boy long water shoob he made many woofs much ruin diet borkf doge, puggo doge waggy wags. Borking doggo wrinkler very jealous pupper puggorino heckin angery woofer borking doggo, long bois waggy wags much ruin diet stop it fren, sub woofer much ruin diet the neighborhood pupper heckin good boys. long woofer lotsa pats. Blop aqua doggo heckin good boys and girls big ol super chub long bois tungg, dat tungg tho big ol pupper fluffer heckin angery woofer.
                </Paragraph>
            </Col>
        </Row>

        <Divider />
        {styles}
    </div>;
}
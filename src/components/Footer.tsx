import { ReactElement } from "react";
import Title from "antd/lib/typography/Title";
import { Row, Col } from "antd";
import Link from "next/link";

export default function Footer(): ReactElement {
    return <div className={'pageFooter'}>
        <div className={'linkList'}>
            <br />
            <Title level={3}>Mehr von shokzTV</Title>
            <br />

            <Row type={'flex'} gutter={[25, 50]}>
                <Col sm={12} xs={24}>
                    <Row type={'flex'} gutter={[25, 10]}>
                        <Col sm={8} xs={12}>
                            <a href={'https://www.twitch.tv/shokztv'} target={'_blank'} rel={'noreferrer'}>Twitch</a>
                        </Col>
                        <Col sm={8} xs={12}>
                            <a href={'https://www.youtube.com/channel/UCbSSQP3v0syCn9_-e089HgA'} target={'_blank'} rel={'noreferrer'}>Youtube</a>
                        </Col>
                    </Row>
                    <br />
                    <Row type={'flex'} gutter={[25, 10]}>
                        <Col sm={8} xs={12}>
                            <a href={'https://twitter.com/shokztv/'} target={'_blank'} rel={'noreferrer'}>Twitter</a>
                        </Col>
                        <Col sm={8} xs={12}>
                            <a href={'http://www.discord.gg/hagYNWg'} target={'_blank'} rel={'noreferrer'}>Discord</a>
                        </Col>
                        <Col sm={8} xs={12}>
                            <a href={'https://www.instagram.com/shokztv/'} target={'_blank'} rel={'noreferrer'}>Instagram</a>
                        </Col>
                    </Row>
                </Col>
                <Col sm={12} xs={24}>
                    <div className={'aside'}>
                        <Row type={'flex'} gutter={[25, 10]}>
                            <Col sm={12} xs={24}>
                                <a href={'mailto:kontakt@shokz.tv'}>Kontakt</a>
                            </Col>
                        </Row>
                        <br />
                        <Row type={'flex'} gutter={[25, 10]}>
                            <Col sm={12} xs={12}>
                                <Link href={'/dataProtection'} as={'/dataProtection'}>
                                    <a>Datenschutzerklärung</a>
                                </Link>
                            </Col>
                            <Col sm={12} xs={12}>
                                <Link href={'/imprint'} as={'/imprint'}>
                                    <a>Impressum</a>
                                </Link>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <br />
        </div>

        <div className={'status'}>
            Diese Website steht in keiner offiziellen Verbindung mit Dota2 oder Valve Cooperation - Dota2 is a registered trademark of Valve Cooperation
        </div>

        <style jsx>{`
            .pageFooter {
                background-color: #424242;
            }

            .linkList {
                max-width: 1175px;
                margin: 0 auto;
                padding: 20px;
                color: #FFF;
                font-size: 18px;
            }

            .linkList :global(h3) {
                color: #FFF;
            }

            .linkList :global(a) {
                color: #FFF;
            }

            .status {
                background-color: #343434;
                text-align: center;
                color: rgba(255, 255, 255, .5);
                padding: 10px;
                font-style: italic;
            }    
        `}</style>
    </div>;
}
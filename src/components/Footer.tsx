import { ReactElement } from "react";
import Link from "next/link";

export default function Footer(): ReactElement {
    return <div className={'footerWrapper'}>
        <div className={'footerWrapperInner'}>
            <h2 className={'footerHeader'}>Mehr von shokzTV</h2>

            <div className={'footerLinks'}>
                <div className={'mainFooterLinks'}>
                    <div className={'footerRow x3'}>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'https://www.twitch.tv/shokztv'} target={'_blank'} rel={'noreferrer'}>Twitch</a>
                        </div>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'https://www.youtube.com/channel/UCbSSQP3v0syCn9_-e089HgA'} target={'_blank'} rel={'noreferrer'}>Youtube</a>
                        </div>
                    </div>
                    <div className={'footerRow x3'}>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'https://twitter.com/shokztv/'} target={'_blank'} rel={'noreferrer'}>Twitter</a>
                        </div>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'http://www.discord.gg/hagYNWg'} target={'_blank'} rel={'noreferrer'}>Discord</a>
                        </div>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'https://www.instagram.com/shokztv/'} target={'_blank'} rel={'noreferrer'}>Instagram</a>
                        </div>
                    </div>
                </div>
                <div className={'subFooterLinks'}>
                    <div className={'footerRow x2'}>
                        <div className={'footerColumn'}>
                            <a className={'link'} href={'mailto:kontakt@shokz.tv'}>Kontakt</a>
                        </div>
                    </div>
                    
                    <div className={'footerRow x2'}>
                        <div className={'footerColumn'}>
                            <Link href={'/dataProtection'} as={'/dataProtection'}>
                                <a className={'link'}>Datenschutzerklärung</a>
                            </Link>
                        </div>
                        <div className={'footerColumn'}>
                            <Link href={'/imprint'} as={'/imprint'}>
                                <a className={'link'}>Impressum</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className={'footerDisclaimer'}>
            Diese Website steht in keiner offiziellen Verbindung mit Dota2 oder Valve Cooperation - Dota2 is a registered trademark of Valve Cooperation
        </div>

        <style jsx>{`
            .footerWrapper {
                background-color: #424242;
            }

            .footerWrapperInner {
                max-width: 1175px;
                margin: 0 auto;
                padding: 40px 20px;
                color: #FFF;
                font-size: 18px;
            }

            .footerHeader {
                font-size: 24px;
                margin-bottom: 20px;
                color: #FFF;
            }

            .footerDisclaimer {
                background-color: #343434;
                text-align: center;
                color: rgba(255,255,255,.5);
                padding: 10px;
                font-style: italic;
            }

            .footerLinks {
                padding: 20px 0 10px 0;
            }

            .footerRow, .footerLinks {
                display: flex;
                align-items: center;
                margin: -20px;
            }

            .mainFooterLinks {
                padding: 20px;
                width: 66%;
            }

            .subFooterLinks {
                padding: 20px;
                width: 33%;
            }

            .x2 .footerColumn {
                padding: 20px;
                width: 50%;
            }

            .x3 .footerColumn {
                padding: 20px;
                width: 33%;
            }

            .link {
                color: #FFF;
                text-decoration: none;
            }
        `}</style>
    </div>;
}
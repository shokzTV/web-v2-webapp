import React, { ReactElement, ReactNode } from 'react';
import { pageWrapper } from "../style/page";
import Head from "next/head";
import { motion } from 'framer-motion';
import Title from 'antd/lib/typography/Title';
import { Row, Col } from 'antd';
import { COLORS } from '../style/colors';
import Link from 'next/link';

interface Props {
    children: ReactNode;
    title?: string;
}

export default function PageFrame({children, title = null}: Props): ReactElement {
  return <>
    <Head>
      <title>shokz.tv {title && ` - ${title}`}</title>
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,400i,700&display=swap" rel="stylesheet" />
      <meta name="description" content="shokzTV: Die deutsche Dota2 Startseite für aktuelle Nachrichten, Themen, Events, Updates, Pro Teams, Twitchstreamer und Castings" />
    </Head>

    <div className={'page'}>
      <div className={'pageWrapper'}>
        <motion.div initial="initial" animate="enter" exit="exit">
          <div>
            {children}
          </div>
        </motion.div>
      </div>

      <div className={'pageFooter'}>
        <div className={'linkList'}>
          <Title level={4}>Mehr von shokzTV</Title>

          <Row type={'flex'} gutter={[25, 10]}>
            <Col sm={6} xs={24}>
              <a href={'https://www.instagram.com/shokztv/'} target={'_blank'}>Instagram</a>
            </Col>
            <Col sm={6} xs={24}>
              <a href={'https://www.twitch.tv/shokztv'} target={'_blank'}>Twitch</a>
            </Col>
            <Col sm={6} xs={24}>
              <a href={'mailto:kontakt@shokz.tv'}>Kontakt</a>
            </Col>
            <Col sm={6} xs={24}>
              <Link href={'/dataProtection'} as={'/dataProtection'}>
                <a>Datenschutzerklärung</a>
              </Link>
            </Col>
            <Col sm={6} xs={24}>
              <a href={'https://twitter.com/shokztv/'} target={'_blank'}>Twitter</a>
            </Col>
            <Col sm={6} xs={24}>
              <a href={'http://www.discord.gg/hagYNWg'} target={'_blank'}>Discord</a>
            </Col>
            <Col sm={6} xs={24}>
              <Link href={'/imprint'} as={'/imprint'}>
                <a>Impressum</a>
              </Link>
            </Col>
          </Row>
        </div>

        <div className={'status'}>
          Diese Website steht in keiner offiziellen Verbindung mit Dota2 oder Valve Cooperation - Dota2 is a registered trademark of Valve Cooperation
        </div>
      </div>
    </div>

    <style jsx>{pageWrapper}</style>

    <style jsx global>{`
      a {
        color: ${COLORS.PRIMARY}!important;
      }

      .pageFooter a, .ant-menu a {
        color: #FFF!important;
      } 

      * {
        font-family: 'Roboto Condensed';
        color: ${COLORS.WEAK};
      }
    `}</style>
  </>;
}
import React, { ReactElement, ReactNode } from 'react';
import { pageWrapper } from "../style/page";
import Head from "next/head";
import { motion } from 'framer-motion';

interface Props {
    children: ReactNode;
    title?: string;
    showSelectedEvent?: boolean;
}

export default function PageFrame({children, title = null, showSelectedEvent = false}: Props): ReactElement {
  return <>
    <Head>
      <title>shokz.tv {title && ` - ${title}`}</title>
      <meta name="google" content="notranslate" />
      <meta httpEquiv="Content-Language" content="de" />
    </Head>

      <div className={'pageWrapper'}>
        <motion.div initial="initial" animate="enter" exit="exit">
          <div>
            {children}
          </div>
        </motion.div>
      </div>

    <style jsx>{pageWrapper}</style>
  </>;
}
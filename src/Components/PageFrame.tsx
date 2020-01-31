import React, { ReactElement, ReactNode } from 'react';
import Navigation from './Navigation';
import { pageWrapper } from "./../style/page";
import SelectedEvent from "./blocks/SelectedEvent";
import Head from "next/head";

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

    <Navigation />
    
    {showSelectedEvent && <SelectedEvent />}

    <div className={'pageWrapper'}>
        {children}
    </div>

    <style jsx>{pageWrapper}</style>
  </>;
}
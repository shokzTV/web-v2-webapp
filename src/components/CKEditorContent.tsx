import React, { ReactElement, useMemo } from "react";
import HtmlToReact  from 'html-to-react';
import YouTube from 'react-youtube-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';
import Truncate from 'react-truncate-html';
import ReactDOMServer from 'react-dom/server';
import { COLORS } from "../style/colors";

var processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);

var processingInstructions = [
    {
        shouldProcessNode: (node) => {
            return node.name && node.name === 'oembed';
        },
        processNode: (node) =>  {
            if(node.attribs && node.attribs.url.indexOf('youtube') !== -1) {
                return <YouTube id={node.attribs.url} />;
            }
            if(node.attribs && node.attribs.url.indexOf('twitter') !== -1) {
                const [, tweetId] = node.attribs.url.match(/^https:\/\/twitter\.com\/.*\/status\/(.*)$/);
                return <TwitterTweetEmbed tweetId={tweetId} />;
            }
            console.error('Missing embedded support for ' + node.attribs.url)
        },
    },
    {
        shouldProcessNode: () => {
            return true;
        },
        processNode: processNodeDefinitions.processDefaultNode,
    },
];
  
export default function CKEditorContent({text = '<p></p>', rows = 0}: {text: string; rows?: number}): ReactElement {
    const html = (new HtmlToReact.Parser()).parseWithInstructions(text, () => true, processingInstructions);

    return <div className={'content'}>
        {rows > 0 && <Truncate lines={rows}
                               dangerouslySetInnerHTML={{__html: html.length > 0 && html.map(ReactDOMServer.renderToStaticMarkup).join("")}}/>}
        {rows === 0 && <>{html}</>}
        <style jsx>{`
            .content {
                font-size: 18px;
                line-height: 200%;
            }    

            .content :global(img) {
                max-width: 100%;
            }

            .content :global(p) {
                margin-bottom: 0;
            }

            .content :global(ul) {
                padding-left: 20px;
            }

            .content :global(h2) {
                margin-top: 30px;
                margin-bottom: 15px;
            }

            .content :global(h3) {
                margin-top: 20px;
                margin-bottom: 5px;
            }

            .content :global(h4) {
                margin-top: 15px;
            }

            .content :global(a), .content :global(a *) {
                color: ${COLORS.PRIMARY};
                text-decoration: none;
            }
        `}</style>
    </div>;
}
import React, { ReactElement } from "react";
import HtmlToReact  from 'html-to-react';
import YouTube from 'react-youtube-embed';
import { TwitterTweetEmbed } from 'react-twitter-embed';

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
  
export default function CKEditorContent({text}: {text: string}): ReactElement {
    return <div className={'content'}>
        {(new HtmlToReact.Parser()).parseWithInstructions(text, () => true, processingInstructions)}

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
        `}</style>
    </div>;
}
import { ReactElement, useState, useCallback, useRef } from "react";
import { resolve } from "styled-jsx/css";
import classNames from "classnames";
import { Skeleton } from "antd";
import { motion } from 'framer-motion';
import { getImageUrl } from '../../hooks/image';
import VisibilitySensor from "react-visibility-sensor";

//#region <styles>
const {className, styles} = resolve`
    .imageSkeleton {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        border-radius: 8px;
    }
    .imageSkeleton :global(.ant-skeleton-content) {
        height: 100%;
        display: block;
    }

    .imageSkeleton :global(.ant-skeleton-paragraph) {
        height: 100%;
        margin: 0;
    }
    .imageSkeleton :global(li) {
        height: 100%;
    }

    .imageTitle :global(li) {
        height: 18px;
    }

    .imageLoader {
        display: none;
    }

    .image {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: 8px;
    }

    .contains {
        object-fit: contain;
    }
`;
//#endregion

let easing = [0.175, 0.85, 0.42, 0.96];
const imageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.5, ease: easing } },
    enter: { scale: 1, opacity: 1, transition: { duration: 0.5, ease: easing } },
  };

export default function LoadingImage({src, contains}: {src?: string; contains?: boolean}): ReactElement {
    const [loaded, setLoaded] = useState(false);

    return <VisibilitySensor  scrollCheck partialVisibility={true}>
        {({ isVisible }) => <div className={classNames(className, 'imageSkeleton')}>
            {loaded && <motion.img className={classNames(className, 'image', {contains})} variants={imageVariants} src={getImageUrl(src)} alt={src} />}
            {!loaded && <Skeleton className={classNames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />}  

            <div className={classNames(className, 'imageLoader')}>
                {src && isVisible && <img src={getImageUrl(src)} onLoad={() => setLoaded(true)}/>}
            </div>
            {styles}
        </div>}
    </VisibilitySensor>;
}
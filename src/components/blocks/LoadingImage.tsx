import { ReactElement, useState, useCallback, useRef } from "react";
import { resolve } from "styled-jsx/css";
import classNames from "classnames";
import { Skeleton } from "antd";
import { getImageUrl } from '../../hooks/image';
import VisibilitySensor from "react-visibility-sensor";

//#region <styles>
const {className, styles} = resolve`
    .imageSkeleton, .imgWrapper {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        display: block;
        border-radius: 8px;
    }

    .imgWrapper {
        z-index: 2;
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

export default function LoadingImage({src, webp, jp2, contains}: {src?: string; webp?: string; jp2?: string; contains?: boolean}): ReactElement { 
    const [loaded, setLoaded] = useState(false);

    return <VisibilitySensor  scrollCheck partialVisibility={true}>
        {({ isVisible }) => <>
            <div className={classNames(className, 'imgWrapper')}>
                {(isVisible || loaded) && <picture>
                    <source type="image/webp" srcSet={getImageUrl(webp)}/>
                    <source type="image/jp2" srcSet={getImageUrl(jp2)}/>
                    <img className={classNames(className, 'image', {contains})} src={getImageUrl(src)} alt={src} onLoad={() => setLoaded(true)}/>
                </picture>}
            </div>
            {!loaded && <Skeleton className={classNames(className, 'imageSkeleton')} active={true} title={false} paragraph={{ rows: 1, width: '100%' }} />}  

            {styles}
        </>}
    </VisibilitySensor>;
}
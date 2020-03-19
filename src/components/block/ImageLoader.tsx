import { ReactElement, useState } from "react";
import classNames from "classnames";
import VisibilitySensor from "react-visibility-sensor";
import { getImageUrl } from "../../config/image";
import Loader from "./Loader";

export function toAlt(name: string): string {
    return name.toLowerCase().split('-').join('_').split(' ').join('_');
}

interface Props {
    src?: string;
    webp?: string;
    jp2?: string;
    contains?: boolean;
    hideLoader?: boolean;
    altTag?: string;
}

export default function LoadingImage({src, webp, jp2, contains, hideLoader = false, altTag}: Props): ReactElement { 
    const [loaded, setLoaded] = useState(false);

    return <VisibilitySensor  scrollCheck partialVisibility={true}>
        {({ isVisible }) => <>
            {src && <div className={'imgWrapper'}>
                {(isVisible || loaded) && <picture>
                    <source type="image/webp" srcSet={getImageUrl(webp)}/>
                    <source type="image/jp2" srcSet={getImageUrl(jp2)}/>
                    <img className={classNames('image', {contains})} src={getImageUrl(src)} alt={altTag || src} onLoad={() => setLoaded(true)}/>
                </picture>}
            </div>}
            {(!hideLoader || !loaded) &&  <div className={'imageSkeleton'}><Loader /></div>}

            <style jsx>{`
                .imageSkeleton, .imgWrapper {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    display: block;
                    border-radius: 8px;
                    overflow: hidden;
                }

                .imgWrapper {
                    z-index: 2;
                }

                .image {
                    position: absolute;
                    object-fit: cover;
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    transform: scale(.8);
                    opacity: 0;
                    animation: zoomIn 500ms ease-in-out forwards; 
                    transition: transform 500ms ease-in-out, opacity 500ms ease-in-out;
                }

                @keyframes zoomIn{
                    to{
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                .contains {
                    object-fit: contain;
                }    
            `}</style>
        </>}
    </VisibilitySensor>;
}

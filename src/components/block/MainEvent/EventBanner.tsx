import { Event } from '../../../api/@types/Event';
import { ReactElement } from 'react';
import { getImageUrl } from '../../../config/image';
import css from 'styled-jsx/css';

const banner = css`
    .eventBanner {
        position: absolute;
        object-fit: cover;
        width: 100%;
        height: 100%;
        z-index: -1;
    }
`;

export default function EventBanner({event}: {event: Event | null}): ReactElement {
    if(event && event.banner) {
        return <picture>
            <source type="image/webp" srcSet={getImageUrl(event.bannerWEBP)}/>
            <source type="image/jp2" srcSet={getImageUrl(event.bannerJP2)}/>
            <img className={'eventBanner'} height={160} src={getImageUrl(event.banner)} alt={'main_event_banner'}/>

            <style jsx>{banner}</style>
        </picture>;
    }

    return <picture>
        <source type="image/webp" srcSet={'/images/event.webp'}/>
        <source type="image/jp2" srcSet={'/images/event.jp2'}/>
        <img className={'eventBanner'} height={160} src={'/images/event.jpeg'} alt={'main_event_banner'}/>

        <style jsx>{banner}</style>
    </picture>;
}
import { Event } from '../../../api/@types/Event';
import { ReactElement } from 'react';
import { getImageUrl } from '../../../config/image';
import css from 'styled-jsx/css';

const imageStyle = css`
    .image {
        width: 160px;
        margin: 0 auto;
        width: 100%;
    }
`;

export default function OrganizerLogo({event}: {event: Event | null}): ReactElement {
    if(event) {
        if(event.organizerLogo) {
            return <picture className={'image'}>
                <source type="image/webp" srcSet={getImageUrl(event.organizerLogoWEBP)}/>
                <source type="image/jp2" srcSet={getImageUrl(event.organizerLogoJP2)}/>
                <img height={160} src={getImageUrl(event.organizerLogo)} alt={'main_event_organizer_logo'}/>
                <style jsx>{imageStyle}</style>
            </picture>;
        }

        return <picture className={'image'}>
            <source type="image/webp" srcSet={getImageUrl(event.organizer.logo_webp)}/>
            <source type="image/jp2" srcSet={getImageUrl(event.organizer.logo_jpeg_2000)}/>
            <img height={160} src={getImageUrl(event.organizer.logo)} alt={'main_event_organizer_logo'}/>
            <style jsx>{imageStyle}</style>
        </picture>;
    }

    return <div>
        <div className={'image'} />
        <style jsx>{imageStyle}</style>
        <style jsx>{`
            .image {
                width: 75px;
                background-color: #CCC;
            }
        `}</style>
    </div>;
}
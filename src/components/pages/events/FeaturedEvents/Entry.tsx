import { ReactElement } from "react";
import { Event } from "../../../../api/@types/Event";
import LoadingImage from "../../../block/ImageLoader";
import classNames from "classnames";
import { useEventDate } from "../../../../hooks/eventDate";
import dayjs from "dayjs";
import Link from "next/link";

export default function Entry({event}: {event: Partial<Event>}): ReactElement {
    const tag = event.tags && event.tags[0];
    const eventDate = useEventDate();
    const currentTs = dayjs().unix();

    return <>
        <Link href={'/event/[slug]'} as={'/event/' + (event && event.slug)}>
            <div className={'eventEntry'}>
                <LoadingImage src={tag && tag.image} webp={tag && tag.imageWEBP} jp2={tag && tag.imageJP2} />

                <div className={'eventDescription'}>
                    <h3>{event.name || <>&nbsp;</>}</h3>
                    <div className={classNames('info', {finished: event && event.end < currentTs})}>
                        {event.start > currentTs ? 'Demnächst' : (event && event.end < currentTs ? 'Abgeschlossen' : <span className={'active'}>Jetzt</span>)}:
                        &nbsp;
                        {eventDate(event.id !== 0 ? event as Event : null)}
                    </div>
                </div>
            </div>
        </Link>

        <style jsx>{`
            .eventEntry {
                position: relative;
                padding-bottom: 56.2%;
                cursor: pointer;
                max-width: 512px;
            }

            .eventDescription {
                position: absolute;
                width: 100%;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.7);
                z-index: 3;
                padding: 12px 15px;
                border-radius: 0 0 4px 4px;
            }

            h3 {
                color: #FFF;
                font-size: 24px;
                text-transform: uppercase;
                margin-bottom: 5px;
            }

            .desc {
                color: #FFF;
                font-size: 18px;
            }

            .info {
                color: #FFF;
                font-size: 18px;
            }

            .info.finished {
                color: rgba(255, 255, 255, .7);
            }

            .active {
                color: #e3211c;
                text-transform: uppercase;
            }

        `}</style>
    </>
}
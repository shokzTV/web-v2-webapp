import { ReactElement } from "react";
import Link from "next/link";
import { Event } from "../../../../api/@types/Event";
import LoadingImage from "../../../block/ImageLoader";
import { useEventDate } from "../../../../hooks/eventDate";
import TextLoader from "../../../TextLoader";


export default function Entry({event}: {event: Event | null}): ReactElement {
    const tag = event && event.tags[0];
    const eventDate = useEventDate(true)(event);
    return <>
        <Link href={'/event/[eventId]'} as={'/event/' + (event && event.id)}>
            <div className={'event'}>
                <div className={'coverColumn'}>
                    <div className={'coverImage'}>
                        <LoadingImage src={tag && tag.image} webp={tag && tag.imageWEBP} jp2={tag && tag.imageJP2} />
                    </div>
                </div>
                <div className={'detailsColumn'}>
                    <h3>{event ? event.name : <TextLoader rows={1} type={'h3'} />}</h3>
                    <div>{eventDate ? eventDate : <TextLoader rows={1} />}</div>
                </div>
            </div>
        </Link>

        <style jsx>{`
            .event {
                display: flex;
                margin: -15px;
                align-items: center;
                cursor: pointer;
            } 

            .coverColumn {
                width: 50%;
                padding: 15px;
            }

            .detailsColumn {
                width: 50%;
                padding: 15px;
            }

            .coverImage {
                position: relative;
                padding-bottom: 56.2%;
            }

            h3 {
                font-size: 24px;
                margin-bottom: 10px;
            }
            
            @media only screen and (max-width: 425px) { 
                .event {
                    margin: 0;
                    flex-direction: column;
                    align-items: center;
                }
                .coverColumn, .detailsColumn {
                    padding: 5px;
                    width: 100%;
                }  
                .detailsColumn {
                    text-align: center;
                }
            }
        `}</style>
    </>;
}
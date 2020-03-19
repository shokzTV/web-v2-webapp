import { ReactElement } from "react";
import dayjs from "dayjs";
import { Event } from "../../../../api/@types/Event";
import Link from "next/link";
import { COLORS } from "../../../../style/colors";
import classNames from "classnames";
import LoadingImage, { toAlt } from "../../../block/ImageLoader";
import { useEventDate } from "../../../../hooks/eventDate";
import ReactCountryFlag from "react-country-flag";
import Divider from "../../../Divider";
import TextLoader from "../../../TextLoader";

export default function Row({event, noDivider = false}: {event: Event | null; noDivider?: boolean}): ReactElement {
    if(event) {
        const startDate = dayjs.unix(event && event.start);
        const endDate = dayjs.unix(event && event.end);
        const isRunning = dayjs().isBefore(endDate) && dayjs().isAfter(startDate);
        const isPast = dayjs().isAfter(endDate);
        const eventDate = useEventDate(true)(event);    
    
        return <>
            <Link href={'/event/[slug]'} as={'/event/' + (event && event.slug)}>
                <a className={'link'}>
                    <div className={classNames('eventRow', {isRunning, isPast})}>
                        <div className={'eventRowData'}>
                            <div className={'icon'}>
                                <LoadingImage contains 
                                              hideLoader
                                              src={event.organizer.icon} 
                                              webp={event.organizer.icon_webp} 
                                              jp2={event.organizer.icon_jpeg_2000}
                                              altTag={toAlt(event.organizer.name + ' icon')} />
                            </div>

                            <div className={'eventName'}>
                                {(isRunning || !isPast) ? <b>{event.name}</b> : <>{event.name}</>}
                                <div className={'eventDate'}>{eventDate}</div>
                            </div>
                        </div>

                        <div className={'location'}>
                            <>
                                <div>{event.location}</div>
                                <div className={'flag'}>
                                    {event.country !== 'xx' ? <ReactCountryFlag svg countryCode={event.country} alt={event.country + '-flag'} /> : <div className={'emptyFlag'} />}
                                </div>
                            </>
                        </div>
                    </div>
                </a>
            </Link>

           {!noDivider && <Divider />}

            <style jsx>{`   
                .eventRow {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .eventRowData {
                    flex-grow: 1;
                }

                .eventRowData, .location {
                    display: flex;
                    align-items: center;
                }
                
                .icon {
                    margin-right: 20px;
                    height: 40px;
                    position: relative;
                    min-width: 40px;
                }

                .flag {
                    margin-left: 8px;
                }

                .isRunning .eventName b {
                    color: ${COLORS.PRIMARY};
                }

                .isPast * {
                    color: ${COLORS.WEAK};
                }

                .eventName {
                    font-size: 18px;
                }

                .eventDate, .location {
                    font-size: 16px;
                }

                .emptyFlag {
                    width: 14px;
                    height: 12px;
                    background-color: #CCC;
                    display: inline-block;
                    vertical-align: -.1em;
                }
                
                .link {
                    text-decoration: none;
                }
            `}</style>
        </>;
    }

    return <>
        <div className={'row'}>
            <div className={'icon'}>
                <LoadingImage contains />
            </div>


            <div className={'rows'}>
                <div style={{fontSize: 18}}><TextLoader rows={1} /></div>
                <div style={{fontSize: 16}}><TextLoader rows={1} /></div>
            </div>
        </div>
    
        <style jsx>{`
            .row {
                display: flex;
                height: 40px;
            }

            .rows {
                flex-grow: 1;
            }
                
            .icon {
                margin-right: 20px;
                height: 40px;
                position: relative;
                min-width: 40px;
            }
        `}</style>
        {!noDivider && <Divider />}
    </>;
}
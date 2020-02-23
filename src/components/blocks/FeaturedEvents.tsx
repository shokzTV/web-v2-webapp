import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedEvents } from '../../store/Event'; 
import Header from "../Header";
import { organizerEntitiesSelector } from "../../store/selectors/Organizer";
import { getImageUrl } from "../../hooks/image";
import { Event } from "../../store/entities/Event";
import { featuredEventsSelector, eventEntitiesSelector } from "../../store/selectors/Event";
import { Divider, Skeleton } from "antd";
import dayjs from "dayjs";
import classNames from "classnames";
import { COLORS } from "../../style/colors";
import ReactCountryFlag from "react-country-flag";
import LoadingImage from "./LoadingImage";


function EventRow({event}: {event?: Event}): ReactElement {
    const organizerEntities = useSelector(organizerEntitiesSelector);
    const startDate = dayjs.unix(event && event.start);
    const endDate = dayjs.unix(event && event.end);
    const isRunning = dayjs().isBefore(endDate) && dayjs().isAfter(startDate);
    const isPast = dayjs().isAfter(endDate);
    const date = startDate.isSame(endDate, 'day') 
        ? startDate.format('D MMMM') 
        : startDate.format('D') + '-' + endDate.format('D MMMM');

    return <div className={classNames('eventRow', {isRunning, isPast})}>
        <div className={'eventRowData'}>
            <div className={'icon'}>
                <LoadingImage contains src={event && organizerEntities[event.organizer]!.logo_small} />
            </div>

            {event && <div>
                {isRunning ? <b>{event.name}</b> : <>{event.name}</>}
                <div>{date}</div>
            </div>}

            {!event && <Skeleton title={false} paragraph={{rows: 2, width: '100%'}} />}
        </div>

        <div className={'location'}>
            {event && <>
                <div>{event.location}</div>
                <div className={'flag'}>
                    <ReactCountryFlag svg countryCode={event.country} />
                </div>
            </>}
            {!event && <Skeleton title={false} paragraph={{rows: 1, width: '100%'}} />}
        </div>
    
        <style jsx>{`
            .eventRow {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .eventRowData {
                flex-grow: 1;
            }

            .eventRowData :global(ul) {
                margin-bottom: 0;
            }


            .eventRowData :global(li + li) {
                margin-top: 10px;
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

            .isRunning {
                color: ${COLORS.PRIMARY}
            }

            .isPast {
                color: #BBB;
            }
        `}</style>
    </div>;
}

export default function FeaturedEvents(): ReactElement {
    const dispatch = useDispatch();
    const eventIds = useSelector(featuredEventsSelector);
    const eventEntities = useSelector(eventEntitiesSelector);
    const events = eventIds.length > 0 ? eventIds : [...Array(4).keys()];

    useEffect(() => {
        dispatch(loadFeaturedEvents());
    }, []);

    return <>
        <Header title={'Eventkalender'}  link={'Alle events anzeigen'} />

        <div className={'divider'} />

        {events.map((eventId, index) => {
            const event = eventEntities[eventId];
            return <React.Fragment key={eventId}>
                <EventRow event={event} />
                {index !== eventIds.length - 1 && <Divider />}
            </React.Fragment>
        })}

        <style jsx>{`
            .divider {
                height: 1.75em;
            }
        `}</style>
    </>;
}
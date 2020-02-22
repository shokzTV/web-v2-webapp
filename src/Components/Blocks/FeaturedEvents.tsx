import React, { ReactElement, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadFeaturedEvents } from '../../store/Event'; 
import Header from "../Header";
import { organizerEntitiesSelector } from "../../store/selectors/Organizer";
import { getImageUrl } from "../../hooks/image";
import { Event } from "../../store/entities/Event";
import { featuredEventsSelector } from "../../store/selectors/Event";
import { Divider, Skeleton } from "antd";
import dayjs from "dayjs";
import classNames from "classnames";
import { COLORS } from "../../style/colors";
import ReactCountryFlag from "react-country-flag";


function EventRow({event}: {event: Event}): ReactElement {
    const organizerEntities = useSelector(organizerEntitiesSelector);
    const startDate = dayjs.unix(event.start);
    const endDate = dayjs.unix(event.end);
    const isRunning = dayjs().isBefore(endDate) && dayjs().isAfter(startDate);
    const isPast = dayjs().isAfter(endDate);
    const date = startDate.isSame(endDate, 'day') 
        ? startDate.format('D MMMM') 
        : startDate.format('D') + '-' + endDate.format('D MMMM');

    return <div className={classNames('eventRow', {isRunning, isPast})}>
        <div className={'eventRowData'}>
            <img width={30} src={getImageUrl(organizerEntities[event.organizer]!.logo_small)} />

            <div>
                {isRunning ? <b>{event.name}</b> : <>{event.name}</>}
                <div>{date}</div>
            </div>
        </div>

        <div className={'location'}>
            <div>{event.location}</div>
            <div className={'flag'}>
                <ReactCountryFlag svg countryCode={event.country} />
            </div>
        </div>
    
        <style jsx>{`
            .eventRow {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .eventRowData, .location {
                display: flex;
                align-items: center;
            }
            
            .eventRowData img {
                margin-right: 20px;
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

function EmptyEventRow(): ReactElement {
    return <div className={classNames('eventRow')}>
        <div className={'eventRowData'}>
            <Skeleton active={true} title={false} avatar={true} paragraph={{rows: 2, width: '100%'}} />
        </div>

        <div className={'location'}>
            <Skeleton active={true} title={false} paragraph={{rows: 1, width: '100%'}} />
        </div>
    
        <style jsx>{`
            .eventRow {
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
            }
            .eventRowData {
                display: inline-flex;
                align-items: center;
                justify-content: flex-start;
                flex-grow: 1;
            }
            .location {
                width: 100px;
                margin-left: 10px;
            }
        `}</style>
    </div>;
}

export default function FeaturedEvents(): ReactElement {
    const dispatch = useDispatch();
    const events = useSelector(featuredEventsSelector);

    useEffect(() => {
        dispatch(loadFeaturedEvents());
    }, []);

    return <>
        <Header title={'Eventkalender'}  link={'Alle events anzeigen'} />

        <div className={'divider'} />

        {events.map((event, index) => <React.Fragment key={event.id}>
            <EventRow event={event} />
            {index !== events.length - 1 && <Divider />}
        </React.Fragment>)}

        {events.length === 0 && <>
            <EmptyEventRow />
            <Divider />
            <EmptyEventRow />
            <Divider />
        </>}

        <style jsx>{`
            .divider {
                height: 1.75em;
            }
        `}</style>
    </>;
}
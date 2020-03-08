import { Event } from "../../../../api/@types/Event";
import { ReactElement } from "react";
import { useEventDate } from "../../../../hooks/eventDate";
import ReactCountryFlag from "react-country-flag";
import { COLORS } from "../../../../style/colors";

export default function EventDetails({event}: {event: Event | null}): ReactElement {
    const eventDate = useEventDate()(event);

    return <>
        <h4>Eventinformationen</h4>
        <div className={'row'}>
            <div className={'label'}>Datum:</div>
            <div>{eventDate}</div>
        </div>
        <div className={'row'}>
            <div className={'label'}>Veranstalter:</div>
            <div>{event && event.organizer.name}</div>
        </div>

        <div className={'row'}>
            <div className={'label'}>Ort:</div>
            <div className={'location'}>
                {event && event.country !== 'xx' ? <ReactCountryFlag svg countryCode={event.country} alt={event.country + '-flag'} /> : <div className={'emptyFlag'} />}
                &nbsp;
                <div>{event && event.location}</div>
            </div>
        </div>

        {event && event.pricePool.length > 0 && <div className={'row'}>
            <div className={'label'}>Preisgeld:</div>
            <div>{event && event.pricePool}</div>
        </div>}

        <style jsx>{`
            h4 {
                font-size: 20px;
                color: ${COLORS.PRIMARY});
                margin-bottom: 15px;
            }

            .row, .location {
                display: flex;
                align-items: center;
                font-size: 20px;
            }    

            .row {
                margin-top: 8px;
            }

            .label {
                width: 120px;
            }
            
            .emptyFlag {
                width: 14px;
                height: 12px;
                background-color: #CCC;
                display: inline-block;
                vertical-align: -.1em;
            }

        `}</style>
    </>;
}
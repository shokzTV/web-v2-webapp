import { ReactElement } from "react";
import { Event } from "../../../../api/@types/Event";
import { COLORS } from "../../../../style/colors";

export default function EventLinks({event}: {event: Event}): ReactElement {
    const links = event && event.links || [];
    return <>
        <h4>Eventlinks</h4>

        <ul className={'listWrapper'}>
            {links.map(({id, name, link}) => <li key={id}><a className={'link'} target={'_blank'} href={link} rel={'noreferrer'}>{name}</a></li>)}
        </ul>

        <style jsx>{`
            h4 {
                font-size: 20px;
                color: ${COLORS.PRIMARY});
                margin-bottom: 15px;
            }

            .listWrapper {
                font-size: 20px;
            }

            .link {
                text-decoration: none;
            }
        `}</style>
    </>;
}
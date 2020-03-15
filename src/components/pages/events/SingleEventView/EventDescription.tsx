import { ReactElement } from "react";
import { Event } from "../../../../api/@types/Event";
import Divider from "../../../Divider";
import Header from "../../../Header";
import CKEditorContent from "../../../CKEditorContent";

const descriptionName = {
    description: 'Beschreibung',
    information: 'Information',
    advice: 'Hinweis'
}

export default function EventDescription({event, noDivider = false}: {event: Event | null; noDivider?: boolean}):ReactElement {
    return <>
        {event && event.description.length > 0 && <>
            {!noDivider && <Divider />}

            <Header title={event && descriptionName[event.descriptionType]} reduceSpacing/>
            <div className={'description'}>
                <CKEditorContent text={event && event.description} />
            </div>
        </>}
    </>;
}
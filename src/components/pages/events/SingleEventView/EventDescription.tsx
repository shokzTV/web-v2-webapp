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

export default function EventDescription({event}: {event: Event | null}):ReactElement {
    return <>
        {event && event.description.length > 0 && <>
            <Divider />

            <Header title={event && descriptionName[event.descriptionType]} />
            <div className={'description'}>
                <CKEditorContent text={event && event.description} />
            </div>
        </>}
    </>;
}
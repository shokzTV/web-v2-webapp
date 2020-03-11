import { ReactElement } from "react";
import { Event } from "../../../../api/@types/Event";
import Divider from "../../../Divider";
import CKEditorContent from "../../../CKEditorContent";
import { COLORS } from "../../../../style/colors";

export default function EventDisclaimer({event}: {event: Event | null}): ReactElement {
    return <>
        {event && event.disclaimer.length > 0 && <>
            <Divider half/>
            <div className={'disclaimer'}>
                <CKEditorContent text={event && event.disclaimer} />
            </div>
        </>}

        <style jsx>{`
            .disclaimer {
                text-align: right;
            }
            .disclaimer :global(*) {
                color: ${COLORS.WEAK};
                font-size: 14px;
            }
        `}</style>
    </>;
}
import { ReactElement } from "react";
import Navigation from "../Common/Navigation";
import SelectedEvent from "../Common/Blocks/SelectedEvent";
import { pageWrapper } from "../../style/page";
import LastNewsEntries from "../Common/Blocks/LastNewsEntries";

export default function Page(): ReactElement {
    return <>
        <Navigation />
        
        <div className={'pageWrapper'}>
            <SelectedEvent />
            <div className={'pageContent'}>
                <LastNewsEntries />

            </div>
        </div>

        <style jsx>{pageWrapper}</style>
    </>;
}
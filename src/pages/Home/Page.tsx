import { ReactElement } from "react";
import Navigation from "../../Components/Navigation";
import SelectedEvent from "../../Components/Blocks/SelectedEvent";
import { pageWrapper } from "../../style/page";
import LastNewsEntries from "../../Components/Blocks/LastNewsEntries";

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
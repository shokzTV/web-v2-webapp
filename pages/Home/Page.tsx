import { ReactElement } from "react";
import Navigation from "../Common/Navigation";
import SelectedEvent from "../Common/Blocks/SelectedEvent";
import { pageWrapper } from "../../style/page";

export default function Page(): ReactElement {
    return <>
        <Navigation />
        
        <div className={'pageWrapper'}>
            <SelectedEvent />
        </div>

        <style jsx>{pageWrapper}</style>
    </>;
}
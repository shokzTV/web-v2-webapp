import { ReactElement } from "react";


export default function Divider(): ReactElement {
    return <div className={'divider'}>
        <style jsx>{`
            .divider {
                border-bottom: 1px solid #DDD;
                margin: 20px 0;
            }
        `}</style>
    </div>;
}
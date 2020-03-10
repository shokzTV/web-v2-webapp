import { ReactElement } from "react";

export default function AlphaInfo(): ReactElement {
    return <div className={'alphaInfo'}>
        Diese Website ist gerade noch im Early-Access und noch nicht fertig gestellt. Daher kann es zu Fehlern und Problemen kommen.

        <style jsx>{`
            .alphaInfo {
                padding: 8px;
                text-align: center;
                background-color: #DDD;
                font-size: 14px;

            }    
        `}</style>
    </div>;
}
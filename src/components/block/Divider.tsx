import { ReactElement } from "react";
import classNames from "classnames";


export default function Divider({half = false}: {half?: boolean}): ReactElement {
    return <div className={classNames('divider', {half})}>
        <style jsx>{`
            .divider {
                border-bottom: 1px solid #DDD;
                margin: 20px 0;
            }

            .half {
                margin-top: 20px;
                margin-bottom: 10px;
            }
        `}</style>
    </div>;
}
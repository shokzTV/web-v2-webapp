import { ReactElement } from "react";
import classNames from "classnames";

export default function Divider({half = false, double = false}: {half?: boolean; double?: boolean}): ReactElement {
    return <div className={classNames('divider', {double, half})}>
        <style jsx>{`
            .divider {
                border-bottom: 1px solid #DDD;
                margin: 20px 0;
                height: 1px;
            }

            .half {
                margin-top: 20px;
                margin-bottom: 10px;
            }

            .double {
                margin: 30px 0;
            }
        `}</style>
    </div>;
}
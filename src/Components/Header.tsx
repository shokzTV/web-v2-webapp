import { ReactElement } from "react";
import { COLORS } from '../../src/style/colors';

export default function Header({title}): ReactElement {
    return <div className={'header'}>
        {title}

        <style jsx>{`
            .header {
                margin: 5px 0 15px 0;
                line-height: 1em;
                padding: 0 0 0 10px;
                border-left: 2px solid ${COLORS.SECONDARY};
                font-weight: 400;
                color: ${COLORS.PRIMARY};
                text-transform: uppercase;
                font-size: 16px;
            }
        `}</style>
    </div>;
}
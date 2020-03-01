import { ReactElement } from "react";
import { COLORS } from '../style/colors';

interface Props {
    title: string;
    link?: string;
    linkTarget?: string;
}

export default function Header({title, link}: Props): ReactElement {
    return <div className={'header'}>
        {title}

        {link && <div className={'linkLabel'}>
            {link}
        </div>}

        <style jsx>{`
            .header {
                margin: 5px 0 15px 0;
                line-height: 1em;
                padding: 0 0 0 10px;
                border-left: 2px solid ${COLORS.SECONDARY};
                font-weight: 400;
                color: ${COLORS.PRIMARY};
                text-transform: uppercase;
                font-size: 20px;
                display: flex;
                justify-content: space-between;
            }

            .linkLabel {
                cursor: pointer;
                font-size: 14px;
                line-height: 1em;
                padding: 3px 8px;
                text-transform: uppercase;
                background-color: #EBEBEB;
                color: ${COLORS.PRIMARY};
            }
        `}</style>
    </div>;
}
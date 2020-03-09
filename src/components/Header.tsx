import { ReactElement } from "react";
import { COLORS } from '../style/colors';
import Link from "next/link";

interface Props {
    title: string;
    link?: string;
    linkTarget?: string;
}

export default function Header({title, linkTarget, link}: Props): ReactElement {
    return <div className={'header'}>
        <div>{title}</div>

        {link && <div className={'linkLabel'}>
            {linkTarget && <Link href={linkTarget}>
                <a className={'link'}>{link}</a>
            </Link>}

            {!linkTarget && link}
        </div>}

        <style jsx>{`
            .header {
                margin: 5px 0 40px 0;
                line-height: 1em;
                padding: 0 0 0 10px;
                border-left: 2px solid ${COLORS.HIGHLIGHT};
                font-weight: 400;
                color: ${COLORS.PRIMARY};
                text-transform: uppercase;
                font-size: 20px;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap-reverse;;
            }

            .linkLabel {
                cursor: pointer;
                font-size: 14px;
                line-height: 1em;
                padding: 3px 8px;
                text-transform: uppercase;
                background-color: #EBEBEB;
                color: ${COLORS.PRIMARY};
                flex-shrink: 0;
            }

            .link {
                text-decoration: none;
            }
        `}</style>
    </div>;
}
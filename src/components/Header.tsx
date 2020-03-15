import { ReactElement } from "react";
import { COLORS } from '../style/colors';
import Link from "next/link";
import classNames from "classnames";

interface Props {
    title: string;
    link?: string;
    linkTarget?: string;
    inverted?: boolean;
    prefix?: string;
    topHeader?: boolean;
    reduceSpacing?: boolean;
}

export default function Header({title, linkTarget, link, inverted = false, prefix = '', topHeader = false, reduceSpacing = false}: Props): ReactElement {
    return <div className={classNames('header', {inverted, topHeader, reduceSpacing})}>
        <div className={'title'}>{prefix.length > 0 && <><span className={'prefix'}>{prefix}</span>{' - '}</>}{title}</div>

        {link && <div className={'linkLabel'}>
            {linkTarget && <Link href={linkTarget}>
                <a className={'link'}>{link}</a>
            </Link>}

            {!linkTarget && link}
        </div>}

        <style jsx>{`
            .header {
                margin: 0 0 35px 0;
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

            .topHeader {
                margin: 0 0 20px 0;
            }

            .reduceSpacing {
                margin-bottom: 15px;
            }
            .title {
                color: ${COLORS.PRIMARY};
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

            .inverted .title {
                color: #FFF;
            }

            .prefix {
                color: #FF0100;
            }
        `}</style>
    </div>;
}
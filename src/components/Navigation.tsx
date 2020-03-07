import { ReactElement } from "react";
import { COLORS } from "../style/colors";
import Link from "next/link";
import { useRouter } from 'next/router';
import classNames from "classnames";

interface MenuItem {
    name: string;
    path: string;
}

const items: MenuItem[] = [{
    name: 'Startseite',
    path: '/'
}, {
    name: 'Artikel',
    path: '/articles'
}, {
    name: 'Events',
    path: '/events'
}, {
    name: 'Videos',
    path: '/videos'
}];

export default function Navigation(): ReactElement {
    const router = useRouter();
    return <div className={'menuWrapper'}>
        <div className={'menuWrapperInner'}>
            <div className={'logo'}>
                <Link href={'/'}>
                    <img src={'/images/logo.png'} alt={'website_logo'} />
                </Link>
            </div>

            {items.map(({name, path}) => <Link key={path} href={path}>
                <a className={classNames('menuLink', {active: path === (router && router.pathname)})}>{name}</a>
            </Link>)}
        </div>

        <style jsx>{`
            .menuWrapper {
                background: ${COLORS.PRIMARY};
                height: 75px;
            }

            .menuWrapperInner {
                margin: 0 auto;
                max-width: 1024px;
                display: flex;
                height: 100%;
            }

            .menuLink {    
                color: #FFF;
                height: 100%;
                display: flex;
                align-items: center;
                padding: 0 20px;
                font-size: 20px;
                border-bottom: 5px solid ${COLORS.PRIMARY};
                transition: border-color 240ms ease-in-out;
                text-transform: uppercase;
                margin-top: 5px;
                height: calc(100% - 5px);
                text-decoration: none;
            }

            .menuLink:hover, .menuLink.active {
                border-color: ${COLORS.HIGHLIGHT};
            }

            .logo {
                display: flex;
                align-items: center;
                cursor: pointer;
                margin-right: 40px;
                width: 131px;
            }
        `}</style>
    </div>;
}
import { ReactElement, useState } from "react";
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
    name: 'News',
    path: '/news'
}, {
    name: 'Videos',
    path: '/videos'
}];

export default function Navigation(): ReactElement {
    const [showSubMenu, setShowSubMenu] = useState(false);
    const router = useRouter();
    return <div className={classNames('menuWrapper', {showSubMenu})}>
        <div className={'menuWrapperInner'}>
            <div className={'logo'}>
                <Link href={'/'}>
                    <img src={'/images/logo.png'} alt={'website_logo'} />
                </Link>
            </div>

            <div className={'menuList'}>
                {items.map(({name, path}) => <Link key={path} href={path}>
                    <a className={classNames('menuLink', {active: path === (router && router.pathname)})}>{name}</a>
                </Link>)}
            </div>

            <div className={'responsiveMenuOpener'} onClick={() => setShowSubMenu(!showSubMenu)}>
                <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.2656 1.45312H0.234375C0.172215 1.45312 0.112601 1.42843 0.0686468 1.38448C0.024693 1.34052 0 1.28091 0 1.21875L0 0.28125C0 0.21909 0.024693 0.159476 0.0686468 0.115522C0.112601 0.0715681 0.172215 0.046875 0.234375 0.046875H17.2656C17.3278 0.046875 17.3874 0.0715681 17.4314 0.115522C17.4753 0.159476 17.5 0.21909 17.5 0.28125V1.21875C17.5 1.28091 17.4753 1.34052 17.4314 1.38448C17.3874 1.42843 17.3278 1.45312 17.2656 1.45312V1.45312ZM17.2656 7.70312H0.234375C0.172215 7.70312 0.112601 7.67843 0.0686468 7.63448C0.024693 7.59052 0 7.53091 0 7.46875L0 6.53125C0 6.46909 0.024693 6.40948 0.0686468 6.36552C0.112601 6.32157 0.172215 6.29688 0.234375 6.29688H17.2656C17.3278 6.29688 17.3874 6.32157 17.4314 6.36552C17.4753 6.40948 17.5 6.46909 17.5 6.53125V7.46875C17.5 7.53091 17.4753 7.59052 17.4314 7.63448C17.3874 7.67843 17.3278 7.70312 17.2656 7.70312V7.70312ZM17.2656 13.9531H0.234375C0.172215 13.9531 0.112601 13.9284 0.0686468 13.8845C0.024693 13.8405 0 13.7809 0 13.7188L0 12.7812C0 12.7191 0.024693 12.6595 0.0686468 12.6155C0.112601 12.5716 0.172215 12.5469 0.234375 12.5469H17.2656C17.3278 12.5469 17.3874 12.5716 17.4314 12.6155C17.4753 12.6595 17.5 12.7191 17.5 12.7812V13.7188C17.5 13.7809 17.4753 13.8405 17.4314 13.8845C17.3874 13.9284 17.3278 13.9531 17.2656 13.9531V13.9531Z" fill="white"/>
                </svg>
            </div>
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
                border-bottom: 3px solid ${COLORS.PRIMARY};
                transition: border-color 240ms ease-in-out;
                text-transform: uppercase;
                margin-top: 3px;
                height: calc(100% - 3px);
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

            .menuList {
                display: flex;
            }

            .responsiveMenuOpener {
                display: none;
            }

            @media only screen and (max-width: 425px) { 
                .menuWrapper {
                    height: 75px;
                    transition: height 240ms ease-in-out;
                    position: relative;
                }

                .responsiveMenuOpener {
                    display: block;
                    position: absolute;
                    top: 28px;
                    right: 15px;
                }

                .menuWrapper.showSubMenu {
                    height: 450px;
                }

                .logo {
                    height: 75px;
                    flex-shrink: 0;
                    margin: 0 auto;
                }

                .menuList {
                    display: flex;
                    flex-direction: column;
                    align-items: stretch;
                    overflow: hidden;
                    flex-shrink: 0;
                }

                .menuWrapperInner {
                    flex-direction: column;
                    align-items: stretch;
                    overflow: hidden;
                }

                .menuLink {
                    height: 75px;
                    border-bottom: none;
                    border-left: 5px solid ${COLORS.PRIMARY};
                    margin-top: 0;
                }
            }
        `}</style>
    </div>;
}
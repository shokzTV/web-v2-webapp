import { ReactElement } from "react";
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resolve } from 'styled-jsx/css';
import { COLORS } from "../style/colors";
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

const { className, styles } = resolve`
    .menuWrapper {
        background: ${COLORS.PRIMARY};
    }

    .ant-menu {
        max-width: 1024px;
        width: 100%;
        margin: 0 auto;
        text-align: left;
        background: ${COLORS.PRIMARY};
        height: 77px;
        border-bottom: none;
    }

    .ant-menu :global(.ant-menu-submenu), 
    .ant-menu > :global(.ant-menu-submenu-active),
    .ant-menu:not(.ant-menu-inline) :global(.ant-menu-submenu-open),
    .ant-menu :global(.ant-menu-submenu-title:hover) {
        color: #FFF;
        border: none;
    }

    .ant-menu-horizontal > .ant-menu-item-selected,
    .ant-menu-horizontal > .ant-menu-item:not(.logo):hover {
        border-bottom: 3px solid ${COLORS.SECONDARY};
    }

    .ant-menu-item, .ant-menu-submenu-title {
        padding: 14px 20px;
        vertical-align: middle;
        font-size: 20px;
    }

    .ant-menu-item a {
        text-transform: uppercase;
        color: #FFF;
    }

    :global(.ant-menu-submenu) .ant-menu-item {
        padding: 0 20px;
    }
    :global(.ant-menu-submenu) .ant-menu-item a {
        text-transform: uppercase;
        color: #000!important;
    }

    .logo {
        pointer-events: none;
        padding: 3px 40px 3px 0;
    }
`;

export default function Navigation(): ReactElement {
    const {pathname} = useRouter();
    return <div className={classNames(className, 'menuWrapper')}>
        <Menu mode={'horizontal'} selectedKeys={[pathname]} className={className}>
            <Menu.Item className={classNames(className, 'logo')}>
                <img src={'/images/logo.png'} alt={'logo'} />
            </Menu.Item>
            {items.map(({name, path}) => <Menu.Item key={path} className={className}>
                    <Link key={path} href={path}><a className={className}>{name}</a></Link>
                </Menu.Item>
            )}
        </Menu>
        {styles}
    </div>;
}
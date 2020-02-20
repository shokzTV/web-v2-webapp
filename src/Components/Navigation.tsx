import { ReactElement } from "react";
import { Menu } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { resolve } from 'styled-jsx/css';
import { COLORS } from "../style/colors";

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
    name: 'Special event',
    path: '/specialEvents'
}, {
    name: 'Dota 2 lernen',
    path: '/learn-dota'
}, {
    name: 'Shop',
    path: '/shop'
}, {
    name: 'VOD',
    path: '/vod'
}];

const { className, styles } = resolve`
    .ant-menu {
        text-align: center;
        background: ${COLORS.PRIMARY};
    }

    .ant-menu :global(.ant-menu-submenu), 
    .ant-menu > :global(.ant-menu-submenu-active),
    .ant-menu:not(.ant-menu-inline) :global(.ant-menu-submenu-open),
    .ant-menu :global(.ant-menu-submenu-title:hover) {
        color: #FFF;
        border: none;
    }

    .ant-menu-horizontal > .ant-menu-item-selected,
    .ant-menu-horizontal > .ant-menu-item:hover {
        border-bottom: 3px solid ${COLORS.SECONDARY};
    }

    .ant-menu-item a {
        text-transform: uppercase;
        color: #FFF;
    }

    :global(.ant-menu-submenu) .ant-menu-item a {
        text-transform: uppercase;
        color: #000;
    }
`;

export default function Navigation(): ReactElement {
    const {pathname} = useRouter();
    return <Menu mode={'horizontal'} selectedKeys={[pathname]} className={className}>
        {items.map(({name, path}) => <Menu.Item key={path} className={className}>
                <Link key={path} href={path}><a className={className}>{name}</a></Link>
            </Menu.Item>
        )}
        {styles}
    </Menu>;
}
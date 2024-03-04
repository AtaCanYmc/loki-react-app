import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {IoIosList} from "react-icons/io";

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiFillHome />,
        cName: 'nav-text'
    },
    {
        title: 'Wifi',
        path: '/wifi',
        icon: <FaIcons.FaWifi />,
        cName: 'nav-text'
    },
    {
        title: 'Wifi History',
        path: '/wifi/history',
        icon: <IoIcons.IoIosPaper />,
        cName: 'nav-text'
    },
    {
        title: 'Connection Attempts',
        path: '/attempt',
        icon: <IoIosList />,
        cName: 'nav-text'
    },
    {
        title: 'Voice',
        path: '/voice',
        icon: <FaIcons.FaMicrophone />,
        cName: 'nav-text'
    },
];
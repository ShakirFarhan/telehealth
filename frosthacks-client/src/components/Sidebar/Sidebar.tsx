'use client';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from "./Sidebar.module.css";
import { usePathname, useRouter } from 'next/navigation';

// React Icons
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { FaStarOfLife } from "react-icons/fa";
// import { LuStethoscope } from "react-icons/lu";
import { MdOutlineAddHome } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";

const Sidebar = () => {

    const router = useRouter();
    const pathname = usePathname();
    const { dashboard__sidebar, sidebar__top, sidebar__nav, page__active, sidebar__bottom, sidebar__profile } = styles;

    const makeALogout = () => {
        document.cookie = `hospAdminToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
        router.push('/');
    }

    return (
        <aside className={dashboard__sidebar}>
            <div className={sidebar__top}>
                <h1>Registered Hospital</h1>
                <ul className={sidebar__nav}>
                    <li><Link href={"/dashboard"} className={`${pathname === '/dashboard' && page__active}`} ><LuLayoutDashboard fontSize={20}/><span>Dashboard</span></Link></li>
                    <li><Link href={"/dashboard/allcases"} className={`${pathname === '/dashboard/allcases' && page__active}`} ><MdOutlineAddHome fontSize={20}/><span>All cases</span></Link></li>
                    <li><Link href={"/dashboard/livecases"} className={`${pathname.includes('/dashboard/livecases') && page__active}`} ><FaStarOfLife fontSize={20}/><span>Live Cases</span></Link></li>
                    <li><Link href={"/dashboard/settings"} className={`${pathname === '/dashboard/settings' && page__active}`} ><CgProfile fontSize={20}/><span>Profile</span></Link></li>
                </ul>
            </div>
            <div className={sidebar__bottom}>
                <button type='button' onClick={() => {makeALogout()}}><FiLogOut fontSize={20}/><span>Logout</span></button>
            </div>
        </aside>
    )
}

export default Sidebar
'use client'

import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [tabs, setTabs] = useState([
        { id: 1, name: 'Home', path: '/home', active: true },
    ]);

    useEffect(() => {
        // Update active tab based on current path
        const currentPath = pathname.split('/').pop();
        setTabs(prevTabs =>
            prevTabs.map(tab => ({
                ...tab,
                active: tab.path === `/${currentPath}`
            }))
        );
    }, [pathname]);

    const handleTabClick = (tab) => {
        router.push(tab.path);
    };

    const addNewTab = () => {
        const newTabId = tabs.length + 1;
        const newTab = {
            id: newTabId,
            name: `Tab ${newTabId}`,
            path: `/tab-${newTabId}`,
            active: true
        };

        setTabs(prevTabs =>
            prevTabs.map(tab => ({ ...tab, active: false })).concat(newTab)
        );

        // Navigate to the new tab
        router.push(newTab.path);
    };

    const closeTab = (tabToClose, e) => {
        e.stopPropagation();

        // Don't close if it's the last tab
        if (tabs.length === 1) return;

        const newTabs = tabs.filter(t => t.id !== tabToClose.id);
        const wasActive = tabToClose.active;

        // If we're closing the active tab, activate the previous tab
        if (wasActive) {
            const previousTab = newTabs[newTabs.length - 1];
            router.push(previousTab.path);
        }

        setTabs(newTabs);
    };

    return (
        <div className="bg-base-100 shadow-sm">
            {/* Chrome-like Tab Bar */}
            <div className="flex items-center justify-between bg-gray-400 px-2 py-2">
                <div className="flex items-center space-x-2">
                    {tabs.map((tab) => (
                        <div
                            key={tab.id}
                            onClick={() => handleTabClick(tab)}
                            className={`w-48 flex justify-between items-center px-4 py-2 rounded-t-lg transition-all cursor-pointer duration-200 ${tab.active
                                ? 'bg-white shadow-sm border-t border-x border-gray-200'
                                : 'bg-gray-200 hover:bg-gray-300'
                                }`}
                        >
                            <span className="text-md font-medium text-gray-700">{tab.name}</span>
                            <button
                                className="text-xl leading-6 text-gray-500 hover:text-gray-700 cursor-pointer font-semibold"
                                onClick={(e) => closeTab(tab, e)}
                            >
                                <IoClose />
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={addNewTab}
                        className="p-2 text-gray-300 hover:text-white hover:bg-gray-600 rounded-full cursor-pointer"
                    >
                        <FaPlus className="w-4 h-4" />
                    </button>
                </div>

                {/* Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-8 rounded-full">
                            <Image
                                width={32}
                                height={32}
                                alt="Profile"
                                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li><a>Profile</a></li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
'use client'

import Image from 'next/image';
import React, { useState, useEffect, useRef } from 'react';
import { FaPlus } from 'react-icons/fa';
import { IoClose } from "react-icons/io5";
import { useRouter, usePathname } from 'next/navigation';
import profileIcon from '@/assets/icon/profile-icon.png'
import { useUser } from '@/contexts/UserContext';

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { user, logout } = useUser();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [editingTabId, setEditingTabId] = useState(null);
    const [newTabName, setNewTabName] = useState('');
    const inputRef = useRef(null);

    console.log(user, 'user data from navbar');

    const [tabs, setTabs] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedTabs = localStorage.getItem('tabs');
            return savedTabs ? JSON.parse(savedTabs) : [
                { id: 1, name: 'Home', path: '/home', active: true }
            ];
        }
        return [{ id: 1, name: 'Home', path: '/home', active: true }];
    });

    // Save tabs to localStorage
    useEffect(() => {
        localStorage.setItem('tabs', JSON.stringify(tabs));
    }, [tabs]);

    // Update active tab based on current path
    useEffect(() => {
        const currentPath = pathname.split('/').pop();
        setTabs(prevTabs =>
            prevTabs.map(tab => ({
                ...tab,
                active: tab.path === `/${currentPath}`
            }))
        );
    }, [pathname]);

    // Focus input when editing starts
    useEffect(() => {
        if (editingTabId && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editingTabId]);

    const handleTabClick = (tab) => {
        router.push(tab.path);
    };

    const startEditing = (tab, e) => {
        e.stopPropagation();
        setEditingTabId(tab.id);
        setNewTabName(tab.name);
    };

    const saveTabName = (e) => {
        e.stopPropagation();
        if (newTabName.trim()) {
            setTabs(prevTabs =>
                prevTabs.map(tab =>
                    tab.id === editingTabId
                        ? { ...tab, name: newTabName.trim() }
                        : tab
                )
            );
        }
        setEditingTabId(null);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveTabName(e);
        } else if (e.key === 'Escape') {
            setEditingTabId(null);
        }
    };

    const getNextTabId = () => {
        const maxId = Math.max(...tabs.map(tab => tab.id), 0);
        return maxId + 1;
    };

    const addNewTab = () => {
        const newTabId = getNextTabId();
        const newTab = {
            id: newTabId,
            name: `Tab ${newTabId}`,
            path: `/tab-${newTabId}`,
            active: true
        };

        setTabs(prevTabs =>
            prevTabs.map(tab => ({ ...tab, active: false })).concat(newTab)
        );

        router.push(newTab.path);
    };

    const closeTab = (tabToClose, e) => {
        e.stopPropagation();

        if (tabs.length === 1) return;

        const newTabs = tabs.filter(t => t.id !== tabToClose.id);
        const wasActive = tabToClose.active;

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
                            <div className="flex items-center space-x-2">
                                {editingTabId === tab.id ? (
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={newTabName}
                                        onChange={(e) => setNewTabName(e.target.value)}
                                        onBlur={saveTabName}
                                        onKeyDown={handleKeyPress}
                                        className="w-24 px-1 py-0.5 text-sm border rounded"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                ) : (
                                    <span className="text-md font-medium text-gray-700">{tab.name}</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-1">
                                <button
                                    className="text-xl leading-6 text-gray-500 hover:text-gray-700 cursor-pointer font-semibold"
                                    onClick={(e) => closeTab(tab, e)}
                                >
                                    <IoClose />
                                </button>
                            </div>
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
                        <div className="w-[50px] rounded-full">
                            <Image
                                width={50}
                                height={50}
                                alt="Profile"
                                src={user?.picture?.data?.url || profileIcon}
                            />
                        </div>
                    </div>
                    <ul tabIndex={0} className="mt-3 z-[1] p-4 shadow menu menu-sm dropdown-content bg-base-100 rounded-box text-xl font-medium w-72">
                        <li><a>{user?.name}</a></li>
                        <li><a>{user?.email}</a></li>
                        <li><a>{user?.id}</a></li>
                        <li><a>Groups</a></li>
                        <li><a>Settings</a></li>
                        <li><a onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
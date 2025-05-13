'use client';

import React from 'react';
import FacebookLoginButton from '@/components/shared/FacebookLoginButton/FacebookLoginButton';
import { useUser } from '@/contexts/UserContext';

const Page = ({ params }) => {
    const { user } = useUser();
    const tabName = params.tab;

    // If it's the home tab, show the login button
    if (tabName === 'home') {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-4'>
                <h1 className='text-4xl font-bold mb-4'>Welcome to Facebook Auto Poster</h1>
                <p className='text-2xl mb-8'>Please login to continue</p>
                <FacebookLoginButton />
            </div>
        );
    }

    // For other tabs, show the tab content
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <h1 className='text-4xl font-bold mb-4'>{tabName.charAt(0).toUpperCase() + tabName.slice(1)}</h1>
            {user ? (
                <div className='text-center'>
                    <p className='text-2xl mb-4'>Welcome, {user.first_name || 'User'}!</p>
                    <p className='text-lg text-gray-600'>This is your {tabName} workspace.</p>
                </div>
            ) : (
                <div className='text-center'>
                    <p className='text-2xl mb-4'>Please login to access this tab</p>
                    <FacebookLoginButton />
                </div>
            )}
        </div>
    );
};

export default Page;
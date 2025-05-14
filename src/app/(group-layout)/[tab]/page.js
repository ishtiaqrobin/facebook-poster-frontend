'use client';

import React, { useEffect, useState } from 'react';
import FacebookLoginButton from '@/components/shared/FacebookLoginButton/FacebookLoginButton';
import { useUser } from '@/contexts/UserContext';
import UserProfile from '@/components/shared/UserProfile';
import PageList from '@/components/shared/PageList';
import { ENDPOINTS } from '@/lib/utility/config/config';

const Page = ({ params }) => {
    const { user, logout } = useUser();
    const tabName = params.tab;


    const [profile, setProfile] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState(null);
    const [pages, setPages] = useState([]);
    const [pagesLoading, setPagesLoading] = useState(false);
    const [pagesError, setPagesError] = useState(null);
    
    const accessToken = localStorage.getItem('access_token');

    // Fetch profile and pages when accessToken is available
    useEffect(() => {
        if (!accessToken) return;

        // Fetch profile
        setProfileLoading(true);
        setProfileError(null);
        fetch(`${ENDPOINTS.userProfile}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setProfile(data);
                setProfileLoading(false);
            })
            .catch(err => {
                setProfileError('Failed to load profile');
                setProfileLoading(false);
            });

        // Fetch pages
        setPagesLoading(true);
        setPagesError(null);
        fetch(`${ENDPOINTS.userPages}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPages(data.data || []);
                setPagesLoading(false);
            })
            .catch(err => {
                setPagesError('Failed to load pages');
                setPagesLoading(false);
            });
    }, [accessToken]);

    console.log(profile, 'profile data from tab page')

    // If it's the home tab, show the login button
    if (tabName === 'home') {
        return (
            <div className='flex flex-col items-center justify-center min-h-screen p-4'>
                <h1 className='text-4xl font-bold mb-4'>Welcome to Facebook Auto Poster</h1>
                <p className='text-2xl mb-8'>Please login to continue</p>
                {!user && <FacebookLoginButton />}
                {user && (
                    <button
                        onClick={() => logout()}
                        className="btn btn-error text-white"
                    >
                        Logout
                    </button>
                )}
            </div>
        );
    }

    // For other tabs, show the tab content
    return (
        <div className='flex flex-col items-center justify-center min-h-screen p-4'>
            <h1 className='text-4xl font-bold mb-4'>{tabName.charAt(0).toUpperCase() + tabName.slice(1)}</h1>
            {user ? (
                <div className='w-full flex flex-col items-center'>
                    <UserProfile profile={profile} loading={profileLoading} error={profileError} />
                    <PageList pages={pages} loading={pagesLoading} error={pagesError} />
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
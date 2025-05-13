'use client';

import React, { useState } from 'react';
import { useUser } from '@/contexts/UserContext';
import { FaFacebook } from 'react-icons/fa';

const FacebookLoginButton = () => {
    const { handleFacebookLogin } = useUser();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        try {
            setIsLoading(true);
            await handleFacebookLogin();
        } catch (error) {
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#166FE5] text-white px-8 py-4 rounded-xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <FaFacebook className="text-xl" />
            {isLoading ? 'Connecting...' : 'Login with Facebook'}
        </button>
    );
};

export default FacebookLoginButton; 
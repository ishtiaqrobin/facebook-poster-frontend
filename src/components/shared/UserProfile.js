import Image from 'next/image';
import React from 'react';

const UserProfile = ({ profile, loading, error }) => {
    if (loading) return <div>Loading profile...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!profile) return null;
    return (
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-md bg-white mb-6">
            <Image
                width={100}
                height={100}
                src={profile.picture?.data?.url}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold mb-2">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>
        </div>
    );
};

export default UserProfile; 
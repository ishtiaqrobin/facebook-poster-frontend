import React from 'react';

const PageList = ({ pages, loading, error }) => {
    if (loading) return <div>Loading pages...</div>;
    if (error) return <div className="text-red-500">{error}</div>;
    if (!pages || !pages.length) return <div>No pages found.</div>;
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mx-auto">
            {pages.map(page => (
                <div key={page.id} className="p-4 border rounded-lg shadow bg-white flex flex-col items-start">
                    <h3 className="text-lg font-semibold">{page.name}</h3>
                    <p className="text-gray-500 text-sm">ID: {page.id}</p>
                </div>
            ))}
        </div>
    );
};

export default PageList; 
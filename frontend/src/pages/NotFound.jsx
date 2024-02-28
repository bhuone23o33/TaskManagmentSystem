import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {

    return (
        <div className="not-found flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-5xl font-bold text-gray-800">404</h1>
            <p className="text-xl mt-4 text-gray-600">Page Not Found</p>
            <p className="text-gray-500 mt-2">
                The route you requested could not be found.
            </p>
            <button
                className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                <Link to="/">
                    Go Back to Home
                </Link>
            </button>
        </div>
    );
}

export default NotFoundPage;
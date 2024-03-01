import React from 'react'
import Navbar from '../components/Navbar.jsx'

import Spinner from '../components/Spinner.jsx'
function Home() {
    return (
        <>


            <div className="min-h-screen flex flex-col bg-white text-gray-800">
                <div className="h-screen bg-cover bg-center flex items-center justify-center text-gray-500" style={{ backgroundImage: `url('/path/to/hero-bg.jpg')` }}>
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Welcome to Our Landing Page</h1>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</button>
                    </div>
                </div>
                <div className="py-12 bg-gray-100 text-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Key Features</h2>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Feature 1</h3>
                                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, velit in volutpat auctor, nisi nisi elementum nisl, ac finibus eros elit vel nibh.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Feature 2</h3>
                                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, velit in volutpat auctor, nisi nisi elementum nisl, ac finibus eros elit vel nibh.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Feature 3</h3>
                                    <p className="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, velit in volutpat auctor, nisi nisi elementum nisl, ac finibus eros elit vel nibh.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Home

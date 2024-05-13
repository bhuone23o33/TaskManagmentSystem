import React from 'react'
import Footer from '../components/Footer.jsx'
import Spinner from '../components/Spinner.jsx'
function Home() {
    return (
        // <>
        //     <div className="min-h-screen flex flex-col bg-white text-gray-800">
        //         <div className="h-screen bg-cover bg-center flex items-center justify-center text-gray-500" style={{ backgroundImage: `url('/path/to/hero-bg.jpg')` }}>
        //             <div>
        //                 <h1 className="text-5xl font-bold mb-4">Welcome to Workify</h1>
        //                 <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Learn More</button>
        //             </div>
        //         </div>
        //         <div className="py-12 bg-gray-100 text-gray-800">
        //             <div className="container mx-auto px-4">
        //                 <h2 className="text-3xl font-bold text-center mb-12">Our Key Features</h2>
        //                 <div className="flex flex-wrap">
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Role-based Workflow:</h3>
        //                             <p className="text-gray-700">The system supports multiple user roles such as Administrator, Manager, and Employee. Each role has specific permissions and responsibilities in the project management workflow. The Administrator adds projects, the Manager assigns tasks to employees, and employees update project statuses.</p>
        //                         </div>
        //                     </div>
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Task Assignment based on Criteria:</h3>
        //                             <p className="text-gray-700"> The project facilitates efficient task assignment by allowing the Manager to assign tasks to employees based on factors like time availability and employee capability. This ensures optimal utilization of resources and timely completion of projects.</p>
        //                         </div>
        //                     </div>
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Comprehensive Project Tracking:</h3>
        //                             <p className="text-gray-700">Users can track the progress of projects and tasks within the system. Administrators have an overview of all ongoing projects, Managers can monitor task assignments and employee workload, while Employees can update task statuses upon completion, providing a comprehensive view of project progress.</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Footer />
        // </>
        // <>
        //     <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29yayUyMGRlc2t8ZW58MHx8MHx8fDA%3D')` }}>
        //         <div className="h-screen bg-gray-900 bg-opacity-75 flex items-center justify-center text-white">
        //             <div>
        //                 <h1 className="text-5xl font-bold mb-4">Welcome to Workify</h1>
        //                 {/* <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Learn More</button> */}
        //             </div>
        //         </div>
        //         <div className="py-12 bg-gray-100 text-gray-800">
        //             <div className="container mx-auto px-4">
        //                 <h2 className="text-3xl font-bold text-center mb-12">Our Key Features</h2>
        //                 <div className="flex flex-wrap">
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Role-based Workflow:</h3>
        //                             <p className="text-gray-700">The system supports multiple user roles such as Administrator, Manager, and Employee. Each role has specific permissions and responsibilities in the project management workflow. The Administrator adds projects, the Manager assigns tasks to employees, and employees update project statuses.</p>
        //                         </div>
        //                     </div>
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Task Assignment based on Criteria:</h3>
        //                             <p className="text-gray-700">The project facilitates efficient task assignment by allowing the Manager to assign tasks to employees based on factors like time availability and employee capability. This ensures optimal utilization of resources and timely completion of projects.</p>
        //                         </div>
        //                     </div>
        //                     <div className="w-full md:w-1/3 p-4">
        //                         <div className="bg-white rounded-lg shadow-md p-8">
        //                             <h3 className="text-xl font-bold mb-4">Comprehensive Project Tracking:</h3>
        //                             <p className="text-gray-700">Users can track the progress of projects and tasks within the system. Administrators have an overview of all ongoing projects, Managers can monitor task assignments and employee workload, while Employees can update task statuses upon completion, providing a comprehensive view of project progress.</p>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <Footer />
        // </>
        <>
            <div className="min-h-screen flex flex-col bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d29yayUyMGRlc2t8ZW58MHx8MHx8fDA%3D')` }}>
                <div className="h-64 bg-gray-900 bg-opacity-75 flex items-center justify-center text-white">
                    <div>
                        <h1 className="text-5xl font-bold mb-4">Welcome to Workify</h1>
                        {/* <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">Learn More</button> */}
                    </div>
                </div>
                <div className="py-12 bg-gray-100 text-gray-800">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Our Key Features</h2>
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Role-based Workflow:</h3>
                                    <p className="text-gray-700">The system supports multiple user roles such as Administrator, Manager, and Employee. Each role has specific permissions and responsibilities in the project management workflow. The Administrator adds projects, the Manager assigns tasks to employees, and employees update project statuses.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Task Assignment based on Criteria:</h3>
                                    <p className="text-gray-700">The project facilitates efficient task assignment by allowing the Manager to assign tasks to employees based on factors like time availability and employee capability. This ensures optimal utilization of resources and timely completion of projects.</p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/3 p-4">
                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h3 className="text-xl font-bold mb-4">Comprehensive Project Tracking:</h3>
                                    <p className="text-gray-700">Users can track the progress of projects and tasks within the system. Administrators have an overview of all ongoing projects, Managers can monitor task assignments and employee workload, while Employees can update task statuses upon completion, providing a comprehensive view of project progress.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Home

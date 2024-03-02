

import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getManagers, delManager, reset } from '../features/auth/authSlice.js';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner.jsx';

function ManagerListings() {
    const dispatch = useDispatch();

    const { managers, isLoading, isManager, isDeleted, isError, message } = useSelector(state => state.auth);
    const [localManagers, setLocalManagers] = useState(managers);

    useEffect(() => {
        return () => {
            if (isManager) {
                dispatch(reset());
            }
        }
    }, [dispatch, isManager])

    // getting manager data
    useEffect(() => {
        dispatch(getManagers());
        // setLocalManagers(managers);
    }, [dispatch]);

    // settin manager to localManager useState
    useEffect(() => {
        setLocalManagers(managers);
    }, [managers]);

    // if any error occured
    useEffect(() => {
        if (isError) {
            toast.error(message);
        }
    }, [isError, message]);

    // it is when delete function is successful
    useEffect(() => {
        if (isDeleted) {
            toast.success('Manager Deleted Successfully!');
            dispatch(getManagers());
        }
    }, [isDeleted, dispatch]);

    const handleButtonClick = (id) => {
        const index = managers.findIndex((manager) => manager._id === id);
        if (index !== -1) {
            const newManagers = [...managers];
            newManagers.splice(index, 1);
            setLocalManagers(newManagers);
        }
        dispatch(delManager(id));
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <table className="table-auto w-full">
                <thead>
                    <tr className="bg-gray-100 text-left">
                        <th className="px-4 py-2">SN</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {localManagers.length > 0 && localManagers.map((item, i) => (
                        <tr key={item._id}>
                            <td className="px-4 py-2">{(i + 1)}</td>
                            <td className="px-4 py-2">{item.name}</td>
                            <td className="px-4 py-2">{item.email}</td>
                            <td className="px-4 py-2">
                                <button
                                    className="px-2 py-1 text-xs font-bold rounded bg-blue-500 hover:bg-blue-700 text-white"
                                    onClick={() => handleButtonClick(item._id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default ManagerListings

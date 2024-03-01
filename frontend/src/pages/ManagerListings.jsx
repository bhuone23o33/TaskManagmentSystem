import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getManagers, delManager, reset } from '../features/auth/authSlice.js';
import { toast } from 'react-toastify';

import Spinner from '../components/Spinner.jsx';

function ManagerListings() {

    const { managers, isLoading, isManager, isDeleted, delMessage, isError, message } = useSelector(state => state.auth);
    // const [data, isData] = useState(false);
    // const [rstate, setRstate] = useState('Remove');
    const [Managers, setManagers] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            if (isManager) {
                dispatch(reset());
            }
        }
    }, [dispatch, isManager])

    useEffect(() => {
        if (isManager) {
            setManagers(managers);
        }
    }, [isManager, managers]);

    useEffect(() => {
        dispatch(getManagers());
    }, []);

    const handleButtonClick = (id) => {
        dispatch(delManager(id));
        if (isDeleted) {
            const updatedManagers = managers.filter((manager) => manager._id !== id);
            setManagers(updatedManagers);
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    // console.log(Managers, managers);
    // const filteredManagers = managers.filter(manager => manager._id !== id);

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
                    {Managers.length > 0 && Managers.map((item, i) => (
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

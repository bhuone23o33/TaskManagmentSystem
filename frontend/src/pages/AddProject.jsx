import React from 'react'

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { createProject, reset1 } from '../features/Projects/projectSlice.js';
import Spinner from '../components/Spinner.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { storage } from '../firebase/TaskConfig.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function AddProject() {
    // console.log(userType);
    // console.log(userType);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        projectName: "",
    });

    const [uploadFile, setUploadFile] = useState(null);
    const [uploadFile1, setUploadFile1] = useState(null);

    const [projectReq, setProjectReq] = useState("");
    const [projectReq1, setProjectReq1] = useState("");

    const [selectedDate, setSelectedDate] = useState(new Date());

    const { projectName } = formData;

    const [isUploading, setIsUploading] = useState(false);



    const { isLoading, isError, isSuccess, message } = useSelector(state => state.project);

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        // redirect if success
        if (isSuccess) {
            dispatch(reset1());
            toast.success('Project Created!');
            navigate('/')
        }


        dispatch(reset1());
    }, [isError, isSuccess, navigate, dispatch, message])

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });

        if (event.target.name === 'projectDescription') {
            setProjectReq1(event.target.files[0]);
        } else if (event.target.name === 'projectRequirements') {
            setProjectReq(event.target.files[0]);
        }
    };





    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsUploading(true); // Set uploading state to true

            // Upload both files and wait for URLs to be generated
            const [descriptionUrl, requirementsUrl] = await Promise.all([
                uploadFileToStorage(uploadFile1, 'Desc'),
                uploadFileToStorage(uploadFile, 'Req')
            ]);

            const projectData = {
                ...formData,
                projectDescription: descriptionUrl,
                projectRequirements: requirementsUrl,
                projectDeadline: selectedDate
            };

            dispatch(createProject(projectData)); // Create project with updated data
        } catch (error) {
            console.error('Error submitting project:', error);
            toast.error(error.message);
        } finally {
            setIsUploading(false); // Set uploading state to false
        }
    };

    if (isLoading || isUploading) {
        return <Spinner />
    }

    return (
        <div className="min-h-screen h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-screen-md space-y-8">
                <h1 className="text-2xl font-bold text-center">Add Project</h1>
                <form onSubmit={handleSubmit} className="space-y-4 w-full flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Name</span>
                                </div>
                                <input
                                    placeholder="Type your name"
                                    className="input input-bordered w-full"
                                    type="text"
                                    id="projectName"
                                    name="projectName"
                                    value={projectName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Description</span>
                                </div>
                                {/* <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Description"
                                    id="projectDescription"
                                    name="projectDescription"
                                    value={projectDescription}
                                    onChange={handleChange}
                                    required
                                ></textarea> */}
                                <input type="file" className="file-input file-input-bordered w-full " onChange={(e) => setUploadFile1(e.target.files[0])} required />
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <div className="form-control">
                                <div className="label">
                                    <span className="label-text">Project Requirements</span>
                                </div>
                                {/* <textarea
                                    className="textarea textarea-bordered h-24"
                                    placeholder="Project Requirements"
                                    id="projectRequirements"
                                    name="projectRequirements"
                                    value={projectRequirements}
                                    onChange={handleChange}
                                    required
                                ></textarea> */}
                                <input type="file" className="file-input file-input-bordered w-full " onChange={(e) => setUploadFile(e.target.files[0])} required />
                            </div>
                        </div>
                        <div>
                            <div className="form-control w-full">
                                <div className="label">
                                    <span className="label-text">Deadline Date</span>
                                </div>
                                <DatePicker
                                    selected={selectedDate}
                                    onChange={(date) => setSelectedDate(date)}
                                    required
                                    className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    {/* <button type="submit" className="btn w-1/2">
                        Add Project
                    </button> */}
                    <button type="submit" className="btn mx-auto w-1/2">
                        Add Project
                    </button>
                </form>
            </div>
        </div>
    )
}


async function uploadFileToStorage(file, pathPrefix) {
    const imageRef = ref(storage, `${pathPrefix}/${file.name + v4()}`);
    await uploadBytes(imageRef, file);
    return await getDownloadURL(imageRef);
}

export default AddProject

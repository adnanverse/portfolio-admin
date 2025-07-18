import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function AddSkills() {
    let params = useParams();
    let [skilldetail, setskilldetail] = useState('')
    let [render, setrender] = useState(true)
    let [BackendImage, setBackendImage] = useState('');
    const [typeState, setTypeState] = useState('');
    let navigation = useNavigate()

    let [SelectedImage, setSelectedImage] = useState('');


    useEffect(() => {
        if (params.id != undefined) {
            axios.post('api/admin/skills/detail', { id: params.id }).then((response) => {
                if (response.data.status == true) {
                    setskilldetail(response.data.data);
                    setBackendImage(response.data.base_url + '/' + response.data.data.image);  // ✅ backend image set
                    setTypeState(response.data.data.type || '');
                } else {
                    toast.error('something went wrong !!');
                    navigation('/')
                }
            }).catch((error) => {
                toast.error(error.message);
            });
        } else {
            setskilldetail('')
            setBackendImage('')
            setTypeState('')
            setSelectedImage('')
        }
    }, [params]);

    let formhandler = (event) => {
        console.log('this is image', event.target.image.value)
        const formData = new FormData(event.target);
        event.preventDefault();
        if (params.id != undefined) {
            axios.put(`api/admin/skills/update/${params.id}`, formData).then((response) => {
                if (response.data.status == true) {
                    toast.success('skill updated successfully ')
                    setrender(!render)

                } else {
                    toast.error('something went wrong !!')
                    navigation('/')

                }


            }).catch((error) => {
                toast.error(error.message)
            })
        } else {
            axios.post('api/admin/skills/insert', formData).then((response) => {
                if (response.data.status == true) {
                    toast.success('skill inserted   successfully ')
                    event.target.reset()    
                    setSelectedImage('')

                } else {
                    toast.error('something went wrong !!!!')
                    navigation('/')

                }


            }).catch((error) => {
                toast.error(error.message)
            })

        }
    }
    let handleimagechange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }
    return (
        <section className="w-full">
            <nav className="flex border-b-2" aria-label="Breadcrumb">
                <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li className="inline-flex items-center"><a href="#" className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                    <li>
                        <div className="flex items-center">/<a href="#" className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Skill</a></div>
                    </li>
                    <li aria-current="page">
                        <div className="flex items-center">/<span className="ms-1 text-md font-medium text-gray-500 md:ms-2">
                            {
                                (params.id != null)
                                    ?
                                    'Update'
                                    :

                                    'Add'
                            }
                        </span></div>
                    </li>
                </ol>
            </nav>
            <div className="w-full min-h-[610px]">
                <div className="max-w-[1220px] mx-auto py-5">
                    <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                        {
                            (params.id != null)
                                ?
                                'Update Skills'
                                :
                                'Add Skills'
                        } </h3>
                    <form
                        onSubmit={formhandler}
                        className="border justify-between border-t-0 p-3 rounded-b-md border-slate-400">

                        <div className='flex gap-8 flex-wrap'>
                            <div className='basis-[50%]'>
                                <div className="mb-5">
                                    <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">Name</label>
                                    <input
                                        name="name"
                                        autoComplete='off'
                                        type="text"
                                        defaultValue={skilldetail.name}
                                        id="base-input"
                                        className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Enter your name"
                                    />
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">percentage</label>
                                    <input
                                        name="percentage"
                                        type="text"
                                        autoComplete='off'
                                        defaultValue={skilldetail.percentage}
                                        id="base-input"
                                        className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                        placeholder="Enter your name"
                                    />
                                </div>
                            </div>


                            {/* <div className="flex items-center basis-[30%] justify-center w-full">
                                    <input
                                        onChange={handleimagechange}
                                        id="dropzone-file"
                                        type="file"
                                        name='image'
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    >
                                        {SelectedImage ? (
                                            <img
                                                src={SelectedImage}
                                                alt="Selected"
                                                className="w-full h-full object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
                5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 
                0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                        )}
                                    </label>
                                </div> */}
                            <div className="flex items-center basis-[30%] justify-center w-full">
                                <input
                                    onChange={handleimagechange}
                                    id="dropzone-file"
                                    type="file"
                                    name="image"
                                    className="hidden"
                                />
                                <label
                                    htmlFor="dropzone-file"
                                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                                >
                                    {SelectedImage ? (
                                        <img
                                            src={SelectedImage}
                                            alt="Selected"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : BackendImage ? (
                                        <img
                                            src={BackendImage} // ✅ adjust your backend path here
                                            alt="Existing"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5
                5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 
                0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                    )}
                                </label>
                            </div>




                        </div>


                        <div className="mb-5">
                            <label className="block mb-2 text-base font-medium text-gray-900">Skill Type</label>
                            <select
                                name="type"
                                value={typeState}
                                onChange={(e) => setTypeState(e.target.value)}
                                className="border-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                <option value="">Select type</option>
                                <option value="tech">Technology</option>
                                <option value="skill">Skill</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">Order</label>
                            <input
                                name="order"
                                type="text"
                                autoComplete='off'
                                defaultValue={skilldetail.order}
                                id="base-input"
                                className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                placeholder="Enter your name"
                            />
                        </div>



                        <button
                            type="submit"
                            className="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

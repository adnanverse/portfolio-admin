import React, { useContext, useState } from 'react'
import { CommonContext } from '../context\'/Context'
import { IoIosArrowDown } from "react-icons/io";
import Swal from 'sweetalert2'
import { IoIosArrowUp } from "react-icons/io";
import { toast } from 'react-toastify';
import axios from '../../AxiosInstances/axiosInstance';
export default function ContactMessages() {
    let [blockid, setblockid] = useState('')
    let [checkedvalue, setcheckedvalue] = useState([])

    let { messages, setrender, render } = useContext(CommonContext)
    let changestatushandler = () => {
        axios.post('api/admin/contact-me/change-status', { id: checkedvalue }).then((response) => {
            if (response.data.status == true) {
                toast.success('Messages mark as read')
                setrender(!render)
                setcheckedvalue([])
            } else {
                toast.error('something went wrong !!')

            }


        }).catch((error) => {
            toast.error(error.message)
        })
    }
    const deleteHandler = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You want to delete these records? (They will be permanently deleted)',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete',
            cancelButtonText: 'Cancel',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post('api/admin/contact-me/delete', { id: checkedvalue }
                )
                    .then((response) => {
                        if (response.data.status === true) {
                            toast.success('Messages deleted succesfully!');
                            setcheckedvalue([]);
                            setrender(!render);
                        } else {
                            toast.error('Something went wrong!');
                        }
                    })
                    .catch((error) => {
                        toast.error(error.message);
                    });
            } else {
                toast.info("Deletion cancelled");
            }
        });
    }
    let openAccordian = (id) => {
        if (blockid == id) {
            setblockid('')
        } else {
            setblockid(id)
        }

    }

    let checkData = (event) => {
        const id = event.target.id;

        if (event.target.checked === true) {
            setcheckedvalue([...checkedvalue, id]);
        } else {
            const filtered = checkedvalue.filter((v) => v !== id);
            setcheckedvalue(filtered);
        }

    }

    console.log(checkedvalue)
    return (
        <>
            <nav class="flex border-b-2" aria-label="Breadcrumb">
                <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                    <li>
                        <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Contact Messages</a></div>
                    </li>

                </ol>
            </nav>
            <div className="w-[95%] border mt-9 border-slate-400 rounded-t-md  mx-auto">
                <div className=' bg-slate-100 flex justify-between py-3 px-4 rounded-t-md border border-slate-400'>
                    <h3 class="text-[26px] font-semibold  bg-slate-100 rounded-t-md ">
                        Contact Messages</h3>
                    <div>
                        <button onClick={changestatushandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">change status</button>
                        <button onClick={deleteHandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">delete all </button>
                    </div>
                </div>


                <div id="accordion-flush" data-accordion="collapse" data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white" data-inactive-classes="text-gray-500 dark:text-gray-400">
                    {
                        messages.map((v, i) => {
                            return (
                                <>
                                    <div className='flex  items-center   '>



                                        <div className='  px-2 basis-[2%]'>
                                            <input className='' onChange={checkData} id={v._id} type="checkbox" />
                                        </div>
                                        <h2 id="accordion-flush-heading-1 " onClick={() => openAccordian(v._id)} className='basis-[98%]  px-2'>
                                            <button type="button" class="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3" data-accordion-target="#accordion-flush-body-1" aria-expanded="true" aria-controls="accordion-flush-body-1">
                                                <span>{v.name}</span>
                                                <span className="text-[12px] text-gray-400">
                                                    {new Date(v.createdAt).toLocaleString('en-IN', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                                <div className='flex items-center gap-5'>
                                                    <div className={`${v.status ? 'text-blue-700 font-semibold' : 'text-gray-400'}`}>
                                                        {v.status ? 'Unread' : 'Read'}
                                                    </div>

                                                    <div>
                                                        {
                                                            (blockid == v._id) ? <IoIosArrowUp className='text-[18px]' /> : <IoIosArrowDown className='text-[18px]' />
                                                        }

                                                    </div>

                                                </div>

                                            </button>
                                        </h2>
                                    </div>

                                    <div id="accordion-flush-body-1" className={`${(blockid == v._id) ? ' ' : 'hidden'} px-8`} aria-labelledby="accordion-flush-heading-1">
                                        <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                                            <p class="mb-2 text-gray-500 dark:text-gray-400">{v.email}</p>
                                            <p class="text-gray-500 dark:text-gray-400">{v.subject}</p>
                                            <p class="text-gray-500 dark:text-gray-400">{v.message}</p>
                                        </div>
                                    </div>

                                </>
                            )
                        })
                    }



                </div>



            </div>
        </>
    )
}

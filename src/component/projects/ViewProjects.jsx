import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import { TbListDetails } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

export default function ViewProjects() {
    let [checkedvalue, setcheckedvalue] = useState([]);
    let [render, setrender] = useState(true)
    let [ProjectData, setProjectData] = useState([]);
    let [baseurl, setbaseurl] = useState('')
    let [DetailPopUp, setdetailpopup] = useState(false)
    let [projectdetail, setprojectdetail] = useState('')
    let navigation = useNavigate()

    useEffect(() => {
        axios.post('api/admin/project/view',)
            .then((response) => {
                if(response.data.status===true){
                      setProjectData(response.data.data)

                setbaseurl(response.data.base_url)

                }else{
                    toast.error(response.data.message)
                    navigation('/')
                }
              

            }).catch((error) => {
                console.log(error.message)
                toast.error(error.data.message)
            })
    }, [render])

    let GetProjectId = (id) => {
        axios.post(`api/admin/project/detail`, { id: id }).then((response) => {
                if (response.data.tokenstatus != false) {
                    setprojectdetail(response.data.data)
                } else {
                    toast.error(response.data.message)
                    navigation('/')
                }
            })
            .catch((error) => {
                toast.error(error.data.message)
                console.log(error)
            })

        setdetailpopup(true)
    }

 let changestatushandler = () => {
    axios.post('api/admin/project/change-status', { id: checkedvalue })
      .then((response) => {
        if (response.data.status === true) {
          toast.success('staatus updated !!!')
          setcheckedvalue([])
          setrender(!render)
        } else {
          toast.error(response.data.message)
          navigation('/')
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
        axios.post('api/admin/project/delete',
          { id: checkedvalue }
        )
          .then((response) => {
            if (response.data.status === true) {
              toast.success('Status updated!');
              setcheckedvalue([]);
              setrender(!render);
            } else {
              toast.error(response.data.message);
              navigation('/')
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
    let selectallhandle = (event) => {
        if (event.target.checked == true) {
            let data = [];
            ProjectData.forEach(v => {
                data.push(v._id)
            });
            setcheckedvalue(data)

            toast.success('checked')
        } else {
            setcheckedvalue([])

        }
    }

    let SingleSelect = (event) => {
        const id = event.target.id;

        if (event.target.checked === true) {
            setcheckedvalue([...checkedvalue, id]);
        } else {
            const filtered = checkedvalue.filter((v) => v !== id);
            setcheckedvalue(filtered);
        }
    };
    return (
        <>
            <DetailPopUpComp DetailPopUp={DetailPopUp} project={projectdetail} setdetailpopup={setdetailpopup} baseurl={baseurl} />
            <nav class="flex border-b-2" aria-label="Breadcrumb">
                <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
                    <li>
                        <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Projects</a></div>
                    </li>
                    <li aria-current="page">
                        <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
                            view
                        </span></div>
                    </li>
                </ol>
            </nav>
            <div className="w-[95%] border mt-8 border-slate-400 rounded-t-md  mx-auto">
                <div className=' bg-slate-100 flex justify-between py-3 px-4 rounded-t-md border border-slate-400'>
                    <h3 class="text-[26px] font-semibold  bg-slate-100 rounded-t-md ">
                        View Projects </h3>
                    <div>
                        <button onClick={changestatushandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">change status</button>
                        <button onClick={deleteHandler} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">delete all </button>
                    </div>
                </div>

                <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr className="w-full">
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            onChange={selectallhandle}
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3"> Name</th>
                                <th scope="col" className="px-6 py-3">Project Type</th>
                                <th scope="col" className="px-6 py-3">Order</th>
                                <th scope="col" className="px-6 py-3">status</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ProjectData.map((v, i) => {
                                    return (
                                        <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="w-4 p-4">
                                                <div className="flex items-center">
                                                    <input
                                                        id={v._id}
                                                        type="checkbox"
                                                        onChange={SingleSelect} // ✅ Directly passing the event
                                                        checked={checkedvalue.includes(v._id)}
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm"
                                                    />
                                                    <label htmlFor="checkbox-table-3" className="sr-only">
                                                        checkbox
                                                    </label>
                                                </div>
                                            </td>
                                            <th
                                                scope="row"
                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                            >
                                                {v.name}
                                            </th>
                                            <td className="px-6 py-4">{v.project_type}</td>

                                            <td className="px-6 py-4">{v.order}</td>
                                            <td className={`px-6 ${(v.status == true) ? 'text-green-500' : 'text-red-700'}  py-4`}>{(v.status == true) ? 'Active' : ' Inactive'}</td>
                                            <td className="px-6 py-4 flex gap-4 items-center">
                                                <TbListDetails onClick={() => GetProjectId(v._id)} />
                                                <span className="w-px h-4 bg-gray-400"></span>
                                                <Link to={`/project/update/${v._id}`} className="font-medium text-blue-600 hover:underline">
                                                    Edit
                                                </Link>

                                                {/* Vertical Divider */}



                                            </td>


                                        </tr>

                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>

        </>
    )
}


function DetailPopUpComp({ baseurl, DetailPopUp, project, setdetailpopup }) {
    return (
        <>
            <div id="order-modal" className={` ${DetailPopUp ? '' : 'hidden'} fixed inset-0 z-50 flex justify-center items-center  bg-opacity-40`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
                <div className="relative bg-white rounded-lg shadow-lg w-[95%] max-w-6xl max-h-[90vh] overflow-y-auto" >
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t sticky top-0 bg-white z-10">
                        <h3 className="text-xl font-semibold text-gray-900">Project Details</h3>
                        <button
                            type="button"
                            onClick={() => setdetailpopup(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
                        >
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="grid md:grid-cols-[60%_40%] grid-cols-1 gap-8">
                            {/* 🖼️ Images Block */}
                            <div className="flex flex-wrap gap-4 border rounded-md shadow-md p-4 justify-start items-start">
                                {project?.images?.length > 0 ? (
                                    project.images.map((v, i) => (
                                        <img
                                            key={i}
                                            src={`${baseurl}/${v.image}`}
                                            alt="project"
                                            className="h-40 object-cover rounded border"
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500">No images available</p>
                                )}
                            </div>

                            {/* 📋 Project Details */}
                            <div className="border rounded-md shadow-md p-4">
                                <h3 className="text-center font-semibold text-lg mb-4">Project Info</h3>
                                <ul className="space-y-3 text-[15px]">
                                    <li><strong>Name:</strong> {project?.name}</li>
                                    <li><strong>Type:</strong> {project?.project_type}</li>
                                    <li><strong>Status:</strong> {project?.status ? 'Active' : 'Inactive'}</li>
                                    <li><strong>Order:</strong> {project?.order}</li>
                                    <li><strong>Short Description:</strong><br />{project?.short_description}</li>
                                    <li><strong>Long Description:</strong><br />{project?.long_description}</li>
                                    <li><strong>Features:</strong>
                                        <ul className="list-disc ml-5">
                                            {project?.features?.map((f, i) => <li key={i}>{f}</li>)}
                                        </ul>
                                    </li>
                                    <li><strong>Tech Stack:</strong>
                                        <ul className="list-disc ml-5">
                                            {project?.tech_stack?.map((tech, i) => (
                                                <li key={i}>{typeof tech === 'object' ? tech.name : tech}</li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li><strong>Paragraphs:</strong>
                                        <ul className="list-disc ml-5">
                                            {project?.paragraphs?.map((p, i) => <li key={i}>{p}</li>)}
                                        </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import Swal from 'sweetalert2'
export default function ViewSocial() {
  let [checkedvalue, setcheckedvalue] = useState([]);

  let [render, setrender] = useState(true)
  let [profiles, setprofiles] = useState([])

   useEffect(() => {
    axios.post('api/admin/social/view')
      .then((response) => {
        if(response.data.status === true){
           setprofiles(response.data.data)
        }else{
          toast.error(response.data.message)
        }
        }).catch((error) => {
        console.log(error.message)
      })
  }, [render])


  const getIconComponent = (iconName) => {
    const prefix = iconName.slice(0, 2);
    let IconComponent;

    switch (prefix) {
      case 'Fa':
        IconComponent = FaIcons[iconName];
        break;
      case 'Ai':
        IconComponent = AiIcons[iconName];
        break;
      case 'Io':
        IconComponent = IoIcons[iconName];
        break;
      case 'Bs':
        IconComponent = BsIcons[iconName];
        break;
      case 'Md':
        IconComponent = MdIcons[iconName];
        break;
      case 'Ri':
        IconComponent = RiIcons[iconName];
        break;
      case 'Gi':
        IconComponent = GiIcons[iconName];
        break;
      default:
        IconComponent = null;
    }

    return IconComponent ? <IconComponent size={24} /> : <span className="text-red-500">Invalid Icon</span>;
  };



  let changestatushandler = () => {
    axios.post('api/admin/social/change-status', { id: checkedvalue })
      .then((response) => {
        if (response.data.status == true) {
          toast.success('staatus updated !!!')
          setcheckedvalue([])
          setrender(!render)
        } else {
          toast.error(response.data.message)
        }
      }).catch((error) => {
        toast.error(error.message)
      })

  }
  let deleteHandler = () => {
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
        axios.post('api/admin/social/delete',
          { id: checkedvalue })
          .then((response) => {
            if (response.data.status === true) {
              toast.success('Status updated!');
              setcheckedvalue([]);
              setrender(!render);
            } else {
              toast.error(response.data.message);
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
      profiles.forEach(v => {
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

  }
  return (
    <>
      <nav class="flex border-b-2" aria-label="Breadcrumb">
        <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
          <li>
            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Profiles</a></div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
              view
            </span></div>
          </li>
        </ol>
      </nav>
      <div className="w-[95%] border mt-7  border-slate-400 rounded-t-md  mx-auto">
        <div className=' bg-slate-100 flex justify-between py-3 px-4 rounded-t-md border border-slate-400'>
          <h3 class="text-[26px] font-semibold  bg-slate-100 rounded-t-md ">
            View Profiles </h3>
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
                <th scope="col" className="px-6 py-3">URL</th>
                <th scope="col" className="px-6 py-3">Logo</th>
                <th scope="col" className="px-6 py-3">Order</th>
                <th scope="col" className="px-6 py-3">status</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {
                profiles.map((v, i) => {
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
                      <td className="px-6 py-4">{v.url}</td>
                      <td className="px-6 w-24 py-4">
                         {getIconComponent(v.icon)}
                      </td>
                      <td className="px-6 py-4">{v.order}</td>
                      <td className={`px-6 ${(v.status == true) ? 'text-green-500' : 'text-red-700'}  py-4`}>{(v.status == true) ? 'Active' : ' Inactive'}</td>
                      <td className="px-6 py-4">
                        <Link
                          to={`/profiles/update/${v._id}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </Link>
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

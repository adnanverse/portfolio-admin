import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as BsIcons from "react-icons/bs";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";
import * as GiIcons from "react-icons/gi";
import { toast } from 'react-toastify';
import axios from '../../AxiosInstances/axiosInstance';
export default function AddSocial() {
  let params = useParams  ();
  let [socialdetail, setsocialdetail] = useState('')
  let [render, setrender] = useState(true)
  const [DynamicIcon, setDynamicIcon] = useState(null);

  let formhandler = (event) => {
    event.preventDefault();
    if (params.id != undefined) {
      axios.put(`api/admin/social/update/${params.id}`, event.target).then((response) => {
        if (response.data.status == true) {
          toast.success('profile updated successfully ')
          setrender(!render)

        } else {
          toast.error(response.data.message)

        }


      }).catch((error) => {
        toast.error(error.message)
      })
    } else {
      axios.post('api/admin/social/insert', event.target).then((response) => {
        if (response.data.status == true) {
          toast.success('Profile inserted   successfully ')
          event.target.reset();

        } else {
          toast.error(response.data.message)

        }


      }).catch((error) => {
        toast.error(error.message)
      })

    }
  }


   const getIconComponent = (iconName) => {
    const prefix = iconName?.substring(0, 2);
    switch (prefix) {
      case 'Fa': return FaIcons[iconName];
      case 'Ai': return AiIcons[iconName];
      case 'Io': return IoIcons[iconName];
      case 'Bs': return BsIcons[iconName];
      case 'Md': return MdIcons[iconName];
      case 'Ri': return RiIcons[iconName];
      case 'Gi': return GiIcons[iconName];
      default: return null;
    }
  };

  useEffect(() => {
    if (params.id != undefined) {
      axios.post('api/admin/social/detail', { id: params.id }).then((response) => {
        if (response.data.status === true) {
          setsocialdetail(response.data.data);
          const iconName = response.data.data.icon;
          const iconComponent = getIconComponent(iconName);
          setDynamicIcon(() => iconComponent);
        } else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error(error.message);
      });
    } else {
      setsocialdetail('')
      setDynamicIcon(null);
    }
  }, [params]);

  const handleIconChange = (e) => {
    const value = e.target.value;
    const prefix = value.substring(0, 2);

    if (prefix === 'Fa') {
      setDynamicIcon(() => FaIcons[value]);
    } else if (prefix === 'Ai') {
      setDynamicIcon(() => AiIcons[value]);
    } else if (prefix === 'Io') {
      setDynamicIcon(() => IoIcons[value]);
    } else if (prefix === 'Bs') {
      setDynamicIcon(() => BsIcons[value]);
    } else if (prefix === 'Md') {
      setDynamicIcon(() => MdIcons[value]);
    } else if (prefix === 'Ri') {
      setDynamicIcon(() => RiIcons[value]);
    } else if (prefix === 'Gi') {
      setDynamicIcon(() => GiIcons[value]);
    } else {
      setDynamicIcon(null); // unknown or unsupported
    }


  }
  return (
    <section className="w-full">
      <nav className="flex border-b-2" aria-label="Breadcrumb">
        <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center"><a href="#" className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
          <li>
            <div className="flex items-center">/<a href="#" className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">Profiles</a></div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">/<span className="ms-1 capitalize text-md font-medium text-gray-500 md:ms-2">
             { (params.id!=undefined)?'update':'Add'}
       
            </span></div>
          </li>
        </ol>
      </nav>
      <div className="max-w-[1220px] mx-auto py-5">
        <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
          {params.id ? 'Update Profiles' : 'Add Profiles'}
        </h3>

        <form onSubmit={formhandler} className="border p-3 rounded-b-md border-slate-400">
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">Name</label>
            <input
              name="name"
              autoComplete='off'
              type="text"
              defaultValue={socialdetail.name}
              id="base-input"
              className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="icon" className="block mb-2 text-base font-medium text-gray-900">Icon (e.g., FaFacebook)</label>
            <div className="flex items-center gap-4">
              <input
                name="icon"
                autoComplete='off'
                type="text"
                defaultValue={socialdetail.icon}
                onChange={handleIconChange}
                id="icon"
                className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 py-2.5 px-3 w-full"
                placeholder="Enter icon name like FaFacebook"
              />
              <div className="text-2xl w-16 h-16 rounded-2xl  border flex  items-center justify-center  ">
                {DynamicIcon ? <DynamicIcon className="text-[30px]" /> : <span className="text-gray-400">No icon</span>}
              </div>
            </div>
          </div>
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">URL</label>
            <input
              name="url"
              autoComplete='off'
              type="text"
              defaultValue={socialdetail.url}
              id="base-input"
              className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-5 	text-base font-medium text-gray-900">Order</label>
            <input
              name="order"
              type="text"
              autoComplete='off'
              defaultValue={socialdetail.order}
              id="base-input"
              className="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
              placeholder="Enter your name"
            />
          </div>


          <button
            type="submit"
            className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  )
}

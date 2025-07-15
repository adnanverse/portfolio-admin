import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function AddPara() {
  let params = useParams();
  let [Aboutdetail, setAboutdetail] = useState('')
  let [render, setrender] = useState(true)


  useEffect(() => {
    if (params.id != undefined) {
      axios.post('api/admin/about-me/detail', { id: params.id }).then((response) => {
        if (response.data.status == true) {
          console.log(response.data.data)
          setAboutdetail(response.data.data);
        } else {
          toast.error(response.data.message);
        }
      }).catch((error) => {
        toast.error(error.message);
      });
    } else {
      setAboutdetail('')
    }
  }, [params, render]);


  let formhandler = (event) => {
    event.preventDefault();
    if (params.id != undefined) {
      axios.put(`api/admin/about-me/update/${params.id}`, event.target ).then((response) => {
        if (response.data.status === true) {
          toast.success('about  updated successfully ')
          setrender(!render)

        } else {
          toast.error(response.data.message)

        }


      }).catch((error) => {
        toast.error(error.message)
      })
    } else {
      axios.post('api/admin/about-me/add', event.target).then((response) => {
        if (response.data.status == true) {
          toast.success('about inserted   successfully ')
          event.target.reset();

        } else {
          toast.error(response.data.message)

        }


      }).catch((error) => {
        toast.error(error.message)
      })

    }

  }
  return (
    <section class="w-full">
      <nav class="flex mx-auto border-b-2" aria-label="Breadcrumb">
        <ol class="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li class="inline-flex items-center"><a href="#" class="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600">Home</a></li>
          <li>
            <div class="flex items-center">/<a href="#" class="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2">About</a></div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">/<span class="ms-1 text-md font-medium text-gray-500 md:ms-2">
              {
                (params.id != null)
                  ?
                  'Update '
                  :

                  'Add '
              }
            </span></div>
          </li>
        </ol>
      </nav>
      <div class="w-full min-h-[610px]">
        <div class="max-w-[1220px] mx-auto py-5">
          <h3 class="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            {
              (params.id != null)
                ?
                'Update About'
                :
                'Add About'
            } </h3>
          <form
            onSubmit={formhandler}
            class="border   justify-between border-t-0 p-3 rounded-b-md border-slate-400">

            <div class="mb-5">
              <label for="base-textarea" class="block mb-5 text-base font-medium text-gray-900">Paragraph</label>
              <textarea
                name="para"
                defaultValue={Aboutdetail.para}
                id="base-textarea"
                class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Enter your Paragraph"
                rows="4"
              ></textarea>
            </div>




            <div class="mb-5">
              <label for="base-input" class="block mb-5 	text-base font-medium text-gray-900">Order</label>
              <input
                name="order"
                type="text"
                defaultValue={Aboutdetail.order}
                id="base-input"
                class="text-base border-2 shadow-sm border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                placeholder="Enter your name"
              />
            </div>



            <button
              type="submit"
              class="focus:outline-none my-10 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

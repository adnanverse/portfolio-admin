import axios from '../../AxiosInstances/axiosInstance';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommonContext } from '../context\'/Context';

export default function Profile() {
  let{render, setrender}=useContext(CommonContext)
	let [userdetails, setuserdetails] = useState({})
	let [SelectedProfileImage, setSelectedProfileImage] = useState('')
	let [SelectedResume, setSelectedResume] = useState('')

	let [baseurl, setbaseurl] = useState('')
	let navigation = useNavigate()


	useEffect(() => {
		axios.post('api/admin/profile/detail')
			.then((response) => {
        if(response.data.status===true){
          setbaseurl(response.data.base_url)
				setuserdetails(response.data.data)
        }else{
          toast.error(response.data.message)
        }
				

			}).catch((error) => {
				console.log(error.message)
			})
	}, [render])

	let handleimagechange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedProfileImage(reader.result);
			};
			reader.readAsDataURL(file);
		}
	}

	let handelresumechange = (event) => {
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setSelectedResume(reader.result);
			};
			reader.readAsDataURL(file);
		}

	}
	let handlesubmission = (event) => { 
		event.preventDefault()
		axios.put('api/admin/profile/update', event.target)
    .then((response) => {
			if (response.data.status == true) {
				toast.success('Profile updates successfully !! ')
				event.target.reset();
				setrender(!render);
			} else {
				toast.error(response.data.message)
			}

		}).catch((error) => {
			toast.error(error.message)
		})


	}
	return (
	<>
  <div className="w-full mx-3 bg-white py-10">
    <div className="max-w-[1220px] mx-auto bg-gray-50 rounded-xl shadow-md overflow-hidden border border-slate-300">
      <h3 className="text-2xl font-semibold bg-slate-100 py-3 px-4 rounded-t-xl border border-slate-400">
            
            Website Profile
        </h3>

      <form onSubmit={handlesubmission} className=" p-8">
        
        {/* Left Column */}
        <div className="space-y-8 flex  ">

          {/* Profile Image */}
          <div className="basis-[50%] flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-3">Profile Image</h4>
            <div className="relative w-90 h-90">
              <img
                src={
                  SelectedProfileImage
                    ? SelectedProfileImage
                    : userdetails.image === null
                    ? '/images/user.jpg'
                    : `${baseurl}/${userdetails.image}`
                }
                alt="Profile"
                className="w-full h-full object-cover rounded-lg border shadow"
              />
              <input
                type="file"
                name="image"
                onChange={handleimagechange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="basis-[50%] flex flex-col items-center">
            <h4 className="text-lg font-semibold mb-3">Resume</h4>
            <div className="w-90 h-[400px] border rounded-lg overflow-hidden shadow">
              {SelectedResume || userdetails.resume ? (
                <iframe
                  src={
                    SelectedResume
                      ? SelectedResume
                      : `${baseurl}/${userdetails.resume}`
                  }
                  className="w-full h-full"
                ></iframe>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  No resume uploaded
                </div>
              )}
            </div>

            <label
              htmlFor="resume_upload"
              className="mt-4 inline-block px-6 py-2 text-sm text-white bg-purple-700 rounded-md cursor-pointer hover:bg-purple-800"
            >
              Upload Resume
            </label>
            <input
              id="resume_upload"
              name="resume"
              type="file"
              onChange={handelresumechange}
              className="hidden"
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={userdetails.name}
              id="name"
              placeholder="Enter your name"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={userdetails.email}
              id="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Domain */}
          <div>
            <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-700">
              Domain
            </label>
            <input
              type="text"
              name="position"
              defaultValue={userdetails.position}
              id="position"
              placeholder="Enter your domain"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block mb-2 text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              name="bio"
              id="bio"
              rows="5"
              defaultValue={userdetails.bio}
              placeholder="Write about yourself"
              className="w-full px-4 py-2 border rounded-md focus:ring-purple-500 focus:border-purple-500"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-700 text-white px-6 py-2 rounded-md hover:bg-purple-800"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</>


	)
}

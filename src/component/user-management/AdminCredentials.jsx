import axios from '../../AxiosInstances/axiosInstance';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function AdminCredentials() {
    let[admindetail,setadmindetail]=useState('')
    let [render, setrender] = useState(true)

    useEffect(() => {
            axios.post('api/admin/detail')
                .then((response) => {
                    console.log(response.data.data)
                    setadmindetail(response.data.data)
    
                }).catch((error) => {
                    toast.log(error.message)
                })
        }, [render])

    let handlesubmission = (event) => {
        event.preventDefault();
        if((event.target.confirm_password.value=='' && event.target.password.value=='') || (event.target.password.value==event.target.confirm_password.value)){
			axios.put('api/admin/update',event.target).then((response)=>{
				if(response.data.status=true){
					toast.success('Profile updates successfully !! ')
					event.target.reset();
					setrender(!render);
				}else{	
					toast.error(response.data.message)
				}

			}).catch((error)=>{
				toast.error(error.message)
			})
		}else{
			toast.error("password and conferm password does'nt match")
		}

    }

    return (
        <>
          <div className="w-full bg-white">
    <div className="max-w-[1220px] mx-auto py-6 px-4">
        <h3 className="text-2xl font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
            Admin Profile
        </h3>

        <form onSubmit={handlesubmission} className="p-6 border border-t-0 rounded-b-md border-slate-400 bg-gray-50">

            {/* Email */}
            <div className="mb-6">
                <label htmlFor="email" className="block text-base font-medium text-gray-900 mb-2">
                    Email
                </label>
                <input
                    name="email"
                    defaultValue={admindetail.email}
                    type="email"
                    id="email"
                    className="text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 shadow-sm"
                    placeholder="Enter your email"
                />
            </div>

            {/* New Password */}
            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                    Change Password
                </label>
                <label htmlFor="new_password" className="block text-base font-medium text-gray-900 mb-2">
                    New Password
                </label>
                <input
                    name="password"
                    type="password"
                    id="new_password"
                    className="text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 shadow-sm"
                    placeholder="Enter new password"
                />
            </div>

            {/* Confirm Password */}
            <div className="mb-6">
                <label htmlFor="confirm_password" className="block text-base font-medium text-gray-900 mb-2">
                    Confirm Password
                </label>
                <input
                    name="confirm_password"
                    type="password"
                    id="confirm_password"
                    className="text-base border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-2.5 shadow-sm"
                    placeholder="Confirm new password"
                />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5"
                >
                    Submit
                </button>
            </div>

        </form>
    </div>
</div>


        </>
    )
}

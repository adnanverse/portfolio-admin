import axios from '../AxiosInstances/axiosInstance';
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CommonContext } from './context/Context'

export default function Login() {
    let { setislogin, setrender, render } = useContext(CommonContext)
    let navigation = useNavigate()

    let handlesubmission = (event) => {
        event.preventDefault();

        axios.post('api/admin/login', event.target)
            .then((response) => {
                if (response.data.status == true) {
                    localStorage.setItem('token', response.data.token)
                    setislogin(true)
                    toast.success('login successfully')
                    setrender(!render)
                    navigation('/user-management/website-profile')

                } else {
                    toast.error(response.data.message)
                }

            }).catch((error) => {
                console.log(error.message)
            })
    }



    return (
        <>
            <div className="max-h-screen">
                <section className="border-red-500 bg-gray-200 min-h-screen flex items-center justify-center">
                    <div className="bg-gray-100 p-5 flex items-center rounded-2xl shadow-lg max-w-3xl">
                        <div className="md:w-1/2 px-5">
                            <h2 className="text-2xl font-bold text-[#002D74]">Login</h2>

                            <form className="mt-6" onSubmit={handlesubmission} method="POST">
                                <div>
                                    <label className="block text-gray-700">Email Address</label>
                                    <input autoComplete="off" type="email" name="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none" autoFocus required />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-700">Password</label>
                                    <input type="password" autoComplete="off" name="password" placeholder="Enter Password" minLength="3" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
                  focus:bg-white focus:outline-none" required />
                                </div>



                                <button type="submit" className="w-full block bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg
                px-4 py-3 mt-6">Log In</button>
                            </form>





                        </div>

                        <div className="w-1/2 md:block hidden ">
                            <img src="https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80" className="rounded-2xl" alt="page img" />
                        </div>

                    </div>
                </section>
            </div>
        </>
    )
}

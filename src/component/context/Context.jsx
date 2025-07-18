import axios from '../../AxiosInstances/axiosInstance';
import React, { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

let CommonContext = createContext();

export default function Context({ children }) {
    let [messages, setmessages] = useState([])
    let [islogin, setislogin] = useState(false)
    let [render,setrender]=useState(true)
    let [count, setcount] = useState(0)
    useEffect(() => {
        axios.post('api/admin/contact-me/view').then((response) => {
            if (response.data.status == true) {
                setcount(response.data.new_records)
                setmessages(response.data.data)

            } else {
                toast.error(response.data.message)

            }


        }).catch((error) => {
            console.log(error.message)
        })


    }, [render])


    let allItems = { messages, count, setislogin,render,setrender }
    return (
        <div>
            <CommonContext.Provider value={allItems}>

                {children}
            </CommonContext.Provider>

        </div>
    )
}

export { CommonContext };

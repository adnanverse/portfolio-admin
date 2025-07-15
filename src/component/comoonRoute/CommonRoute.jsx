import React, { useEffect, useState } from 'react'
import Sidebars from '../Sidebars'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function CommonRoute() {
   
  return (
    <div className='flex'>
        <Sidebars/>
        <div className='basis-[75%]'>
     <Outlet/>
      
        </div>
       
    </div>
  )
}

import React, { useContext, useEffect, useState } from 'react'
import { Sidebar, SidebarCollapse, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { AiOutlineUser } from "react-icons/ai";
import { MdManageAccounts } from 'react-icons/md';
import { ImProfile } from "react-icons/im";
import { GoProject } from "react-icons/go";
import { SiHyperskill } from "react-icons/si";
import { GrContact } from "react-icons/gr";
import { FaRegCircleDot } from "react-icons/fa6";
import { GiRolledCloth } from "react-icons/gi";
import { IoShareSocialSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CommonContext } from './context/Context';

export default function Sidebars() {
let {count}=useContext(CommonContext)

   return (
      <>

         <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Open sidebar</span>
            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
               <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
         </button>

         <div id="separator-sidebar" className="  overflow-hidden h-screen basis-[23%] transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <Sidebar className="h-full px-3  overflow-y-auto bg-gray-50 dark:bg-gray-800">
               <div className="flex pb-2 items-center  text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                  <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Portfolio Admin Panel</span>
               </div>
               <ul className="space-y-2 font-medium">

             
                     <SidebarCollapse className='material' icon={MdManageAccounts} label="User Management">

                        <Link to={'/user-management/admin-credentials'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Admin Credentials
                           </div>
                           </Link>

                        <Link to={'/user-management/website-profile'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Website Profile
                           </div>
                           </Link>
                     </SidebarCollapse>
                  
                  <li>
                     <Link to={'/contact-messages'} className="flex items-center justify-between p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">

                        {/* 📩 Text + Icon */}
                        <div className="flex items-center gap-2">
                           <GrContact className="text-[18px]" />
                           <span className="flex-1 whitespace-nowrap">Contact Messages</span>
                        </div>

                        {/* 🔴 Unread Count Badge on Right */}
                        {count > 0 && (
                           <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-2 text-xs font-semibold text-white bg-red-600 rounded-full">
                              {count}
                           </span>
                        )}
                     </Link>
                  </li>



               </ul>
               <p>

               </p>
               <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                  <li>
                     Other Component
                  </li>
                  
                     <SidebarCollapse className='material' icon={SiHyperskill} label="Skills">

                        <Link to={'/skills/add'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Add Skills
                           </div></Link>

                        <Link to={'/skills/view'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              View Skills
                           </div></Link>
                     </SidebarCollapse>
             
              
                     <SidebarCollapse className='material' icon={IoShareSocialSharp} label="Profiles">

                        <Link to={'/profiles/add'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Add Profiles
                           </div></Link>

                        <Link to={'/profiles/view'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              View Profiles
                           </div></Link>
                     </SidebarCollapse>
                 
                     <SidebarCollapse className='material' icon={AiOutlineUser} label="About">

                        <Link to={'/about/add'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Add About
                           </div>
                           </Link>

                        <Link to={'/about/view'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              View About
                           </div>
                           </Link>
                     </SidebarCollapse>
                  
                     <SidebarCollapse className='material' icon={GoProject} label="Project">

                        <Link to={'/project/add'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              Add Project
                           </div>
                           </Link>

                        <Link to={'/project/view'} className="flex gap-2 items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-6 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">

                           <FaRegCircleDot className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                           <div>

                              View Projects
                           </div>
                           </Link>
                     </SidebarCollapse>
                  

               </ul>
            </Sidebar>
         </div >


      </>
   )
}


import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './component/Login.jsx'
import CommonRoute from './component/comoonRoute/CommonRoute.jsx'
import Profile from './component/user-management/Profile.jsx'
import { ToastContainer } from 'react-toastify'
import AddSkills from './component/skills/AddSkills.jsx'
import ViewSkills from './component/skills/ViewSkills.jsx'
import AddSocial from './component/Social/AddSocial.jsx'
import ViewSocial from './component/Social/ViewSocial.jsx'
import ContactMessages from './component/contact-messages/ContactMessages.jsx'
import Context from './component/context\'/Context.jsx'
import AddPara from './component/aboutME/AddPara.jsx'
import ViewPara from './component/aboutME/ViewPara.jsx'
import AdminCredentials from './component/user-management/AdminCredentials.jsx'
import AddProject from './component/projects/AddProject.jsx'
import ViewProjects from './component/projects/ViewProjects.jsx'
createRoot(document.getElementById('root')).render(
  <>
    <Context>
      <ToastContainer />
      <BrowserRouter>
        <Routes>

          <Route path='/' element={<Login />}>    </Route>

          <Route path='/' element={<CommonRoute />}>

            <Route path='user-management'>
              <Route path='admin-credentials' element={<AdminCredentials />} />
              <Route path='website-profile' element={<Profile />} />
            </Route>

            <Route path='skills'>
              <Route path='add' element={<AddSkills />} />
              <Route path='view' element={<ViewSkills />} />
              <Route path='update/:id' element={<AddSkills />} />

            </Route>
            <Route path='profiles'>
              <Route path='add' element={<AddSocial />} />
              <Route path='view' element={<ViewSocial />} />
              <Route path='update/:id' element={<AddSocial />} />
            </Route>
            <Route path='about'>
              <Route path='add' element={<AddPara />} />
              <Route path='view' element={<ViewPara />} />
              <Route path='update/:id' element={<AddPara />} />
            </Route>
            <Route path='project'>
              <Route path='add' element={<AddProject />} />
              <Route path='view' element={<ViewProjects />} />
              <Route path='update/:id' element={<AddProject />} />
            </Route>
            <Route path='/contact-messages' element={<ContactMessages />} />
          </Route>





        </Routes>

      </BrowserRouter>
    </Context>
  </>



)

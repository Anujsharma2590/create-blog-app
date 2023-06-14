import React from 'react'
import { Route, Routes } from 'react-router-dom'
import TabContainer from '../components/mainPage'
import BlogEditor from '../components/blogEditor'
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TabContainer />} />
      <Route path="/:blogId" element={<BlogEditor />} />
    </Routes>
  )
}

export default AppRoutes

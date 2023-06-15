import { Route, Routes } from 'react-router-dom'

import TabContainer from '../components/mainPage'
import BlogEditor from '../components/blogEditor'
import ViewBlog from '../components/mainPage/ViewBlog'

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TabContainer />} />
      <Route path="/:blogId" element={<BlogEditor />} />
      <Route path="view/:blogId" element={<ViewBlog />} />
    </Routes>
  )
}

export default AppRoutes

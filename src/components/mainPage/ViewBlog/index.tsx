import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BlogListType, client } from '..'
import styles from './index.module.scss'
const ViewBlog: FC = () => {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState<BlogListType>()

  useEffect(() => {
    const fetchBlogByid = async () => {
      const response = await client.get(`/blogs/${blogId}`)
      setBlogData(response.data)
    }
    fetchBlogByid()
  }, [])

  function handleNavigateBack() {
    navigate('/')
  }

  return (
    <div className={styles.viewBlogWrapperContainer}>
      <span className={styles.backBtn} onClick={handleNavigateBack}>
        <ArrowLeftOutlined />
      </span>
      <div className={styles.viewBlogWrapper}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.title}>{blogData?.topic}</h1>
        </div>

        <div className={styles.contentWrapper}>
          {blogData ? (
            <div dangerouslySetInnerHTML={{ __html: blogData.content }} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewBlog

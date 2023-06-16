import { FC, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { BlogListType, client } from '..'
import styles from './index.module.scss'
import Loader from '../../shared/Loader'
const ViewBlog: FC = () => {
  const { blogId } = useParams()
  const navigate = useNavigate()
  const [blogData, setBlogData] = useState<BlogListType>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
    const fetchBlogByid = async () => {
      const response = await client.get(`/blogs/${blogId}`)
      setBlogData(response.data)
      setLoading(false)
    }
    fetchBlogByid()
  }, [])

  function handleNavigateBack() {
    navigate('/')
  }

  return (
    <div className={styles.viewBlogWrapperContainer}>
      {loading ? (
        <Loader />
      ) : (
        <>
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
          </div>{' '}
        </>
      )}
    </div>
  )
}

export default ViewBlog

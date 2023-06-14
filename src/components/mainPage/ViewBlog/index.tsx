import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BlogListType, client } from '..'
import styles from './index.module.scss'
const ViewBlog: FC = () => {
  const { blogId } = useParams()
  const [blogData, setBlogData] = useState<BlogListType>()

  useEffect(() => {
    const fetchBlogByid = async () => {
      const response = await client.get(`/blogs/${blogId}`)
      setBlogData(response.data)
    }
    fetchBlogByid()
  }, [])

  return (
    <div className={styles.viewBlogWrapperContainer}>
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

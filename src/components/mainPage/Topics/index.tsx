import { FC } from 'react'
import styles from './index.module.scss'
import { BlogListType, TabpaneEnum, client } from '..'
import TopicRow from './TopicRow'
import { Empty, message } from 'antd'
import Loader from '../../shared/Loader'

type TopicsPropsType = {
  topicsArray?: BlogListType[]
  fetchBlogs: (key: TabpaneEnum) => void
  tabValue: TabpaneEnum
  loading: boolean
}

const Topics: FC<TopicsPropsType> = ({
  topicsArray,
  fetchBlogs,
  tabValue,
  loading,
}) => {
  const handleDelete = async (id: string) => {
    try {
      const response = await client.delete(`/blogs/${id}`)

      if (response) {
        message.success('Blog topic has been deleted successfully', 2)
        fetchBlogs(tabValue)
      }
    } catch (error) {
      // Handle error
      console.error(`Error deleting topic with ID ${id}:`, error)
    }
  }

  return (
    <>
      <h2 className={styles.mainPageHeading}>Recommended Topics</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.topicRowContainerWrapper}>
          {topicsArray && topicsArray.length > 0 ? (
            topicsArray.map((ele) => (
              <TopicRow data={ele} onDelete={handleDelete} />
            ))
          ) : (
            <Empty />
          )}
        </div>
      )}
    </>
  )
}

export default Topics

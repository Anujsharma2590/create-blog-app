import React, { FC } from 'react'
import styles from './index.module.scss'
import { BlogListType, TabpaneEnum, client } from '..'
import TopicRow from './TopicRow'
import { Empty, message } from 'antd'

type TopicsPropsType = {
  topicsArray?: BlogListType[]
  fetchBlogs: (key: TabpaneEnum) => void
  tabValue: TabpaneEnum
}

const Topics: FC<TopicsPropsType> = ({ topicsArray, fetchBlogs, tabValue }) => {
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
      <div className={styles.topicRowContainerWrapper}>
        {topicsArray && topicsArray.length > 0 ? (
          topicsArray.map((ele, index) => (
            <TopicRow data={ele} onDelete={handleDelete} />
          ))
        ) : (
          <Empty />
        )}
      </div>
    </>
  )
}

export default Topics

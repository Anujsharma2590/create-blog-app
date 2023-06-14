import React, { FC } from 'react'
import styles from './index.module.scss'
import { BlogListType, TabpaneEnum, client } from '..'
import TopicRow from './TopicRow'

type TopicsPropsType = {
  topicsArray?: BlogListType[]
  fetchBlogs: (key: TabpaneEnum) => void
  tabValue: TabpaneEnum
}

const Topics: FC<TopicsPropsType> = ({ topicsArray, fetchBlogs, tabValue }) => {
  const handleDelete = async (id: string) => {
    try {
      const res = await client.delete(`/blogs/${id}`)
      if (res) {
        fetchBlogs(tabValue)
      }
    } catch (error) {
      // Handle error
      console.error(`Error deleting topic with ID ${id}:`, error)
    }
  }
  return (
    <div>
      <h2>RecommendedTopics</h2>
      {topicsArray && topicsArray.length > 0 ? (
        topicsArray.map((ele, index) => (
          <div key={index}>
            <TopicRow data={ele} onDelete={handleDelete} />
          </div>
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default Topics

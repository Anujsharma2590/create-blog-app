import React, { FC, useEffect, useState } from 'react'
import { Button, Tabs, Modal, Spin } from 'antd'

import type { TabsProps } from 'antd'
import CreateModalTopic from './CreateModalTopic'
import Topics from './Topics'
import axios from 'axios'
import styles from './index.module.scss'

export const client = axios.create({
  baseURL: 'http://localhost:3006',
})
export type BlogListType = {
  id: string
  topic: string
  keywords: string[]
  content: string
  categories: string
}
export enum TabpaneEnum {
  All = 'all',
  Custom = 'custom',
  ICP = 'icp',
  Mission = 'mission',
  Product = 'product',
}
const TabContainer: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const [blogsList, setBlogList] = useState<BlogListType[]>()

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const operations = (
    <Button
      style={{ background: '#E65027', color: 'white' }}
      onClick={showModal}
      size="large"
    >
      Add Topic &gt;
    </Button>
  )

  const onChange = async (key: string) => {
    if (key === TabpaneEnum.All) {
      const response = await fetchBlogs()
      if (response) {
        setBlogList(response)
      }
    } else {
      try {
        const response = await fetchBlogsByCategory(key)
        if (response) {
          setBlogList(response)
        }
      } catch (error) {
        console.error('Error fetching blogs by category:', error)
      }
    }
  }

  async function fetchBlogs() {
    try {
      const response = await client.get('/blogs')
      return response.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return null
    }
  }

  async function fetchBlogsByCategory(categories: string) {
    try {
      const response = await client.get('/blogs', { params: { categories } })

      return response.data
    } catch (error) {
      console.error('Error fetching blogs by category:', error)
      return null
    }
  }
  const getAllBlogs = async () => {
    const allBlogs = await fetchBlogs()
    if (allBlogs) {
      setBlogList(allBlogs)
    }
  }
  useEffect(() => {
    if (!isModalOpen) {
      getAllBlogs()
    }
  }, [isModalOpen])

  const items: TabsProps['items'] = [
    {
      key: TabpaneEnum.All,
      label: `All`,
      children: (
        <Topics
          topicsArray={blogsList}
          fetchBlogs={onChange}
          tabValue={TabpaneEnum.All}
        />
      ),
    },
    {
      key: TabpaneEnum.Custom,
      label: `Custom`,
      children: (
        <Topics
          topicsArray={blogsList}
          fetchBlogs={onChange}
          tabValue={TabpaneEnum.Custom}
        />
      ),
    },
    {
      key: TabpaneEnum.ICP,
      label: `ICP`,
      children: (
        <Topics
          topicsArray={blogsList}
          fetchBlogs={onChange}
          tabValue={TabpaneEnum.ICP}
        />
      ),
    },
    {
      key: TabpaneEnum.Mission,
      label: `Mission`,
      children: (
        <Topics
          topicsArray={blogsList}
          fetchBlogs={onChange}
          tabValue={TabpaneEnum.Mission}
        />
      ),
    },
    {
      key: TabpaneEnum.Product,
      label: `Product`,
      children: (
        <Topics
          topicsArray={blogsList}
          fetchBlogs={onChange}
          tabValue={TabpaneEnum.Product}
        />
      ),
    },
  ]

  return (
    <div className={styles.tabContainerWrapper}>
      <h1>Categories</h1>
      <Tabs
        tabBarExtraContent={operations}
        items={items}
        onChange={onChange}
        className={styles.tabContainer}
      />
      <CreateModalTopic isModalOpen={isModalOpen} handleCancel={handleCancel} />
    </div>
  )
}

export default TabContainer

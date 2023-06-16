import { FC, useEffect, useState } from 'react'
import { Button, Tabs } from 'antd'

import type { TabsProps } from 'antd'
import CreateModalTopic from './CreateModalTopic'
import Topics from './Topics'
import axios from 'axios'
import styles from './index.module.scss'

export const client = axios.create({
  baseURL: 'https://create-blog-app-server.onrender.com',
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

  const [loading, setLoading] = useState<boolean>(true)

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
    setLoading(true)
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
      } finally {
        setLoading(false)
      }
    }
  }

  async function fetchBlogs() {
    setLoading(true)
    try {
      const response = await client.get('/blogs')
      return response.data
    } catch (error) {
      console.error('Error fetching blogs:', error)
      return null
    } finally {
      setLoading(false)
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
          loading={loading}
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
          loading={loading}
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
          loading={loading}
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
          loading={loading}
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
          loading={loading}
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

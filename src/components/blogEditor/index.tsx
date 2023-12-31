import { FC, useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module'

import 'react-quill/dist/quill.snow.css'
import Loader from '../shared/Loader'

import styles from './index.module.scss'
import { BlogListType, client } from '../mainPage'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, message } from 'antd'

Quill.register('modules/ImageResize', ImageResize)

const BlogEditor = () => {
  const { blogId } = useParams()
  const [text, setText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [blog, setBlog] = useState<BlogListType>()
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  const handleChange = (value: string) => {
    setText(value)
  }

  const handleUpdateBlog = async () => {
    setLoading(true)
    const payload = {
      content: text,
      topic: inputValue,
      id: blogId,
      keywords: blog?.keywords,
      categories: blog?.categories,
    }
    try {
      const response = await client.put(`/blogs/${blogId}`, payload)

      if (response.data) {
        message.success('Blog has been updated successfully', 2)
      }
    } catch (error) {
      message.error('Error in updating the blog', 2)
      console.error('Error making PUT request:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchBlog() {
    setLoading(true)
    try {
      const response = await client.get(`/blogs/${blogId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching blog:', error)
      return null
    } finally {
      setLoading(false)
    }
  }
  const getBlogById = async () => {
    const response = await fetchBlog()
    if (response) {
      setInputValue(response.topic)
      setText(response.content)
      setBlog(response)
    }
  }
  useEffect(() => {
    getBlogById()
  }, [blogId])

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ]

  const modules = {
    toolbar: toolbarOptions,
    imageResize: {
      parchment: Quill.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  }

  function handleNavigateBack() {
    navigate(`/`)
  }

  const formatOptions = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ]
  return (
    <div className={styles.mainContainer}>
      <Header handleNavigateBack={handleNavigateBack} />
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.editBlogContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputContainerWrappr}>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter a title"
                value={inputValue}
                className={styles.textEditorInput}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>
            <div>
              <Button
                style={{ background: '#E65027', color: 'white' }}
                size="large"
                onClick={handleUpdateBlog}
              >
                Update
              </Button>
            </div>
          </div>

          <ReactQuill
            value={text}
            theme="snow"
            modules={modules}
            formats={formatOptions}
            onChange={handleChange}
            className={styles.editorWrapper}
          />
        </div>
      )}
    </div>
  )
}

type HeaderPropsType = {
  handleNavigateBack: () => void
}

const Header: FC<HeaderPropsType> = ({ handleNavigateBack }) => {
  return (
    <header className={styles.header}>
      <div className={styles.backIcon} onClick={handleNavigateBack}>
        <ArrowLeftOutlined />
      </div>
      <div className={styles.headingText}>Edit Blog</div>
    </header>
  )
}

export default BlogEditor

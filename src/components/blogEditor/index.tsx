import React, { FC, useEffect, useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module'

import 'react-quill/dist/quill.snow.css'

import styles from './index.module.scss'
import { BlogListType, client } from '../mainPage'
import { useNavigate, useParams } from 'react-router-dom'

import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'

Quill.register('modules/ImageResize', ImageResize)

const BlogEditor = () => {
  const { blogId } = useParams()
  const [text, setText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [blog, setBlog] = useState<BlogListType>()
  const navigate = useNavigate()

  const handleChange = (value: string) => {
    setText(value)
  }

  const handleUpdateBlog = () => {
    const payload = {
      content: text,
      topic: inputValue,
      id: blogId,
      keywords: blog?.keywords,
      categories: blog?.categories,
    }

    client
      .put(`/blogs/${blogId}`, payload)
      .then((response) => {
        console.log('Blog updated successfully')
      })
      .catch((error) => {
        console.error('Error updating blog:', error)
      })
  }

  useEffect(() => {
    client
      .get(`/blogs/${blogId}`)
      .then((response) => {
        setInputValue(response.data.topic)
        setText(response.data.content)
        setBlog(response.data)
      })
      .catch((error) => {
        console.error('Error fetching block data:', error)
      })
  }, [blogId])

  const toolbarOptions = [
    [{ header: [1, 2, false] }],
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
            <Button onClick={handleUpdateBlog}>Update</Button>
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
      {/* <div dangerouslySetInnerHTML={{ __html: text }} /> */}
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

// toolbar: [
//     [{ header: [1, 2, 3, 4, 5, 6, false] }],

//     ['bold', 'italic', 'underline', 'strike'], // toggled buttons
//     ['blockquote', 'code-block'],

//     [
//       { list: 'ordered' },
//       { list: 'bullet' },
//       { indent: '-1' },
//       { indent: '+1' },
//       { align: [] },
//     ],
//     [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
//     [{ direction: 'rtl' }], // text direction,

//     [{ color: [] }, { background: [] }], // dropdown with defaults from theme

//     ['link', 'image'],

//     ['clean'], // remove formatting button
//   ],
//   imageResize: {
//     // parchment: Quill.import('parchment'),
//     modules: ['Resize', 'DisplaySize'],
//   },

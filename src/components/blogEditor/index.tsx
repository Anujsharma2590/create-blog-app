import React, { useState } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module'

import 'react-quill/dist/quill.snow.css'

import styles from './index.module.scss'

Quill.register('modules/ImageResize', ImageResize)

const BlogEditor = () => {
  const [text, setText] = useState('')

  const handleChange = (value: string) => {
    setText(value)
  }
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
    <div>
      <ReactQuill
        value={text}
        theme="snow"
        modules={modules}
        formats={formatOptions}
        onChange={handleChange}
        className={styles.editorWrapper}
      />
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
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

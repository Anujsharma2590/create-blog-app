import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { client } from '..'

const ViewBlog: FC = () => {
  const { blogId } = useParams()
  const [contentData, setContentData] = useState(``)

  useEffect(() => {
    const fetchBlogByid = async () => {
      const response = await client.get(`/blogs/${blogId}`)
      setContentData(response.data.content)
    }
    fetchBlogByid()
  }, [])

  return (
    <div>
      {contentData ? (
        <div dangerouslySetInnerHTML={{ __html: contentData }} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default ViewBlog
